const title = "Compile Time Swizzling";

const date = new Date("2020-10-25 EDT");

const intro = "\
In GLSL code, swizzling offers a handy syntax to manipulate vectors. \
Solutions were found to reproduce this in C++, that each have their shortcomings.\
";

const tags = ["C++", "Sugar", "Templates"];

const hook = async (pb) => {
	const content = pb.renderMd(await pb.readFile("content.md"));
	pb.writeFile("index.html", pb.renderPage({content}));
	pb.copyFile("swizzling.h");
};


module.exports = {title, date, intro, tags, hook};
