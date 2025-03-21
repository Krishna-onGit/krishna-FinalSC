import express from "express";
import { getCompany, getCompanyById, registerCompany, updateCompany,deleteCompany} from "../controllers/company.controllers.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { multipleUpload } from "../middlewares/multer.js";



const router = express.Router();
router.route("/register").post(isAuthenticated,registerCompany);
router.route("/get").get(isAuthenticated,getCompany);
router.route("/get/:id").get(isAuthenticated,getCompanyById);
router.route("/update/:id").put(isAuthenticated,multipleUpload,updateCompany);
router.route("/delete/:id").delete(isAuthenticated,deleteCompany);
export default router;