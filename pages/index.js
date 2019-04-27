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
	grayMedium: "#6A6464",
	grayDark:   "#232221",
	grayBlack:  "#050505",
};

const fonts = {
	list: [
		{
			family: "OpenSans",
			weight: 400,
			url: "OpenSans-Regular.ttf"
		},
		{
			family: "OpenSans",
			weight: 600,
			url: "OpenSans-SemiBold.ttf"
		},
		{
			family: "Bitter",
			weight: 400,
			url: "Bitter-Regular.ttf"
		},
		{
			family: "Bitter",
			weight: 700,
			url: "Bitter-Bold.ttf"
		},
	],
	body: "OpenSans",
	display: "Bitter",
	directory: "fonts/",
};

const images = "images/";

const preload = [
	{
		href: `${fonts.directory}${fonts.list[0].url}`,
		as: "font",
	},
];

const links = [
	{
		label: "GitHub",
		logo: "logo-github.svg",
		url: "https://github.com/frcsdes",
	},
	{
		label: "LinkedIn",
		logo: "logo-linkedin.svg",
		url: "https://www.linkedin.com/in/francois-desrichard/",
	},
	{
		label: "Medium",
		logo: "logo-medium.svg",
		url: "https://medium.com/@f.desrichard",
	},
];

const lipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";


module.exports = {
	root: {
		breakpoints,
		colors,
		fonts,
		images,
		preload,
		links,
		lipsum,
	},
	pagetitle: "François Desrichard - Research Blog",
	depth: 0,
};
