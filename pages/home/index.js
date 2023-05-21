const hook = async (pb) => {
	const markup = pb.renderMd(pb.renderHb(await pb.readFile("template.md")));
	const style = await pb.renderLess(await pb.readFile("style.less"));
	const title = "François Desrichard";
	pb.writeFile("index.html", pb.renderPage({markup, style, title}));
};


module.exports = {hook};
