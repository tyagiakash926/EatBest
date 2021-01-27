const planModel = require("../Model/plansModel");

async function getHomePage(req,res){
    let plans = await planModel.find();
    plans = plans.splice(0,3);
    console.log("gethomepage" , req.name)
    res.render("homepage.pug",{name:req.name , plans:plans});
}
function getLoginPage(req,res){
    res.render("loginpage.pug",{name:req.name});
}
async function getPlansPage(req,res){
    try{
        let plans = await planModel.find();
        // console.log(plans);
        res.render("plans.pug" ,{name:req.name , plans:plans});
    }
    catch(error){
        console.log(error);
    } 
}
function getForgetPasswordPage(req,res){
    res.render("forgetpassword.pug",{name:req.name});
}

function getResetPasswordPage(req,res){
    res.render("resetpassword.pug",{name:req.name});
}
function getProfilePage(req,res){
    // console.log("getProfile page" , req.name);
    // console.log("getProfile page" , req.user)
    // console.log(req.user.reviewPlans);
    res.render("profile.pug" , {user:req.user,name:req.name});
}
async function getReviewPage(req,res){
    try{
        let plans = await planModel.find();
        // console.log(plans);
        res.render("reviewpage.pug" ,{name:req.name , plans:plans});
    }
    catch(error){
        console.log(error);
    } 
}
async function getDetailsPage(req,res){
    try{
        let momos = await planModel.findById("600fa2db22056a55980b2bbf");
        let burger = await planModel.findById("600fa46822056a55980b2bc0");
        let pizza = await planModel.findById("600fa46a22056a55980b2bc1");
        let mojito = await planModel.findById("600fa46e22056a55980b2bc4");
        let salad = await planModel.findById("600fa46c22056a55980b2bc3");
        let chicken = await planModel.findById("600fa46b22056a55980b2bc2");
        let healty = await planModel.findById("600fa46f22056a55980b2bc5");
        let aloochaap = await planModel.findById("600fa47022056a55980b2bc6");
        let coffee = await planModel.findById("600fa48f22056a55980b2bc7");
        // console.log(plans);
        res.render("details",{momos:momos.discount , burger:burger.discount , pizza:pizza.discount , mojito:mojito.discount ,salad:salad.discount ,chicken:chicken.discount ,healty:healty.discount ,aloochaap:aloochaap.discount,coffee:coffee.discount});
    }
    catch(error){
        console.log(error);
    } 
} 


module.exports.getHomePage = getHomePage;
module.exports.getLoginPage = getLoginPage;
module.exports.getPlansPage = getPlansPage;
module.exports.getForgetPasswordPage = getForgetPasswordPage;
module.exports.getResetPasswordPage = getResetPasswordPage;
module.exports.getProfilePage = getProfilePage;
module.exports.getReviewPage= getReviewPage;
module.exports.getDetailsPage=getDetailsPage;