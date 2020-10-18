const pages = [
	{
		label: "Home",
		url: "/"
	},
	{
		label: "Publications",
		url: "/publications.html"
	},
	{
		label: "Posts",
		url: "/posts.html"
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