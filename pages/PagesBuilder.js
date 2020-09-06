const {Builder} = require("../Builder");


class PagesBuilder extends Builder {
	static #pageTemplate_

	// Constructor
	constructor(sourcePath, buildPath, context) {
		super(sourcePath, buildPath, context);
	}

	// Build tree navigation
	async delegate(
		sourcePathSuffix,
		buildPathSuffix = "",
		contextAppend = {},
		childClass = PagesBuilder
	) {
		return super.delegate(
			sourcePathSuffix,
			buildPathSuffix,
			contextAppend,
			childClass
		);
	}

	// Third party languages support
	renderPage(contextAppend) {
		return PagesBuilder.#pageTemplate_(this.extendedContext(contextAppend));
	}

	static setPageTemplate(template) {
		PagesBuilder.#pageTemplate_ = template;
	}
}


module.exports = {PagesBuilder};
