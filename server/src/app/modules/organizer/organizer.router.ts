import express from "express";
import { addOrganizer, getOrganizer, removeOrganizer, updateOrganizerData } from "./organizer.controller";
const router = express.Router();

/*
    create organizer
    organizer list
    organizer by id
    update organizer data;
*/

router.post("/", addOrganizer);
router.get("/", getOrganizer);
router.get("/:id", getOrganizer);
router.put("/:id", updateOrganizerData);
// router.delete("/:id", removeOrganizer);

export default router;