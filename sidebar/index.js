const pages = [
	{
		label: "Home",
		url: "/"
	},
	{
		label: "Publications",
		url: "/publications/"
	},
	{
		label: "Posts",
		url: "/posts/"
	},
	{
		label: "Teaching",
		url: "/teaching/"
	},
];


const hook = async (b) => {
	const markup = b.renderHb(
		await b.readTemplate(),
		b.extendedContext({pages})
	);
	const style = await b.renderLess(await b.readLess());

	return {markup, style};
};


module.exports = {hook};
