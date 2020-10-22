const fs = require("fs/promises");
const path = require("path");
const ncp = require("ncp").ncp;

const constants = require("./constants");
const {Builder} = require("./Builder");


const dir = {
	source: __dirname,
	static: path.join(__dirname, "static"),
	build:  path.join(__dirname, "build"),
};


const build = async () => {
	const visible = (filename) => !filename.includes("/.");
	ncp(dir.static, dir.build, {filter: visible}, () => {});

	Builder.setMixins(await fs.readFile("mixins.less"));
	const builder = new Builder(dir.source, dir.build, {root: constants});
	const sidebar = await builder.delegate("sidebar");
	builder.delegate("pages", "", {sidebar});
};

const setup = async () => {
	fs.access(dir.build, fs.W_OK).catch(() => {
		fs.mkdir(dir.build).catch((err) => {
			console.log(`Error setting up the build directory:\n${err}`);
		});
	}).then(build);
};


setup();
