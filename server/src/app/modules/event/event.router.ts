import express from "express";
import { addEvent, addReviewForEventData, getEvent, getOrganizerEventList, getOrganizerEventListByAdmin, updateEventData } from "./event.controller";
import authentication from "../../middlewares/authentication.middleware";
const router = express.Router();

/*
    1. create event
    2. all event or event by id
    3. event list by category | single category's event list
    5. event by organizer id
*/


router.post("/create", authentication, addEvent);
router.get("/", getEvent);
router.put("/update/:id", authentication, updateEventData);
router.get("/organizer-eventList", authentication, getOrganizerEventList);
router.post("/admin/organizer-eventList", authentication, getOrganizerEventListByAdmin);
router.post("/add-review/:id", addReviewForEventData);
router.get("/:id", getEvent);


export default router;