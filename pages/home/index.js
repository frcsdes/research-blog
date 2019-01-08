const fs = require("fs");
const path = require("path");

const read = (file) => fs.readFileSync(path.join(__dirname, file)).toString();


module.exports = {
	cube: {
		markup: read("cube.html"),
		style:  read("cube.less"),
	},
};
