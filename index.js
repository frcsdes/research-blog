const fs = require("fs");
const ncp = require("ncp").ncp;


const staticDir = "./static/";
const buildDir = "./build/";


// Setup build folder
if (!fs.existsSync(buildDir))
	fs.mkdirSync(buildDir);
ncp(staticDir, buildDir);

const sidebar = require("./pages/sidebar");
