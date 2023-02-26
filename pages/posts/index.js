const {PostBuilder} = require("./PostBuilder");

const postsSubDirs = [
	"a_remark_about_views",
	"resource_tickets",
	"a_really_dumb_pointer",
	"compile_time_swizzling",
	"ubo_convenience_class",
];


const hook = async (pb) => {
	const postTemplate = pb.compileHb(await pb.readFile("post_template.html"));
	const postStyle = await pb.renderLess(await pb.readFile("post_style.less"));
	PostBuilder.setPostTemplate(postTemplate);
	PostBuilder.setPostStyle(postStyle);

	const addPost = (post) => {
		const {title, date, tags, ...rest} = require(`./${post}`);
		pb.delegate(post, post, {title, date, tags}, PostBuilder);
		return {title, date, tags, url: `./${post}/`};
	};
	const postsList = postsSubDirs.map(addPost);

	const markup = pb.renderHb(
		await pb.readTemplate(),
		pb.extendedContext({postsList})
	);
	const style = await pb.renderLess(await pb.readLess());
	const title = "Blog Posts";
	pb.writeFile("index.html", pb.renderPage({markup, style, title}));
};


module.exports = {hook};
