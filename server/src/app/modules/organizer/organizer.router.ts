import express from "express";
import { registerOrganizer, removeOrganizer, updateOrganizerData, loginOrganizer, getAllOrganizer, getOrganizerByIdToken, updateOrganizerState } from "./organizer.controller";
import authentication from "../../middlewares/authentication.middleware";
const router = express.Router();

/*
    create organizer
    organizer list
    organizer by id
    update organizer data;
*/

router.post("/register", registerOrganizer);
router.post("/login", loginOrganizer);
router.get("/detail", authentication, getOrganizerByIdToken); //role organizer
router.put("/update", authentication, updateOrganizerData); //role organizer

router.get("/all", authentication, getAllOrganizer); // role admin
router.post("/admin-approval", authentication, updateOrganizerState); // role admin

export default router;