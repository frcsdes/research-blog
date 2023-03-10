const hook = async (pb) => {
	const markup = pb.renderHb(await pb.readFile("template.html"));
	const style = await pb.renderLess(await pb.readFile("style.less"));
	const title = "François Desrichard";
	pb.writeFile("index.html", pb.renderPage({markup, style, title}));
};


module.exports = {hook};
