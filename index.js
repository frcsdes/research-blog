const fs = require("fs");
const path = require("path");
const ncp = require("ncp").ncp;

const hb = require("handlebars");
const sass = require("node-sass");


const pagesDir = "./pages";
const staticDir = "./static";
const buildDir = "./build";

const componentModel = {
	markup: "markup.html",
	style: "style.scss",
	context: "index.js",
};


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

const compile = ({markup, style}) => (context) => ({
	markup: hb.compile(markup)(context),
	style: hb.compile(style)(context),
});

const render = (component) => compile(component)(component.context);

const indexComponent = fetch(".");

const mixinsSource = fs.readFileSync("./utils/mixins.scss").toString();
const mixins = hb.compile(mixinsSource)(indexComponent.context);

const sassToCss = (source) =>
	sass.renderSync({data: mixins + source}).css;


// Setup build folder
if (!fs.existsSync(buildDir))
	fs.mkdirSync(buildDir);
ncp(staticDir, buildDir);

const indexTemplate = compile(indexComponent);
const sidebar = render(fetch("./sidebar"));

const index = indexTemplate({...indexComponent.context, sidebar});
console.log(index);

fs.writeFileSync(path.join(buildDir, "index.html"), index.markup);
fs.writeFileSync(path.join(buildDir, "style.css"), index.style);
