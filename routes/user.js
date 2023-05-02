import express from "express";
import { getMyProfile, login, logout, register } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Routes
router.post("/new", register)
router.post("/login", login)
router.get("/logout", logout) 

// Both route are the same the commented one and the below one
router.get("/me", isAuthenticated, getMyProfile)


// router.get("/userid/:id", getUserDetails)
// router.put("/userid/:id", updateUser)
// router.delete("/userid/:id", deleteUser)


export default router;