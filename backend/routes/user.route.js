import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/mutler.js";


//we get router from express
const router = express.Router();

router.route("/register").post(singleUpload,register);//singleuplaod islie add kia taki hm file save kr pae jese image ya resume
router.route("/login").post(login);//login me need ni
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated, singleUpload ,updateProfile);//update me islie taki update kr pae 

export default router;