import { Request, Response, NextFunction } from "express";
import { addEvent_typeToDB, getEvent_typeFromDB, removeEvent_typeFromDB, updateEvent_typeFromDB } from "./eventType.service";

// add event_type
export const addEvent_type = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const event_type = await addEvent_typeToDB(req.body);
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

//get event_type by id or event_type list
export const getEvent_type = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        if (id) {
            const event_type = await getEvent_typeFromDB(id);
            return res.status(200).json({
                status: "success",
                data: event_type
            })
        } else {
            const event_type = await getEvent_typeFromDB();
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


//edit event_type by event_type or event_type list
export const updateEventTypeData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        if (id) {
            const isUpdated = await updateEvent_typeFromDB(id, req.body);
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

//remove event_type by event_type or event_type list
export const removeEventType = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        if (id) {
            const eventType = await removeEvent_typeFromDB(id);
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