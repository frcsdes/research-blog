const {PageBuilder} = require("../PageBuilder");


class PostBuilder extends PageBuilder {
	static #postTemplate_
	static #postStyle_

	// Constructor
	constructor(sourcePath, buildPath, context) {
		super(sourcePath, buildPath, context);
	}

	// Build tree navigation
	async delegate(
		sourcePathSuffix,
		buildPathSuffix = "",
		contextAppend = {},
		childClass = PostBuilder
	) {
		return super.delegate(
			sourcePathSuffix,
			buildPathSuffix,
			contextAppend,
			childClass
		);
	}

	readContent() {
		return this.readFile("content.md");
	}

	// Third party languages support
	renderPage(contextAppend) {
		const context = this.extendedContext(contextAppend);
		return super.renderPage({
			markup: PostBuilder.#postTemplate_(context),
			style: PostBuilder.#postStyle_,
		});
	}

	static setPostTemplate(template) {
		PostBuilder.#postTemplate_ = template;
	}

	static setPostStyle(style) {
		PostBuilder.#postStyle_ = style;
	}
}


module.exports = {PostBuilder};
