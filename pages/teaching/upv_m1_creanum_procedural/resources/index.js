const hook = async (pb) => {
	pb.copyFile(".htaccess");
	pb.copyFile("1_Introduction.pdf");
	pb.copyFile("2_Textures_procedurales.pdf");
	pb.copyFile("3_Geometry_Nodes.pdf");
};


module.exports = {hook};
