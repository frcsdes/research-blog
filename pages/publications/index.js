const dlyr = "David Vanderhaeghe";
const frcs = "François Desrichard";
const mths = "Mathias Paulin";
const pier = "Pierre Mézières";

const arx = "ArXiv deposit";
const hal = "HAL deposit";
const doi = "Editor version";
const web = "Website";

const formatAuthors = (authorsList) => authorsList.join(', ');

const publicationsDir = "publications/";

const publicationsList = [
	{
		image: "2022-HVL",
		title: "Harmonics Virtual Lights: Fast Projection of Luminance Field on Spherical Harmonics for Efficient Rendering",
		authors: formatAuthors([pier, frcs, dlyr, mths]),
		date: new Date("2022-05-27 EDT"),
		journal: "Computer Graphics Forum 41",
		links: [
			{
				label: doi,
				url: "https://doi.org/10.1111/cgf.14564",
			},
			{
				label: arx,
				url: "https://arxiv-export1.library.cornell.edu/abs/2201.01487",
			},
		],
	},
	{
		image: "2022-SLPM",
		title: "Shadow Layers for Participating Media",
		authors: formatAuthors([frcs, dlyr, mths]),
		date: new Date("2022-01-03 EDT"),
		journal: "Computer Graphics Forum 41",
		links: [
			{
				label: doi,
				url: "https://doi.org/10.1111/cgf.14429",
			},
			{
				label: hal,
				url: "https://hal.archives-ouvertes.fr/hal-03480926",
			},
		],
	},
	{
		image: "2021-Thesis",
		title: "PhD Thesis: Analysis of the Path Space for Light and Shadow Compositing",
		authors: formatAuthors([frcs]),
		date: new Date("2021-12-06 EDT"),
		journal: "Université Toulouse 3 - Paul Sabatier",
		links: [
			{
				label: "PDF (33 MB)",
				url: "/Desrichard_thesis.pdf",
			},
			{
				label: "PDF (7 MB)",
				url: "/Desrichard_thesis_low.pdf",
			},
			{
				label: web,
				url: "https://www.theses.fr/2021TOU30149",
			},
		],
	},
	{
		image: "2019-GISL",
		title: "Global Illumination Shadow Layers",
		authors: formatAuthors([frcs, dlyr, mths]),
		date: new Date("2019-07-10 EDT"),
		journal: "Computer Graphics Forum 38",
		links: [
			{
				label: doi,
				url: "https://doi.org/10.1111/cgf.13781",
			},
			{
				label: hal,
				url: "https://hal.archives-ouvertes.fr/hal-02174327",
			},
			{
				label: web,
				url: "https://www.irit.fr/STORM/site/global-illumination-shadow-layers",
			},
		],
	},
	{
		image: "2018-AOPS",
		title: "Analysis of Path Space for Layered Light Editing",
		authors: formatAuthors([frcs, dlyr]),
		date: new Date("2018-12-14 EDT"),
		journal: "Journées j.FIG 2018 Poitiers",
		links: [
			{
				label: hal,
				url: "https://hal.archives-ouvertes.fr/hal-01941014",
			},
		],
	},
];


const hook = async (pb) => {
	const title = "List of Publications";
	const markup = pb.renderHb(
		await pb.readFile("template.html"),
		pb.extendedContext({title, publicationsDir, publicationsList})
	);
	const style = await pb.renderLess(await pb.readFile("style.less"));
	pb.writeFile("index.html", pb.renderPage({markup, style, title}));
};


module.exports = {hook};
