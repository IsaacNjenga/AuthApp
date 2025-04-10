import UserModel from "../models/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const register = async (req, res) => {
  const { firstName, lastName, email, password, username, phoneNumber } =
    req.body;
  try {
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    // Check if email already exists
    const emailExists = await UserModel.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ error: "This email is already taken" });
    }

    // Check if username already exists
    const userExists = await UserModel.findOne({ username });
    if (userExists) {
      return res.status(400).json({ error: "This username is already taken" });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = new UserModel({
      firstName,
      lastName,
      email,
      password: hashPassword,
      username,
      phoneNumber,
    });
    const result = await newUser.save();
    result._doc.password = undefined;

    return res.status(201).json({ success: true, ...result._doc });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Find user by username
    const userExists = await UserModel.findOne({ username });
    if (!userExists) {
      return res
        .status(400)
        .json({ error: "User under this name does not exist" });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, userExists.password);
    if (!passwordMatch) {
      return res.json({ error: "Incorrect password. Try again" });
    }

    //generate JWT token
    const token = jwt.sign(
      {
        firstName: userExists.firstName,
        lastName: userExists.lastName,
        email: userExists.email,
        username: userExists.username,
        phoneNumber: userExists.phoneNumber,
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const user = { ...userExists._doc, password: undefined };
    return res.status(201).json({ success: true, user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const fetchUser = async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: "No user ID found " });
  }
  try {
    const objectId = new mongoose.Types.ObjectId(id);
    const fetchedUser = await UserModel.find({ _id: objectId });
    const user = { ...fetchedUser[0]._doc, password: undefined };
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export { register, login, fetchUser, updateUser, deleteUser };
