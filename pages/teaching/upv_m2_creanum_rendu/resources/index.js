const hook = async (pb) => {
	pb.copyFile(".htaccess");
	pb.copyFile("1_Introduction.pdf");
	pb.copyFile("1_Introduction.pptx");
	pb.copyFile("References.zip");
};


module.exports = {hook};
