import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyJob , getAppliedJobs , getApplicants , updateStatus } from "../controllers/application.controller.js";


//we get router from express
const router = express.Router();

router.route("/apply/:id").get(isAuthenticated, applyJob);
router.route("/getapplied").get(isAuthenticated, getAppliedJobs);
router.route("/:id/applicants").get(isAuthenticated, getApplicants);//using params we can do it
router.route("/status/:id/update").post(isAuthenticated, updateStatus);

export default router;
