const ups = "Université Toulouse 3 - Paul Sabatier";
const upv = "Université Montpellier 3 - Paul Valéry";
const xll = "École Polytechnique / ENS Louis-Lumière";

const urlRendering = "upv_m2_creanum_rendu";
const urlProcedural = "upv_m1_creanum_procedural";
const urlSplatting = "xll_m1_xcin_gaussian_splatting";

const years = [
	{
		label: "2025 - 2026",
		courses: [
			{
				title: "3D Acquisition and Gaussian Splatting",
				location: xll,
				tags: ["M1", "Workshop"],
				url: urlSplatting,
			},
			{
				title: "Approche technique du rendu 3D",
				location: upv,
				tags: ["M2", "TP", "TW331CRI"],
				url: urlRendering,
			},
		],
	},
	{
		label: "2024 - 2025",
		courses: [
			{
				title: "Approche technique du rendu 3D",
				location: upv,
				tags: ["M2", "TP", "TW321CRI"],
				url: urlRendering,
			},
			{
				title: "Création procédurale",
				location: upv,
				tags: ["M1", "TP", "TW212CRI"],
				url: urlProcedural,
			},
		],
	},
	{
		label: "2023 - 2024",
		courses: [
			{
				title: "Approche technique du rendu 3D",
				location: upv,
				tags: ["M2", "TP", "TW321CRI"],
				url: urlRendering,
			},
			{
				title: "Création procédurale",
				location: upv,
				tags: ["M1", "TP", "TW212CRI"],
				url: urlProcedural,
			},
		],
	},
	{
		label: "2022 - 2023",
		courses: [
			{
				title: "Approche technique du rendu 3D",
				location: upv,
				tags: ["M2", "TP", "TW421CRI"],
				url: urlRendering,
			},
		],
	},
	{
		label: "2020 - 2021",
		courses: [
			{
				title: "Aspects théoriques de l'informatique graphique",
				location: ups,
				tags: ["M2", "TP", "EIING3D1", "EIING3D2"],
			},
			{
				title: "Informatique graphique, traitement et analyse d'image",
				location: ups,
				tags: ["L3", "Cours", "TD", "ELINF6A1"],
			},
			{
				title: "Structures de données",
				location: ups,
				tags: ["L2", "TP", "EDINF4F1"],
			},
		],
	},
	{
		label: "2019 - 2020",
		courses: [
			{
				title: "Aspects théoriques de l'informatique graphique",
				location: ups,
				tags: ["M2", "TP", "EIING3D1", "EIING3D2"],
			},
			{
				title: "Programmation objet avancée en C++",
				location: ups,
				tags: ["M1", "TD", "TP", "EMING1G1", "EMING1G2"],
			},
			{
				title: "Informatique graphique, traitement et analyse d'image",
				location: ups,
				tags: ["L3", "Cours", "TD", "ELINF6A1"],
			},
			{
				title: "Informatique et programmation Python",
				location: ups,
				tags: ["L1", "TP", "EPTRI1A1"],
			},
		],
	},
	{
		label: "2018 - 2019",
		courses: [
			{
				title: "Aspects théoriques de l'informatique graphique",
				location: ups,
				tags: ["M2", "TP", "EIING3D1", "EIING3D2"],
			},
			{
				title: "Programmation objet avancée en C++",
				location: ups,
				tags: ["M1", "TP", "EMING1G1", "EMING1G2"],
			},
			{
				title: "Informatique graphique, traitement et analyse d'image",
				location: ups,
				tags: ["L3", "TP", "ELINF6A1"],
			},
			{
				title: "Structures de données",
				location: ups,
				tags: ["L2", "TP", "EDINF4F1"],
			},
			{
				title: "Informatique et programmation Python",
				location: ups,
				tags: ["L1", "TP", "EPTRI1A1"],
			},
		],
	},
];


const hook = async (pb) => {
	// Extract all course URLs
	const allUrls = (
		years
		.flatMap(({courses}) => courses)
		.flatMap(({url}) => url)
		.filter((url) => url)
	);

	// Generate a page for each unique URL
	[...new Set(allUrls)].forEach((url) => pb.delegate(url));

	const title = "Teaching Resources";
	const markup = pb.renderHb(
		await pb.readFile("template.html"),
		pb.extendedContext({title, years})
	);
	pb.writeFile("index.html", pb.renderPage({markup, title}));
};


module.exports = {hook};
