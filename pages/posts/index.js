const posts = {
	2020: [
		{
			title: "C++ Swizzling part 1",
			date: new Date(2020, 9, 8),
			url: "#",
		},
		{
			title: "C++ Swizzling part 2",
		},
		{
			title: "C++ Pattern matching",
		},
	],
};


const hook = async (pb) => {
	const markup = pb.renderHb(
		await pb.readTemplate(),
		pb.extendedContext({posts})
	);
	const style = await pb.renderLess(await pb.readLess());
	pb.writeFile("posts.html", pb.renderPage({markup, style}));
};


module.exports = {hook};
