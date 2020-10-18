const frcs = "François Desrichard";
const dlyr = "David Vanderhaeghe";
const mths = "Mathias Paulin";

const authors = ([head, ...tail]) =>
	head
		? tail.length > 0
			? `${head}, ${authors(tail)}`
			: head
		: ""

const list = [
	{
		image: "egsr-2019.jpg",
		title: "Global Illumination Shadow Layers",
		authors: authors([frcs, dlyr, mths]),
		date: new Date(2019, 6, 11),
		journal: "Computer Graphics Forum 38",
		hal: "https://hal.archives-ouvertes.fr/hal-02174327",
		url: "https://www.irit.fr/STORM/site/global-illumination-shadow-layers/",
	},
	{
		image: "jfig-2018.jpg",
		title: "Analysis of Path Space for Layered Light Editing",
		authors: authors([frcs, dlyr]),
		date: new Date(2018, 11, 15),
		journal: "Journées j.FIG 2018 Poitiers",
		hal: "https://hal.archives-ouvertes.fr/hal-01941014",
	},
];

const publications = "publications/";


const hook = async (pb) => {
	const markup = pb.renderHb(
		await pb.readTemplate(),
		pb.extendedContext({list, publications})
	);
	const style = await pb.renderLess(await pb.readLess());

	pb.writeFile("publications.html", pb.renderPage({markup, style}));
};


module.exports = {hook};
