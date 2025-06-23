const hook = async (pb) => {
	const title = "Création procédurale";

	const markdown = pb.renderHb(
		await pb.readFile("template.md"),
		pb.extendedContext({title}),
	);
	const markup = pb.renderMd(markdown);
	pb.writeFile("index.html", pb.renderPage({markup, title}));

	pb.delegate("resources");
};


module.exports = {hook};
