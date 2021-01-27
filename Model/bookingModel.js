const mongoose = require("mongoose");
const crypto = require("crypto");
mongoose.connect(
    "mongodb+srv://admin:admin@cluster0.cvhjx.mongodb.net/test?retryWrites=true&w=majority",
    {useNewUrlParser: true , useUnifiedTopology: true})
  .then((db)=>{
    console.log("connected to db!!!");
  });

  //bookedPlan Schema
  const bookedPlanSchema = new mongoose.Schema({
      planId:{
        type:String,
        required:true
      },
      planImage:{
          type:String,
          required:true
      },
      name:{
        type:String,
        required:true
      },
      currentPrice : {
        type:Number,
        required:true
    },
    bookedOn : {
        type:String,
        default:new Date().toLocaleString() // 11/16/2015, 11:18:48 PM
    },
    address : {
        type:String
    }
  }) 

  // booking Schema
  const bookingSchema = new mongoose.Schema({
    userId :{
        type:String,
        required:true
    },
    bookedPlans:{
        type:[bookedPlanSchema],
        required:true
    }
})


const bookingModel = mongoose.model("bookingcollection" , bookingSchema);
module.exports = bookingModel;