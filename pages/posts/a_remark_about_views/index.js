const title = "A Remark About Views";

const date = new Date("2022-08-14 EDT");

const intro = "";

const tags = ["C++", "Ranges", "Sugar"];

const hook = async (pb) => {
	const content = pb.renderMd(await readFile("content.md"));
	pb.writeFile("index.html", pb.renderPage({content}));
	//pb.copyFile("dumb_pointer.h");
};


module.exports = {title, date, intro, tags, hook};
