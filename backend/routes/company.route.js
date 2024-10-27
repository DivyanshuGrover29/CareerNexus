import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";
import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/mutler.js";


//we get router from express
const router = express.Router();

router.route("/register").post(isAuthenticated , registerCompany);
router.route("/get").get(isAuthenticated ,getCompany);
router.route("/get/:id").get(isAuthenticated,getCompanyById);//using params we can do it
router.route("/update/:id").put(isAuthenticated,singleUpload ,updateCompany);//multer dalna jaruri hai vrna undefined aaaega sb

export default router;