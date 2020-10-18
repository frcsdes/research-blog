const {PageBuilder} = require("./PageBuilder");


const hook = async (b) => {
	PageBuilder.setPageTemplate(b.compileHb(await b.readTemplate()));

	const less = b.renderHb(await b.readLess());
	b.writeFile("style.css", await b.renderLess(less));

	b.delegate("home", "", {}, PageBuilder);
	b.delegate("publications", "", {}, PageBuilder);
	b.delegate("posts", "", {}, PageBuilder);
};


module.exports = {hook};
