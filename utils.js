const fs = require("fs");
const path = require("path");
const ncp = require("ncp").ncp;
const hb = require("handlebars");


// Directory hierarchy and file structure
const pagesDir = "pages";
const staticDir = "static";
const buildDir = "build";

const componentModel = {
	markup: "markup.html",
	style: "style.scss",
	context: "index.js",
};

const prefix = (prefix) => (filename) =>
	path.join(prefix, filename);

const absolute = prefix(__dirname);
const pagesFile = prefix(pagesDir);
const staticFile = prefix(staticDir);
const buildFile = prefix(buildDir);


// File input
const readFile = (filename) =>
	fs.readFileSync(pagesFile(filename)).toString();

const requireAbsolute = (filename) =>
	require(absolute(pagesFile(filename)));

const component = (directory) => {
	const safe = (functor, otherwise) => (filename) => {
		const fullPath = path.join(directory, filename);
		return fs.existsSync(pagesFile(fullPath))
			? functor(fullPath)
			: otherwise;
	};

	const safeRead = safe(readFile, "");
	const safeRequire = safe(requireAbsolute, {});

	return {
		markup: safeRead(componentModel.markup),
		style: safeRead(componentModel.style),
		context: safeRequire(componentModel.context),
	};
};


// Compilation and rendering
const compile = (source) => (context) =>
	hb.compile(source)(context);

const compileComponent = ({markup, style}) => (context) => ({
	markup: compile(markup)(context),
	style: compile(style)(context),
});

const renderComponent = (component) =>
	compileComponent(component)(component.context);

const sassToCss = (mixins) => (source) =>
	sass.renderSync({data: mixins + source}).css;


// Build output
const setupBuild = () => {
	if (!fs.existsSync(buildDir))
		fs.mkdirSync(buildDir);
	ncp(staticDir, buildDir);
};

const writeFile = (filename, data) =>
	fs.writeFileSync(buildFile(filename), data);


module.exports = {
	absolute, readFile, requireAbsolute, component,
	compile, compileComponent,
	renderComponent, sassToCss,
	setupBuild, writeFile,
};
