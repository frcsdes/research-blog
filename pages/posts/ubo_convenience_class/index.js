const title = "UBO Convenience Class";

const date = new Date("2020-10-18 EDT");

const tags = ["C++", "OpenGL", "Sugar"];

const hook = async (pb) => {
	const content = pb.renderMd(await pb.readFile("content.md"));
	pb.writeFile("index.html", pb.renderPage({content}));
	pb.copyFile("ubo.h");
};


module.exports = {title, date, tags, hook};
