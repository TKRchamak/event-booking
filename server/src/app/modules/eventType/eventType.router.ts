import express from "express";
import { addEvent_type, getEvent_type, removeEventType, updateEventTypeData } from "./eventType.controller";
const router = express.Router();

/*
    add event_type
    event_type list
    event_type by id
    update event_type data
    // remove event_type
*/

router.post("/", addEvent_type);
router.get("/", getEvent_type);
router.get("/:id", getEvent_type);
router.put("/:id", updateEventTypeData);
// router.delete("/:id", removeEventType);

export default router;