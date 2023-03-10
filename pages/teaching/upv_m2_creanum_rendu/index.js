const hook = async (pb) => {
	const title = "Approche technique du rendu 3D";
	const markup = pb.renderHb(
		await pb.readFile("template.html"),
		pb.extendedContext({title})
	);
	pb.writeFile("index.html", pb.renderPage({markup, title}));

	pb.delegate("resources");
};


module.exports = {hook};
