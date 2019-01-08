const renderPost = (folder) => {
	const post = require("./" + folder);
	return post;
};

const all = ["cpp-store"];


module.exports = {
	posts: all.map(renderPost),
};
