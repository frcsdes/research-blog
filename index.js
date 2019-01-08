const {
	readFile, component,
	compile, compileComponent,
	renderComponent, lessToCss,
	setupBuild, writeFile,
} = require("./utils");


// Main template and context
const mainComponent = component(".");
const render = renderComponent(mainComponent.context);
const sidebarRender = render(component("sidebar"));
const mainTemplate = (content) =>
	compileComponent(mainComponent)({
		root: mainComponent.context,
		sidebar: sidebarRender,
		content,
	});


// Style-specific helpers
const mixinsSource = readFile("mixins.less");
const mixins = compile(mixinsSource)({root: mainComponent.context});
const compileCss = lessToCss(mixins);
const compileContentStyle = async ({style, ...content}) =>
	({style: await compileCss(style), ...content});

// Combine the two to get the full instantiation pattern
const mainWithContent = async (content) =>
	mainTemplate(await compileContentStyle(content));

const mainWithComponent = async (file) =>
	await mainWithContent(render(component(file))).then(({markup}) => markup);


// Build steps
(async () => {
	// Build directory setup
	setupBuild();

	// Rendering individual pages
	writeFile("index.html", await mainWithComponent("home"));
	writeFile("papers.html", await mainWithComponent("papers"));
	writeFile("posts.html", await mainWithComponent("posts"));

	// Rendering global style
	writeFile("style.css", await compileCss(mainTemplate({}).style));
})();
