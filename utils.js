const fs = require("fs");
const path = require("path");
const ncp = require("ncp").ncp;
const hb = require("handlebars");
const less = require("less");
const md = new require("markdown-it")();


// Directory hierarchy and file structure
const pagesDir = "pages";
const staticDir = "static";
const buildDir = "build";

const componentModel = {
	markup: "template.html",
	style: "style.less",
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
hb.registerHelper("link", (url, label) => new hb.SafeString(
	`<a href="${url}" target="_blank" rel="noopener noreferrer">${
		label === "@" ? url : label
	}</a>`
));

hb.registerHelper("format", (date) => date.toISOString().slice(0, 10));

const compile = (source) => (context) =>
	hb.compile(source)(context);

const compileComponent = ({markup, style}) => (context) => ({
	markup: compile(markup)(context),
	style: compile(style)(context),
});

const renderComponent = (rootContext) => (component) =>
	compileComponent(component)({root: rootContext, ...component.context});

const renderCss = (mixins) => async (source) => {
	try {
		return await less.render(mixins + source).then(({css}) => css);
	} catch (exception) {
		console.error(`Error compiling Less:\n${exception}\n`);
	}
};

const renderMarkdown = (source) => (context) =>
	md.render(compile(source)(context));


// Build output
const setupBuild = () => {
	if (!fs.existsSync(buildDir))
		fs.mkdirSync(buildDir);
	const visible = (filename) => !filename.includes("/.");
	ncp(staticDir, buildDir, {filter: visible}, () => {});
};

const writeFile = (filename, data) =>
	fs.writeFileSync(buildFile(filename), data);


module.exports = {
	absolute, readFile, requireAbsolute, component,
	compile, compileComponent,
	renderComponent, renderCss, renderMarkdown,
	setupBuild, writeFile,
};
