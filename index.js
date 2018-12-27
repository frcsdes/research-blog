const fs = require("fs");
const path = require("path");
const ncp = require("ncp").ncp;


const staticDir = "./static/";
const buildDir = "./build/";
const pagesDir = "./pages/";

const componentModel = {
	markup: "markup.html",
	style: "style.scss",
	context: "index.js",
}


const fetch = (directory) => {
	const safe = (functor, otherwise) => (filename) => {
		const fullPath = path.join(pagesDir, directory, filename)
		return fs.existsSync(fullPath)
			? functor(fullPath)
			: otherwise;
	};

	const safeRead = safe((file) => fs.readFileSync(file).toString(), "");
	const safeRequire = safe((file) => require("./" + file), {});

	return {
		markup: safeRead(componentModel.markup),
		style: safeRead(componentModel.style),
		context: safeRequire(componentModel.context),
	};
};


// Setup build folder
if (!fs.existsSync(buildDir))
	fs.mkdirSync(buildDir);
ncp(staticDir, buildDir);

const root = fetch(".");
const sidebar = fetch("./sidebar");
