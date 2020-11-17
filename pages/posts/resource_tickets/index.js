const title = "Resource Tickets";

const date = new Date("2021-02-23 EDT");

const tags = ["C++", "Templates"];

const hook = async (pb) => {
	const content = pb.renderMd(await pb.readContent());
	pb.writeFile("index.html", pb.renderPage({content}));
	pb.copyFile("tickets.h");
};


module.exports = {title, date, tags, hook};
