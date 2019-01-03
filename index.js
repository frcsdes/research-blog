const {
	readFile, component,
	compile, compileComponent,
	renderComponent, sassToCss,
	setupBuild, writeFile,
} = require("./utils");


// Main template and context
const mainComponent = component(".");
const render = renderComponent(mainComponent.context);
const sidebarRender = render(component("sidebar"));
const mainTemplate = (content) =>
	compileComponent(mainComponent)({
		...mainComponent.context,
		sidebar: sidebarRender,
		content,
	});

// Style-specific helpers
const mixinsSource = readFile("mixins.scss");
const mixins = compile(mixinsSource)(mainComponent.context);
const compileCss = sassToCss(mixins);
const compileContentStyle = ({style, ...content}) =>
	({style: compileCss(style), ...content});

// Combine the two to get the full instantiation pattern
const mainWithContent = (content) =>
	mainTemplate(compileContentStyle(content));

const mainWithComponent = (filename) =>
	mainWithContent(render(component(filename)));


// Build directory setup
setupBuild();

// Rendering individual pages
writeFile("index.html", mainWithComponent("home").markup);

// Rendering global style
writeFile("style.css", compileCss(mainTemplate({}).style));
