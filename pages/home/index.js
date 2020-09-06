const hook = async (pb) => {
	const cube = {
		markup: pb.renderHb(await pb.readFile("cube.html")),
		style: await pb.renderLess(await pb.readFile("cube.less")),
	};

	const markup = pb.renderHb(
		await pb.readTemplate(),
		pb.extendedContext({cube})
	);

	const less = pb.renderHb(await pb.readLess(), {cube});
	const style = await pb.renderLess(less);

	pb.writeFile("index.html", pb.renderPage({markup, style}));
};


module.exports = {hook};
