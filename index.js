const {
	readFile, component,
	compile, compileComponent,
	renderComponent, sassToCss,
	setupBuild, writeFile,
} = require("./utils");


const indexComponent = component(".");

const mixinsSource = readFile("mixins.scss");
const mixins = compile(mixinsSource)(indexComponent.context);

const toCss = sassToCss(mixins);


setupBuild();

const indexTemplate = compileComponent(indexComponent);
const sidebar = renderComponent(component("./sidebar"));

const index = indexTemplate({...indexComponent.context, sidebar});

writeFile("index.html", index.markup);
writeFile("style.css", index.style);
