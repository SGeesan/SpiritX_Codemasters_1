import express from "express";
import dotenv from "dotenv";
import userController from "../controllers/user.controller.js";

dotenv.config();

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get('/user', userController.checkAuth);

export default router;