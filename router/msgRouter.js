import express from "express";
import {
  getAllMessages,
  sendMessage,
} from "../controllers/msgController.js";
 import { isAdminAuthenticated } from "../middlewares/auth.js";
const router = express.Router();


router.post("/send", sendMessage);
 router.get("/getall",isAdminAuthenticated,  getAllMessages);
// router.get("/getall",  getAllMessages);

export default router;
