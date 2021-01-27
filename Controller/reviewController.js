const userModel = require("../Model/usersModel");
const planModel = require("../Model/plansModel");

async function createReview(req,res){
    try{
        let {id} = req;
        console.log(req.body);
        let reviewObj = req.body;
        let user = await userModel.findById(id);
        console.log(user);
        let array_of_review = user.reviewPlans;
        console.log(array_of_review);
        let newReview = {
            planId :reviewObj.planId,  //plan id meri image h plan ki
            message :reviewObj.message,
            rating:reviewObj.rating,
            bookedOn:reviewObj.mainPlanId, 
        }
        let plan = await planModel.findById(reviewObj.mainPlanId);
        console.log(plan);
        let newReviewForPlan = {
            userId :id,
            userImage :user.pImage,
            userName:user.name,
            message:reviewObj.message,
            rating:reviewObj.rating,
            bookedOn:new Date().toLocaleString(), // 11/16/2015, 11:18:48 PM
        }
        user.reviewPlans.push(newReview);
        plan.discount.push(newReviewForPlan);
        await user.save({validateBeforeSave:false});
        await plan.save({validateBeforeSave:false});

        res.json({
            message:"create review succesfully"
        })
    }
    catch(error){
        console.log(error);
        res.json({
            message:"cant create review",
            error:error
        })
    }

}

async function updateReviewById(req,res){
    // console.log("inside update function");
    try{
        // console.log("inside try");
        let userId = req.id;
        // console.log(userId);
        let {message,mainPlanId} = req.body;
        // console.log(message,mainPlanId);
        let {reviewId} = req.params;
        // console.log(reviewId);
        let user = await userModel.findById(userId);
        // console.log(user);
        let plan = await planModel.findById(mainPlanId);
        // console.log(plan);
        let planReview = plan.discount;
        // console.log(planReview);
        let matchedReviewPlan = planReview.filter((review)=>{
            return review["userId"]==userId;
        })
        // console.log(matchedReviewPlan[0]);
        matchedReviewPlan[0].message=message;
        let Submittedreview = user.reviewPlans;
        let matchedReview = Submittedreview.filter((review)=>{
            return review["_id"] == reviewId;
        })
        matchedReview[0].message = message;
        // console.log(matchedReview);
        await user.save({validateBeforeSave:false});
        await plan.save({validateBeforeSave:false});
        res.json({
            message:"Update review",
        })
    }
    catch(error){
        console.log("inside catch");
        res.json({
            message:"Failed to update review",
            error
          })
    }   
}
async function deleteReviewById(req,res){
    try{
        let userId = req.id;
        let {reviewId} = req.params;
        let {mainPlanId}= req.body;
        let plan = await planModel.findById(mainPlanId);
        let user = await userModel.findById(userId);
        let planReview = plan.discount;
        // console.log(planReview);
        let matchedReviewPlan = planReview.filter((review)=>{
            return review["userId"] != userId;
        })
        plan.discount = matchedReviewPlan;
        await plan.save({validateBeforeSave:false});
        // console.log("user",reviewId);
        let Submittedreview = user.reviewPlans;
        let matchedReview = Submittedreview.filter((review)=>{
            return review["_id"] != reviewId;
        })
        user.reviewPlans = matchedReview;
        await user.save({validateBeforeSave:false});
        res.json({
            message:"delete review",
        })
    }
    catch(error){
        res.json({
            message:"Failed to delete review",
            error
          })
    }   
}



module.exports.createReview = createReview;
module.exports.updateReviewById = updateReviewById;
module.exports.deleteReviewById = deleteReviewById;

