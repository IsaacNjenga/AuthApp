import express from "express";
import {
  deleteUser,
  fetchUser,
  login,
  passwordChange,
  register,
  updateUser,
} from "../controllers/userController.js";
import { otpRequest, verifyOtp } from "../controllers/emailController.js";

const router = express.Router();

//user routes
router.post("/sign-in", login);
router.post("/sign-up", register);
router.get("/get-profile", fetchUser);
router.put("/update-profile/:id", updateUser);
router.delete("/delete-profile", deleteUser);
router.post("/password-change", passwordChange);

//mail routes
router.post("/otp-request", otpRequest);
router.post("/verify-otp", verifyOtp);

export { router as Router };
