const pages = [
	{
		label: "Home",
		url: "/"
	},
	{
		label: "Posts",
		url: "/posts/"
	},
	{
		label: "Publications",
		url: "/publications/"
	},
	{
		label: "Teaching",
		url: "/teaching/"
	},
];

const hook = async (b) => {
	const markup = b.renderHb(
		await b.readFile("template.html"),
		b.extendedContext({pages})
	);
	const style = await b.renderLess(await b.readFile("style.less"));

	return {markup, style};
};


module.exports = {hook};
