const express = require("express");
const { protectRoute, isAuthorised } = require("../Controller/authController");
const planRouter = express.Router();
const {createPlan , getAllPlan,getPlanById,updatePlanById,deletePlanById} = require("../Controller/planController");
planRouter.route("").get(protectRoute,getAllPlan).post(createPlan);
planRouter.route("/:id").get(protectRoute,getPlanById).patch(protectRoute,isAuthorised,updatePlanById).delete(protectRoute,isAuthorised,deletePlanById);


module.exports = planRouter;