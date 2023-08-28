import express from "express";
import { addEvent, getEvent, updateEventData } from "./event.controller";
const router = express.Router();

/*
    1. create event
    2. all event or event by id
    3. event list by category | single category's event list
    5. event by organizer id
*/


router.post("/", addEvent);
router.get("/", getEvent);
router.get("/:id", getEvent);
router.put("/:id", updateEventData);

export default router;