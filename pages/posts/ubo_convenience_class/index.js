const title = "UBO Convenience Class";

const date = new Date("2020-10-18 EDT");

const intro = "\
In this post, we will create a UBO class template that handles boilerplate OpenGL code and offers a simple syntax to write data inside the buffer.\
";

const tags = ["C++", "OpenGL", "Sugar"];

const hook = async (pb) => {
	const content = pb.renderMd(await pb.readFile("content.md"));
	pb.writeFile("index.html", pb.renderPage({content}));
	pb.copyFile("ubo.h");
};


module.exports = {title, date, intro, tags, hook};
