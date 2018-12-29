const {
	readFile, component,
	compile, compileComponent,
	renderComponent, sassToCss,
	setupBuild, writeFile,
} = require("./utils");


setupBuild();

const indexComponent = component(".");
const indexTemplate = compileComponent(indexComponent);

const mixinsSource = readFile("mixins.scss");
const mixins = compile(mixinsSource)(indexComponent.context);
const renderCss = sassToCss(mixins);

const sidebar = renderComponent(component("./sidebar"));
const index = indexTemplate({...indexComponent.context, sidebar});

writeFile("index.html", index.markup);
writeFile("style.css", renderCss(index.style));
