import express from "express";
// import { createUser, getAdminUsers, getUserById, getUsers } from "./user.controller";
import { createUser } from "./user.controller";
const router = express.Router();

// router.get("/", getUsers);
router.post("/create-user", createUser);
// router.post("/admins", getAdminUsers);
// router.get("/:id", getUserById);

export default router;