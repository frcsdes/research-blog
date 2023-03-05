const hook = async (pb) => {
	pb.copyFile(".htaccess");
	pb.copyFile(".htpasswd");
};


module.exports = {hook};
