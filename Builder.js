const fs = require("fs/promises");
const path = require("path");
const ncp = require("ncp").ncp;
const less = require("less");

// Handlebar setup
const hb = require("handlebars");
hb.registerHelper("link", (url, label) => new hb.SafeString(
	`<a href="${url}" rel="noopener noreferrer" class="link">${
		label === "@" ? url : label
	}</a>`
));
hb.registerHelper("format", (date) => date.toISOString().slice(0, 10));

// Markdown setup
const {cpp20} = require("./languages");
const md = require("markdown-it")();
md.use(
	require("markdown-it-highlightjs"),
	{auto: false, register: {cpp20}},
);
md.use(
	require("markdown-it-link-attributes"),
	{attrs: {rel: "noopener noreferrer", class: "link"}},
);


class Builder {
	#sourcePath_
	#buildPath_
	#context_

	static #mixins_ = ""

	// Constructor
	constructor(sourcePath, buildPath, context) {
		this.#sourcePath_ = sourcePath;
		this.#buildPath_ = buildPath;
		this.#context_ = context;
	}

	// Build tree navigation
	async delegate(
		sourcePathSuffix,
		buildPathSuffix = sourcePathSuffix,
		contextAppend = {},
		childClass = Builder
	) {
		const newSourcePath = path.join(this.#sourcePath_, sourcePathSuffix);
		const newBuildPath = path.join(this.#buildPath_, buildPathSuffix);
		const build = async () => {
			console.log("Building", sourcePathSuffix);
			const {hook} = require(newSourcePath);
			return hook(new childClass(
				newSourcePath,
				newBuildPath,
				{...this.#context_, ...contextAppend}
			));
		};
		return fs.access(newBuildPath, fs.W_OK).catch(() => {
			fs.mkdir(newBuildPath, {recursive: true}).catch((err) => {
				console.log(`Error setting up delegate directory:\n${err}`);
			});
		}).then(build);
	}

	extendedContext(contextAppend) {
		return {...this.#context_, ...contextAppend};
	}

	// Input - output methods
	async readFile(name) {
		return fs.readFile(path.join(this.#sourcePath_, name))
			.catch((err) => { console.log(`Error reading file\n${err}`); })
			.then((raw) => raw.toString());
	}

	async writeFile(name, data) {
		return fs.writeFile(path.join(this.#buildPath_, name), data);
	}

	copyFile(name) {
		ncp(
			path.join(this.#sourcePath_, name),
			path.join(this.#buildPath_, name)
		);
	}

	// Third party languages support
	compileHb(source) {
		return hb.compile(source);
	}

	renderHb(source, context = this.#context_) {
		return this.compileHb(source)(context);
	}

	async renderLess(source) {
		return less.render(`${Builder.#mixins_}\n${source}`)
			.catch((err) => { console.log(`Error rendering Less:\n${err}`); })
			.then(({css}) => css);
	}

	renderMd(source) {
		return md.render(source);
	}

	static setMixins(mixins) {
		Builder.#mixins_ = mixins;
	}
}


module.exports = {Builder};
