const title = "A Really Dumb Pointer";

const date = new Date("2020-11-14 EDT");

const tags = ["C++", "Templates"];

const hook = async (pb) => {
	const content = pb.renderMd(await pb.readContent());
	pb.writeFile("index.html", pb.renderPage({content}));
	pb.copyFile("dumb_pointer.h");
};


module.exports = {title, date, tags, hook};
