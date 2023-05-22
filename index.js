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

	const builder = new Builder(dir.source, dir.build, {root: constants});
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
