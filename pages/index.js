const {PageBuilder} = require("./PageBuilder");


const hook = async (b) => {
	PageBuilder.setPageTemplate(b.compileHb(await b.readFile("template.html")));

	b.copyFile(".htaccess");

	const styleLess = await b.readFile("style.less");
	const style = await b.renderLess(b.renderHb(styleLess));
	b.writeFile("style.css", style);

	b.delegate("home", "", {}, PageBuilder);
	b.delegate("publications", "publications", {}, PageBuilder);
	b.delegate("posts", "posts", {}, PageBuilder);
	b.delegate("teaching", "teaching", {}, PageBuilder);
};


module.exports = {hook};
