const keyword =
	"void bool char int short long float double signed unsigned sizeof " +
	"namespace static inline const constexpr " +
	"public protected private friend " +
	"if else for while switch case default goto return " +
	"template class typename requires auto decltype";
const literal = "true false nullptr";

const number = {
	className: "number",
	variants: [
		{begin: "\\b(0b[01']+)"},
		{begin: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)(u|U|l|L|ul|UL|f|F|b|B)"},
		{begin: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"},
	],
};

const string = {
	className: "string",
	variants: [
		{
			begin: "(u8?|U|L)?\"",
			end: "\"",
			illegal: "\\n",
			contains: [{begin: "\\\\[\\s\\S]"}],
		},
		{
			begin: "(u8?|U|L)?'(\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)|.)",
			end: "'",
			illegal: "."
		},
	],
};

const comment_single = {
	className: "comment",
	begin: "//",
	end: "$",
};
const comment_multi = {
	className: "comment",
	begin: "/\\*",
	end: "\\*/",
};

const cpp20 = () => ({
	name: "C++20",
	disableAutodetect: true,
	keywords: {keyword, literal},
	contains: [number, string, comment_single, comment_multi],
});


module.exports = {cpp20};
