const {PostBuilder} = require("./PostBuilder");

const postsDir = "posts/";

const postsSubDirs = [
	"ubo_convenience_class",
];


const hook = async (pb) => {
	const postTemplate = pb.compileHb(await pb.readFile("post_template.html"));
	const postStyle = await pb.renderLess(await pb.readFile("post_style.less"));
	PostBuilder.setPostTemplate(postTemplate);
	PostBuilder.setPostStyle(postStyle);

	const addPost = (post) => {
		const {title, date, url, keywords, ...rest} = require(`./${post}`);
		pb.delegate(post, "posts", {title, date, keywords}, PostBuilder);
		return {title, date, url: `${postsDir}${url}`};
	};

	const postsList = postsSubDirs.map(addPost);
	const markup = pb.renderHb(
		await pb.readTemplate(),
		pb.extendedContext({postsDir, postsList})
	);
	const style = await pb.renderLess(await pb.readLess());
	pb.writeFile("posts.html", pb.renderPage({markup, style}));
};


module.exports = {hook};
