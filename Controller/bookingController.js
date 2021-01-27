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
            success_url: 'http://localhost:3000/',
            cancel_url: 'http://localhost:3000/',
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

async function createNewBooking(userEmail, planId) {
  
}

module.exports.createPaymentSession = createPaymentSession;
