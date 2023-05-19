import express from "express";
import { signout } from "../controllers/authController.js";

const router = express.Router();

router.get("/signout", signout);

export default router;
