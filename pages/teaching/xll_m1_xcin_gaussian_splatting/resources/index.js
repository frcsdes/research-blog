export const hook = async (pb) => {
	pb.copyFile(".htaccess");

	pb.copyFile("1_Introduction.pdf");
	pb.copyFile("2_Gaussian_Splatting.pdf");
	pb.copyFile("3_Research_Avenues.pdf");

	pb.copyFile("Color_Grading.pdf");
	pb.copyFile("Color_Grading.zip");
	pb.copyFile("Mesh_Reconstruction.pdf");
	pb.copyFile("Mesh_Reconstruction.zip");
	pb.copyFile("Scene_to_Splats.pdf");
	pb.copyFile("Efficient_4DGS.pdf");
};
