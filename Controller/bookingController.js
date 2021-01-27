const stripe = require("stripe");
const planModel = require("../Model/plansModel");
const userModel = require("../Model/usersModel");
const bookingModel = require("../Model/bookingModel");
const stripeObj = stripe('sk_test_51I57ncLVmgB2cGGS5x64WhstuzdE0UXen7ABgWR8PEQ6gcDGNiChirgGnRhHM3kSYUU5tWkszGDk400XHV7EsOeG00liOmSM3Y');
async function createPaymentSession(req , res){
    try{
        const userId = req.id;
        const {planId} = req.body;
        const plan = await planModel.findById(planId);
        const user = await userModel.findById(userId);
        console.log(plan,user)
        // session object isko nhi chedna !!!
        const session = await stripeObj.checkout.sessions.create({
            payment_method_types: ['card'],
            customer_email: user.email,
            client_reference_id: planId,
            line_items: [
              {
                price_data: {
                  currency: 'usd',
                  product_data: {
                    name: plan.name,
                  },
                  unit_amount: plan.price*100,
                },
                quantity: 1,
              },
            ],
            mode: 'payment',
            success_url: 'https://eat-beast.herokuapp.com/',
            cancel_url: 'https://eat-beast.herokuapp.com/',
        })
        res.json({
            session
        })
    }
    catch(error){
        res.json({
            message:"Failed to create payment session",
            error
        })
    }
}


async function checkoutComplete(req,res){
  try{
    const END_POINT_KEY = process.env.END_POINT_KEY;
    // console.log("Checkout complete ran !!");
    // console.log("Request object");
    // console.log(req);
    const stripeSignature = req.headers["stripe-signature"];
  
    console.log("endpoint key = " , END_POINT_KEY);
    console.log("stripeSign = " , stripeSignature);
    console.log("Req.bdoy =>" , req.body);
  
    // if(req.body.data.type == "checkout.session.completed"){
      const userEmail = req.body.data.object.customer_email;
      const planId = req.body.data.object.client_reference_id;
      await createNewBooking(userEmail , planId); 
    // }
  }
  catch(error){
    res.json({
      error
    })
  }

}

async function createNewBooking(userEmail, planId) {
 try{
    const user = await userModel.findOne({email:userEmail});
    const plan = await planModel.findById(planId);
    const userId = user["_id"];
    if(user.bookedPlanId==undefined){
      const bookingOrder = {
        userId : userId,
        bookedPlans : [{planId:planId ,planImage:plan.planImage ,name:plan.name , currentPrice:plan.price , address:userEmail}]
      }
      const newBookingOrder = await bookingModel.create(bookingOrder);
      user.bookedPlanId =  newBookingOrder["_id"];
      await user.save({validateBeforeSave:false});
    }else{
      const newBookedPlan = {
        planId:planId ,
        planImage:plan.planImage ,
        name:plan.name ,
        currentPrice:plan.price ,
        address:userEmail
      }
      const userBookingObject = await bookingModel.findById(user.bookedPlanId);
      userBookingObject.bookedPlans.push(newBookedPlan);
      await userBookingObject.save();
    }
 }
 catch(error){
   return error;
 }
}

module.exports.createPaymentSession = createPaymentSession;
module.exports.checkoutComplete = checkoutComplete;
