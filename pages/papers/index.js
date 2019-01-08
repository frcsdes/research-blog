const frcs = "François Desrichard";
const dlyr = "David Vanderhaeghe";

const authors = ([head, ...tail]) =>
	head
		? tail.length > 0
			? `${head}, ${authors(tail)}`
			: head
		: ""

const papers = [
	{
		image: "jfig-2018.jpg",
		title: "Analysis of Path Space for Layered Light Editing",
		authors: authors([frcs, dlyr]),
		date: new Date(2018, 11, 15),
		journal: "Journées j.FIG 2018 Poitiers",
		url: "https://hal.archives-ouvertes.fr/hal-01941014",
	},
];


module.exports = {papers};
