const ups = "Université Paul Sabatier";
const upv = "Université Paul Valery";

const modulesList = {
	[`2022 - 2023, ${upv}`]: [
		{
			title: "Approche technique du rendu 3D",
			tags: ["M2", "TW421CRI"],
			url: "./2022_2023/m2_rendu",
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
	const markup = pb.renderHb(
		await pb.readTemplate(),
		pb.extendedContext({modulesList})
	);
	const style = await pb.renderLess(await pb.readLess());
	const title = "Teaching";
	pb.writeFile("index.html", pb.renderPage({markup, style, title}));
};


module.exports = {hook};
