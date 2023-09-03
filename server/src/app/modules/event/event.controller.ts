import { Request, Response, NextFunction } from "express";
import { addEventToDB, addReviewToEventToDB, getEventFromDB, getEventListByIdList, removeEventFromDB, updateEventFromDB } from "./event.service";

// add event_type
export const addEvent = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        console.log("=============its working=================");
        const { userId, role } = req.authUser
        if (role !== "organizer") {
            return res.status(401).json({
                status: "error",
                error: "You are not organizer"
            })
        }
        if (userId !== req.body.organizer) {
            return res.status(401).json({
                status: "error",
                error: "Something wrong"
            })
        }
        const event_type = await addEventToDB(req.body);
        return res.status(200).json({
            status: "success",
            data: event_type
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            error
        })
    }
}

//edit event_type by event_type or event_type list
export const addReviewForEventData = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        if (id) {
            const isUpdated = await addReviewToEventToDB(id, req.body);
            return res.status(200).json({
                status: "success",
                data: isUpdated
            })
        } else {
            throw new Error("This Event_type not found for this id")
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            error
        })
    }
}

//get event_type by id or event_type list
export const getEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        if (id) {
            const event_type = await getEventFromDB(id);
            return res.status(200).json({
                status: "success",
                data: event_type
            })
        } else {
            const event_type = await getEventFromDB();
            return res.status(200).json({
                status: "success",
                data: event_type
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            error
        })
    }
}

//get event_type by id or event_type list
export const getOrganizerEventList = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        const { userId, role } = req.authUser;
        console.log(role, userId);
        const eventList = await getEventListByIdList(userId);
        return res.status(200).json({
            status: "success",
            data: eventList
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            error
        })
    }
}

//get event_type by id or event_type list
export const getOrganizerEventListByAdmin = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        const { userId, role } = req.authUser;
        if (role !== "admin") {
            return res.status(500).json({
                status: "error",
                error: "You are not Authorized"
            })
        }
        const eventList = await getEventListByIdList(req.body._id);
        return res.status(200).json({
            status: "success",
            data: eventList
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            error
        })
    }
}

//edit event_type by event_type or event_type list
export const updateEventData = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        const { role } = req.authUser
        if (role !== "organizer") {
            return res.status(401).json({
                status: "error",
                error: "You are not organizer"
            })
        }

        const { id } = req.params;
        if (id) {
            const isUpdated = await updateEventFromDB(id, req.body);
            return res.status(200).json({
                status: "success",
                data: isUpdated
            })
        } else {
            throw new Error("This Event_type not found for this id")
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            error
        })
    }
}

//remove event by id or event list
export const removeEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        if (id) {
            const eventType = await removeEventFromDB(id);
            return res.status(200).json({
                status: "success",
                data: eventType
            })
        } else {
            throw new Error("EventType not found for this id")
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            error
        })
    }
}