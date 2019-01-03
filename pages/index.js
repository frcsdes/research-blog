const breakpoints = {
	small: "600px",
	medium: "1200px",
	large: "1600px",
};

const colors = {
	primary:    "#F45449",
	secondary:  "#EA463A",
	grayWhite:  "#FEFEFF",
	grayLight:  "#EDEDED",
	grayMedium: "#504D4D",
	grayDark:   "#232221",
	grayBlack:  "#050505",
};

const fonts = {
	list: [
		{family: "Bitter", weight: 700, url: "fonts/Bitter-Bold.ttf"},
		{family: "OpenSans", weight: 400, url: "fonts/OpenSans-Regular.ttf"},
		{family: "OpenSans", weight: 600, url: "fonts/OpenSans-SemiBold.ttf"},
	],
	body: "OpenSans",
	display: "Bitter",
};


module.exports = {
	title: "Research Blog",
	breakpoints,
	colors,
	fonts,
};
