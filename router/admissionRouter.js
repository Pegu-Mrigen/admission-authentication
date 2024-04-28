import express from "express";
import {
  deleteAdmission,
  getAllAdmissions,
  postAdmission,
  updateAdmissionStatus,
  addNewCourse,
  
} from "../controllers/admissionController.js";
import {
  isAdminAuthenticated,
  isAuthenticated,
} from "../middlewares/auth.js";

const router = express.Router();

 //router.post("/post", isStudentAuthenticated, postAdmission);
router.post("/post", postAdmission);
router.post("/courseType", addNewCourse);
router.get("/getall", isAdminAuthenticated, getAllAdmissions);
router.put("/update/:id", isAdminAuthenticated, updateAdmissionStatus);
router.delete("/delete/:id", isAdminAuthenticated, deleteAdmission);

export default router;
