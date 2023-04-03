const hook = async (pb) => {
	pb.copyFile(".htaccess");
	pb.copyFile("1_Introduction.pdf");
	pb.copyFile("2_Modelisation_lumiere.pdf");
	pb.copyFile("3_Path_Tracing.pdf");
	pb.copyFile("4_Compositing.pdf");
	pb.copyFile("References.zip");
};


module.exports = {hook};
