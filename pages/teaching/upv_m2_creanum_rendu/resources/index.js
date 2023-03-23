const hook = async (pb) => {
	pb.copyFile(".htaccess");
	pb.copyFile("1_Introduction.pdf");
	pb.copyFile("2_Modelisation_lumiere.pdf");
	pb.copyFile("References.zip");
};


module.exports = {hook};
