import express from "express";
import {
  addNewAdmin,
  getStudentDetails,
  login,
  logoutAdmin,
  logoutStudent,
  studentRegister,
} from "../controllers/studentController.js";

import { isAdminAuthenticated, isAuthenticated } from "../middlewares/auth.js";
import { addNewCourse } from "../controllers/admissionController.js";

const router = express.Router();

router.post("/student/register", studentRegister);
router.post("/login", login);
router.post("/admin/addnew", isAdminAuthenticated, addNewAdmin);
router.post("/course/addnew", isAdminAuthenticated, addNewCourse);
// router.get("/courses", getAllCourses);
router.get("/student/me", isAuthenticated, getStudentDetails);
//router.get("/student/me", getStudentDetails);
router.get("/me");
router.get("/admin/me", isAdminAuthenticated, getStudentDetails);
router.get("/student/logout",isAuthenticated, logoutStudent);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);

export default router;
