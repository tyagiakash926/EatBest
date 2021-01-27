const mongoose = require("mongoose");
const crypto = require("crypto");
mongoose.connect(
    "mongodb+srv://admin:admin@cluster0.cvhjx.mongodb.net/test?retryWrites=true&w=majority",
    {useNewUrlParser: true , useUnifiedTopology: true})
  .then((db)=>{
    console.log("connected to db!!!");
  });

  const reviewObjSchema = new mongoose.Schema({
    planId : {
        type:String,
        required:true
    },
    message : {
        type:String,
        required:true
    },
    rating : {
      type:Number
    },
    bookedOn : {
        type:String, // main planid
    }
})

  let userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        minlength:[6,"password mustbe greater than 6 chracters"],
        required:true,
    },
    confirmPassword:{
      type:String,
      minlength:[6,"password mustbe greater than 6 chracters"],
      required:true,
      validate:{
          validator:function(){
              return this.confirmPassword == this.password;
          },
          message:"password didn't matched"
      }
    },
    role:{
        type:String,
        enum:["admin","user","delivery boy","restaurant owner"],
        default:"user"
    },
    pImage:{
      type:String,
      default:"/images/users/default.png"
    },
    reviewPlans:{
      type:[reviewObjSchema],
    },
    pwToken:String,
    tokenTime:String,
    bookedPlanId : {
      type:String
    }
})
//it will called before create 
userSchema.pre("save" , function(){
    this.confirmPassword = undefined;
  })

  userSchema.methods.createResetToken = function(){
    let token = crypto.randomBytes(32).toString("hex");
    let time = Date.now() * 60 * 10 * 1000;
    // token time banado
    this.pwToken = token;
    this.tokenTime = time;
    return token;
    // and set in current document
    // save()
  }

  userSchema.methods.resetPasswordHandler = function(password , confirmPassword){
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.pwToken =undefined;
    this.tokenTime=undefined;
  }
const userModel = mongoose.model("userscollection",userSchema);

module.exports = userModel;