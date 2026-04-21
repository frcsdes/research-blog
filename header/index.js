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

	return {markup};
};


module.exports = {hook};
