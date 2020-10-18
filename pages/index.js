const {PageBuilder} = require("./PageBuilder");


const hook = async (b) => {
	PageBuilder.setPageTemplate(b.compileHb(await b.readTemplate()));

	const style = await b.renderLess(b.renderHb(await b.readLess()));
	b.writeFile("style.css", style);
	const hljs = await b.renderLess(b.renderHb(await b.readFile("hljs.less")));
	b.writeFile("hljs.css", hljs);

	b.delegate("home", "", {}, PageBuilder);
	b.delegate("publications", "", {}, PageBuilder);
	b.delegate("posts", "", {}, PageBuilder);
};


module.exports = {hook};
