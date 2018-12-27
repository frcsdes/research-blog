const fs = require("fs");
const path = require("path");

const read = (filename) =>
	fs.readFileSync(path.join(__dirname, filename)).toString();

module.exports = {
	markup: read("markup.html"),
	style: read("style.scss"),
};
