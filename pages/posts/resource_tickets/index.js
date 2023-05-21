const title = "Resource Tickets";

const date = new Date("2021-02-23 EDT");

const intro = "\
When writing 3D software, I need to parse scene files that load or create various resources into memory. \
Sometimes, several scenes will be parsed that may request the same data, without a way to communicate; in this case, I want them to share this data automatically.\
";

const tags = ["C++", "Templates"];

const hook = async (pb) => {
	const content = pb.renderMd(await pb.readFile("content.md"));
	pb.writeFile("index.html", pb.renderPage({content}));
	pb.copyFile("tickets.h");
};


module.exports = {title, date, intro, tags, hook};
