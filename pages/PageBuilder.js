const {Builder} = require("../Builder");


class PageBuilder extends Builder {
	static #pageTemplate_

	// Constructor
	constructor(sourcePath, buildPath, context) {
		super(sourcePath, buildPath, context);
	}

	// Build tree navigation
	async delegate(
		sourcePathSuffix,
		buildPathSuffix = sourcePathSuffix,
		contextAppend = {},
		childClass = PageBuilder
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
		return PageBuilder.#pageTemplate_(this.extendedContext(contextAppend));
	}

	static setPageTemplate(template) {
		PageBuilder.#pageTemplate_ = template;
	}
}


module.exports = {PageBuilder};
