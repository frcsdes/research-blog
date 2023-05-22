const title = "A Really Dumb Pointer";

const date = new Date("2020-11-14 EDT");

const intro = "\
I like the idea of <code>std::observer_ptr</code> as a drop-in replacement for raw pointers that explicitly refuse ownership. \
However, this experimental feature is too permissive to my taste, and does not prevent potential misuses.\
";

const tags = ["C++", "Templates"];

const hook = async (pb) => {
	const content = pb.renderMd(await pb.readFile("content.md"));
	pb.writeFile("index.html", pb.renderPage({content}));
	pb.copyFile("dumb_pointer.h");
};


module.exports = {title, date, intro, tags, hook};
