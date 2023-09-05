import express from "express";
import authentication from "../../middlewares/authentication.middleware";
import { createTicket, getTicketListByToken } from "./ticket.controller";
const router = express.Router();

router.post("/create-ticket", authentication, createTicket);
router.get("/get-users-ticket", authentication, getTicketListByToken);

export default router;