const fs = require("fs/promises");
const path = require("path");

const {Builder} = require("./Builder");


const dir = {
	source: __dirname,
	static: path.join(__dirname, "static"),
	build:  path.join(__dirname, "build"),
};


const build = async () => {
	const notGitIgnore = (filename) => !filename.includes(".gitignore");
	fs.cp(dir.static, dir.build, {recursive: true, filter: notGitIgnore});

	const builder = new Builder(dir.source, dir.build, {root: {images: "/images/"}});
	const header = await builder.delegate("header", "");
	builder.delegate("pages", "", {header});
};

const setup = async () => {
	fs.access(dir.build, fs.W_OK).catch(() => {
		fs.mkdir(dir.build).catch((err) => {
			console.log(`Error setting up the build directory:\n${err}`);
		});
	}).then(build);
};


setup();
