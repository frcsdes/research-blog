const hook = async (pb) => {
	const markup = pb.renderHb(await pb.readTemplate());
	const style = await pb.renderLess(await pb.readLess());
	pb.writeFile("index.html", pb.renderPage({markup, style}));
};


module.exports = {hook};
