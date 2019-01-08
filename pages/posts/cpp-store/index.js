const fs = require("fs");
const path = require("path");

const read = (file) => fs.readFileSync(path.join(__dirname, file)).toString();


module.exports = {
	title: "Centralizing Data in a Qt Application",
	date: new Date(2019, 1, 8),
	markdown: read("content.md"),
};
