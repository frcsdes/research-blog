export const hook = async (pb) => {
	const title = "3D Acquisition and Gaussian Splatting";

	const markdown = pb.renderHb(
		await pb.readFile("template.md"),
		pb.extendedContext({title}),
	);
	const markup = pb.renderMd(markdown);
	pb.writeFile("index.html", pb.renderPage({markup, title}));

	pb.delegate("resources");
};
