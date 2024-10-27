import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminJobs, getAllJobs, getJobByID, postJob } from "../controllers/job.controller.js";


//we get router from express
const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated,getAllJobs);
router.route("/get/:id").get(isAuthenticated, getJobByID);//using params we can do it
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);

export default router;
