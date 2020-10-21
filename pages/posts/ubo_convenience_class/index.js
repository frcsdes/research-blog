const title = "UBO Convenience Class";

const date = new Date(2020, 9, 19);

const keywords = ["C++", "OpenGL"];

const hook = async (pb) => {
	const content = pb.renderMd(await pb.readContent());
	pb.writeFile("index.html", pb.renderPage({content}));
	pb.copyFile("ubo.h");
};


module.exports = {title, date, keywords, hook};
