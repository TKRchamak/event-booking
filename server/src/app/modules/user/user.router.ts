import express from "express";
import { registerUser, getUserByToken, loginUser, updateUserByToken, buyTicket, getTicketList, getTicket } from "./user.controller";
import authentication from "../../middlewares/authentication.middleware";
const router = express.Router();

router.post("/register-user", registerUser);
router.post("/login", loginUser);
router.get("/detail", authentication, getUserByToken);
router.put("/update", authentication, updateUserByToken);
router.post("/buy-ticket", authentication, buyTicket);
router.get("/get-all-ticket", authentication, getTicketList);
router.get("/get-single-ticket", authentication, getTicket);
// router.get("/", getUsers);

export default router;