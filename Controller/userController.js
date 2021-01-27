const { error } = require("jquery");
const userModel = require("../Model/usersModel");


async function getAllUser(req,res){
    try{
      let users = await userModel.find({});
      res.json({
        message:"Got all users",
        data:users,
      });
    }
    catch(error){
      console.log(error);
      res.json({
        message:"failed to get All users",
        error:error
      });
    }
  }
async function createUser(req,res){
    try{
      let sentuser = req.body;
      let user = await userModel.create(sentuser);
      res.json({
        message:"user created",
        data:user,
      });
    }
    catch(error){
      console.log(error);
      res.json({
        message:"user not created",
        error:error
      });
    }
  }
  async function getUserById(req,res){
    try{
      let id = req.id;
      let user = await userModel.findById(id);
      res.json({
          message:"user get by id",
          data:user,
      });
    }
    catch(error){
      console.log(error);
        res.json({
          message:"fail to get user by id",
          error:error
        });
     }
  }
  async function updateUserById(req,res){
    try{
      let id = req.id;
      // console.log("in updateUser by id");
      let updateObj = req.body.updateObj;
      let user = await userModel.findById(id);
      // console.log(user);
      for(key in updateObj){
        user[key] = updateObj[key];
      }
      // console.log(user);
      let updatedUser = await user.save();
      console.log("Hii")
      res.status(201).json({
        message:"Updated User",
        data : updatedUser
      })
  
    }
    catch(error){
      res.status(501).json({
        message:"Failed to update user",
        error
      })
    }
  }
  async function deleteUserById(req,res){
    try{
      let id = req.id;
      let deletedUser =await userModel.findByIdAndDelete(id);
      if(deletedUser){
        res.status(200).json({
          message:"User deleted Succesfulyy !!",
          data : deletedUser
        })
      }
      else{
        res.status(200).json({
          message:"User not Found !!!"
        })
      }
    }
    catch(error){
      res.status(501).json({
        message:"Failed to delete",
        error
      })
    }
  }

  async function updateProfilePhoto(req , res){
    try{
      let file = req.file;
      console.log(file);
      let imagePath = file.destination+"/"+file.filename;
      imagePath = imagePath.substring(6);
      
      let id = req.id;
      let user = await userModel.findById(id);
      user.pImage = imagePath;
      await user.save({validateBeforeSave:false}); 
      res.json({
        message:"Profile Photo updated !!"
      })
    }
    catch(error){
      res.status(200).json({
        message:"failed to update photo !!",
        error
      })
    }
  }
  


  module.exports.getAllUser = getAllUser;
  module.exports.createUser = createUser;
  module.exports.getUserById = getUserById;
  module.exports.updateUserById = updateUserById;
  module.exports.deleteUserById = deleteUserById;
  module.exports.updateProfilePhoto = updateProfilePhoto;
//   {
//       getAlluser:getAllUser,
//       createUser:createUser   
//   }

// function getAllUser(req,res){
//     if(users.length){
//       res.json({
//         message:"Got all users successfully",
//         data:users,
//       })
//     } else{
//       res.json({
//         message:"no user found"
//       })
//     }
//   }
//   function createUser(req,res){
//     let user = req.body;
//     user.id = uuidv4();
//     users.push(user);
//     let PlansPath = path.join(__dirname,'..','Model','usersModel.json');
//     fs.writeFileSync(PlansPath,JSON.stringify(users));
//     res.json({
//       message:"ADDED succesfully",
//       data:users,
//     })
//   }
//   function getUserById(req,res){
//     let {id} =req.params;
//     let filteredUser = users.filter(function(user){
//       return user.id==id;
//     }) 
//     if(filteredUser.length){
//       res.json({
//         message:"user found",
//         data:filteredUser
//       })
//     }else{
//       res.json({
//         message:"user not found"
//       })
//     }
//   }
//   function updateUserById(req,res){
//     let {id} = req.params;
//     let updateObj = req.body;
//     let filteredUser = users.filter(function(user){
//       return user.id==id;
//     })
//     if(filteredUser.length){
//       let user = filteredUser[0];
//       for(key in updateObj){
//         user[key] = updateObj[key];
//       } 
//       let PlansPath = path.join(__dirname,'..','Model','usersModel.json');
//       fs.writeFileSync(PlansPath,JSON.stringify(users));
//       res.json({
//         message:"update succesfully"
//       })
//     }else{
//       res.json({
//         message:"no user found"
//       })
//     }
//   }
//   function deleteUserById(req,res){
//     let {id} = req.params;
//     let filteredUsers = users.filter(function(user){
//       return user.id != id;
//     })
//     if(filteredUsers.length==users.length){
//       res.json({
//         message:"USer not found",
//       })
//     }else{
//       let PlansPath = path.join(__dirname,'..','Model','usersModel.json');
//       fs.writeFileSync(PlansPath,JSON.stringify(filteredUsers));
//       res.json({
//         message:"delete sucessfully",
//         data:filteredUsers
//       })
//     }
//   }
