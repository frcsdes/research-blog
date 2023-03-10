const hook = async (pb) => {
	const title = "Approche technique du rendu 3D";

	const markdown = pb.renderHb(
		await pb.readFile("template.md"),
		pb.extendedContext({title}),
	);
	const markup = pb.renderMd(markdown);
	pb.writeFile("index.html", pb.renderPage({markup, title}));

	pb.delegate("resources");
};


module.exports = {hook};
