const {PagesBuilder} = require("./PagesBuilder");


const hook = async (b) => {
	PagesBuilder.setPageTemplate(b.compileHb(await b.readTemplate()));

	const less = b.renderHb(await b.readLess());
	b.writeFile("style.css", await b.renderLess(less));

	b.delegate("home",   "", {}, PagesBuilder);
	b.delegate("papers", "", {}, PagesBuilder);
	b.delegate("posts",  "", {}, PagesBuilder);
};


module.exports = {hook};
