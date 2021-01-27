const { error } = require("jquery");
const planModel = require("../Model/plansModel");


async function getAllPlan(req,res){
    try{
      let plans = await planModel.find({});
      res.json({
        message:"Got all plans",
        data:plans,
      });
    }
    catch(error){
      console.log(error);
      res.json({
        message:"failed to get All plans",
        error:error
      });
    }
  }
async function createPlan(req,res){
    try{
      let sentplan = req.body;
      let plan = await planModel.create(sentplan);
      res.json({
        message:"plan created",
        data:plan,
      });
    }
    catch(error){
      console.log(error);
      res.json({
        message:"plan created",
        error:error.errors.discount.message
      });
    }

    // let plan = req.body;
    // planModel.create(plan).then(plan=>{
    //   console.log(plan);
    //   res.json({
    //     message:"plan created",
    //     data:plan,
    //   });
    // })
    // .catch(error=>{
    //   console.log(error);
    //   res.json({
    //     message:"plan created",
    //     error:error.errors.discount.message
    //   });
    // })
  }
  async function getPlanById(req,res){
   try{
    let {id} = req.params;
    let plan = await planModel.findById(id);
    res.json({
      message:"plan get by id",
      data:plan,
    });
   }
   catch(error){
    console.log(error);
      res.json({
        message:"fail to get plan by id",
        error:error
      });
   }
  }
  async function updatePlanById(req,res){
    try{
      let id = req.params.id;
      let {updateObj} = req.body;
      console.log(id);
      console.log("update plan by id function")
      // let plan = await planModel.findByIdAndUpdate(id,updateObj,{new:true});
      let plan = await planModel.findById(id);
      console.log(plan);
      for(key in updateObj){
        plan[key] = updateObj[key]
      }
      let updatedPlan = await plan.save();
      res.json({
        message:"update plan by id",
        data:updatedPlan,
      });
    }
    catch(error){
      console.log(error);
      res.json({
        message:"fail to update plan by id",
        error:error
      });
    }
  }
  async function deletePlanById(req,res){
    try{
      let {id }= req.params;
      let deletedPlan = await planModel.findByIdAndDelete(id);
      res.json({
        message:"delete plan by id",
        data:deletedPlan,
      });
    }
    catch(error){
      console.log(error);
      res.json({
        message:"fail to update plan by id",
        error:error
      });
    }
  }

  module.exports.getAllPlan=getAllPlan;
  module.exports.createPlan=createPlan;
  module.exports.getPlanById=getPlanById;
  module.exports.updatePlanById=updatePlanById;
  module.exports.deletePlanById=deletePlanById;

//   {
//       getAlluser:getAllUser,
//       createUser:createUser   
//   }
