const express = require("express");
const { signup, login, protectRoute,forgetpassword,resetpassword   } = require("../Controller/authController");
const userRouter = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req , file , cb){
    cb(null , "public/images/users")
  } ,
  filename : function(req , file , cb){
    cb(null , `user${Date.now()}.jpg`);
  } 
})

function fileFilter(req , file , cb){
  if(file.mimetype.includes("image")){
    cb(null , true);
  }
  else{
    cb(null , false);
  }
}
const upload = multer({storage:storage , fileFilter:fileFilter});
const {getAllUser,getUserById,updateUserById,deleteUserById,createUser , updateProfilePhoto} = require("../Controller/userController");
// userRouter.route("").get(getAllUser).post(createUser);

userRouter.route("/forgetpassword").post(forgetpassword);
userRouter.route("/resetpassword/:token").patch(resetpassword);
userRouter.route("/signup").post(signup);
userRouter.route("/login").post(login);
userRouter.use(protectRoute);
userRouter.patch("/updateprofilephoto" , upload.single("user") , updateProfilePhoto);
userRouter.route("").get(getUserById).patch(updateUserById).delete(deleteUserById);
module.exports = userRouter;