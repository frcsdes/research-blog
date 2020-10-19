const {PageBuilder} = require("./PageBuilder");


const hook = async (b) => {
	PageBuilder.setPageTemplate(b.compileHb(await b.readTemplate()));

	const style = await b.renderLess(b.renderHb(await b.readLess()));
	b.writeFile("style.css", style);

	b.delegate("home", "", {}, PageBuilder);
	b.delegate("publications", "publications", {}, PageBuilder);
	b.delegate("posts", "posts", {}, PageBuilder);
};


module.exports = {hook};
