const ups = "Université Paul Sabatier";
const upv = "Université Paul Valery";

const yearsMap = {
	[`2024 - 2025, ${upv}`]: [
		{
			title: "Approche technique du rendu 3D",
			tags: ["M2", "TP", "TW321CRI"],
			url: "upv_m2_creanum_rendu",
		},
		{
			title: "Création procédurale",
			tags: ["M1", "TP", "TW212CRI"],
			url: "upv_m1_creanum_procedural",
		},
	],
	[`2023 - 2024, ${upv}`]: [
		{
			title: "Approche technique du rendu 3D",
			tags: ["M2", "TP", "TW321CRI"],
			url: "upv_m2_creanum_rendu",
		},
		{
			title: "Création procédurale",
			tags: ["M1", "TP", "TW212CRI"],
			url: "upv_m1_creanum_procedural",
		},
	],
	[`2022 - 2023, ${upv}`]: [
		{
			title: "Approche technique du rendu 3D",
			tags: ["M2", "TP", "TW421CRI"],
			url: "upv_m2_creanum_rendu",
		},
	],
	[`2020 - 2021, ${ups}`]: [
		{
			title: "Aspects théoriques de l'informatique graphique",
			tags: ["M2", "TP", "EIING3D1", "EIING3D2"],
		},
		{
			title: "Informatique graphique, traitement et analyse d'image",
			tags: ["L3", "Cours", "TD", "ELINF6A1"],
		},
		{
			title: "Structures de données",
			tags: ["L2", "TP", "EDINF4F1"],
		},
	],
	[`2019 - 2020, ${ups}`]: [
		{
			title: "Aspects théoriques de l'informatique graphique",
			tags: ["M2", "TP", "EIING3D1", "EIING3D2"],
		},
		{
			title: "Programmation objet avancée en C++",
			tags: ["M1", "TD", "TP", "EMING1G1", "EMING1G2"],
		},
		{
			title: "Informatique graphique, traitement et analyse d'image",
			tags: ["L3", "Cours", "TD", "ELINF6A1"],
		},
		{
			title: "Informatique et programmation Python",
			tags: ["L1", "TP", "EPTRI1A1"],
		},
	],
	[`2018 - 2019, ${ups}`]: [
		{
			title: "Aspects théoriques de l'informatique graphique",
			tags: ["M2", "TP", "EIING3D1", "EIING3D2"],
		},
		{
			title: "Programmation objet avancée en C++",
			tags: ["M1", "TP", "EMING1G1", "EMING1G2"],
		},
		{
			title: "Informatique graphique, traitement et analyse d'image",
			tags: ["L3", "TP", "ELINF6A1"],
		},
		{
			title: "Structures de données",
			tags: ["L2", "TP", "EDINF4F1"],
		},
		{
			title: "Informatique et programmation Python",
			tags: ["L1", "TP", "EPTRI1A1"],
		},
	],
};


const hook = async (pb) => {
	// Extract all course URLs from the map
	const all_urls = Object.values(yearsMap)
		.flat()
		.map(({url}) => url)
		.filter((url) => url);

	// Generate a page for each unique URL
	[...new Set(all_urls)].forEach((url) => pb.delegate(url));

	const title = "Teaching Resources";
	const markup = pb.renderHb(
		await pb.readFile("template.html"),
		pb.extendedContext({title, yearsMap})
	);
	pb.writeFile("index.html", pb.renderPage({markup, title}));
};


module.exports = {hook};
