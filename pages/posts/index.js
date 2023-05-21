const {PostBuilder} = require("./PostBuilder");

const postsSubDirs = [
	//"a_remark_about_views",
	"resource_tickets",
	"a_really_dumb_pointer",
	"compile_time_swizzling",
	"ubo_convenience_class",
];


const hook = async (pb) => {
	const postTemplate = pb.compileHb(await pb.readFile("post_template.html"));
	PostBuilder.setPostTemplate(postTemplate);

	const addPost = (post) => {
		const {title, date, intro, tags, ...rest} = require(`./${post}`);
		pb.delegate(post, post, {title, intro, date, tags}, PostBuilder);
		return {title, date, intro, tags, url: `./${post}/`};
	};
	const postsList = postsSubDirs.map(addPost);

	const title = "Blog Posts";
	const markup = pb.renderHb(
		await pb.readFile("template.html"),
		pb.extendedContext({title, postsList})
	);
	pb.writeFile("index.html", pb.renderPage({markup, title}));
};


module.exports = {hook};
