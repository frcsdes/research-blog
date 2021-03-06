const frcs = "François Desrichard";
const dlyr = "David Vanderhaeghe";
const mths = "Mathias Paulin";

const authors = ([head, ...tail]) =>
	head
		? tail.length > 0
			? `${head}, ${authors(tail)}`
			: head
		: ""

const publicationsDir = "publications/";

const publicationsList = [
	{
		image: "egsr-2019.jpg",
		title: "Global Illumination Shadow Layers",
		authors: authors([frcs, dlyr, mths]),
		date: new Date("2019-07-10 EDT"),
		journal: "Computer Graphics Forum 38",
		hal: "https://hal.archives-ouvertes.fr/hal-02174327",
		url: "https://www.irit.fr/STORM/site/global-illumination-shadow-layers/",
	},
	{
		image: "jfig-2018.jpg",
		title: "Analysis of Path Space for Layered Light Editing",
		authors: authors([frcs, dlyr]),
		date: new Date("2018-12-14 EDT"),
		journal: "Journées j.FIG 2018 Poitiers",
		hal: "https://hal.archives-ouvertes.fr/hal-01941014",
	},
];


const hook = async (pb) => {
	const markup = pb.renderHb(
		await pb.readTemplate(),
		pb.extendedContext({publicationsDir, publicationsList})
	);
	const style = await pb.renderLess(await pb.readLess());
	const title = "Publications";

	pb.writeFile("index.html", pb.renderPage({markup, style, title}));
};


module.exports = {hook};
