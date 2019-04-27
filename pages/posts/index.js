const fs = require("fs");
const path = require("path");

const read = (file) => fs.readFileSync(path.join(__dirname, file)).toString();

const header = read("header.md");

const fetch = (folder) => {
	const {markdown, ...rest} = require("./" + folder);
	return {markdown: `${header}\n${markdown}`, ...rest};
};

const all = [];


module.exports = {posts: all.map(fetch)};
