const title = "UBO convenience class for OpenGL / C++";

const date = new Date(2020, 9, 19);

const url = "ubo_convenience_class.html";

const keywords = ["C++", "OpenGL"];

const hook = async (pb) => {
	pb.writeFile(url, pb.renderPage({content: "Content"}));
};


module.exports = {title, date, url, keywords, hook};
