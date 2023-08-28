import express from "express";
// import { createUser, getAdminUsers, getUserById, getUsers } from "./user.controller";
import { buyTicket, createUser, getUserById, getUsers } from "./user.controller";
import authentication from "../../middlewares/authentication.middleware";
const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/create-user", createUser);
router.put("/:id", getUserById);
router.post("/buy-ticket/:id", buyTicket);

export default router;