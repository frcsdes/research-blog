const hook = async (pb) => {
	const markup = pb.renderHb(await pb.readTemplate());
	const style = await pb.renderLess(await pb.readLess());
	const title = "François Desrichard";
	pb.writeFile("index.html", pb.renderPage({markup, style, title}));
};


module.exports = {hook};
