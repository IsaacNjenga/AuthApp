import express from "express";
import {
  deleteUser,
  fetchUser,
  login,
  register,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

//user routes
router.post("/sign-in", login);
router.post("/sign-up", register);
router.get("/get-profile", fetchUser);
router.put("/update-profile", updateUser);
router.delete("/delete-profile", deleteUser);

export { router as Router };
