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
		image: "cgf-2021.jpg",
		title: "Shadow Layers for Participating Media",
		authors: authors([frcs, dlyr, mths]),
		date: new Date("2021-12-14 EDT"),
		journal: "Computer Graphics Forum",
		doi: "https://doi.org/10.1111/cgf.14429",
		hal: "https://hal.archives-ouvertes.fr/hal-03480926/",
	},
	{
		image: "egsr-2019.jpg",
		title: "Global Illumination Shadow Layers",
		authors: authors([frcs, dlyr, mths]),
		date: new Date("2019-07-10 EDT"),
		journal: "Computer Graphics Forum 38",
		doi: "https://doi.org/10.1111/cgf.13781",
		hal: "https://hal.archives-ouvertes.fr/hal-02174327",
		web: "https://www.irit.fr/STORM/site/global-illumination-shadow-layers/",
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
