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
	grayMedium: "#E3E3E3",
	grayDark:   "#333333",
	grayBlack:  "#050505",
};

const fonts = {
	list: [
		{family: "Vidaloka", weight: 400, url: "fonts/Vidaloka-Regular.ttf"},
		{family: "Raleway",  weight: 400, url: "fonts/Raleway-Regular.ttf"},
		{family: "OpenSans", weight: 300, url: "fonts/OpenSans-Light.ttf"},
		{family: "OpenSans", weight: 400, url: "fonts/OpenSans-Regular.ttf"},
	],
	body: "OpenSans",
	display: "Vidaloka",
};


module.exports = {
	title: "Research Blog",
	breakpoints,
	colors,
	fonts,
};
