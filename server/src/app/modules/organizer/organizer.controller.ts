import { NextFunction, Response, Request } from "express";
import { createOrganizerToDB, getOrganizerFromDB, removeOrganizerFromDB, updateOrganizerFromDB } from "./organizer.service";

// add Organizer
export const addOrganizer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const Organizer = await createOrganizerToDB(req.body);
        res.status(200).json({
            status: "success",
            data: Organizer
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            error
        })
    }
}

//get Organizer by id or Organizer list
export const getOrganizer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        if (id) {
            const Organizer = await getOrganizerFromDB(id);
            res.status(200).json({
                status: "success",
                data: Organizer
            })
        } else {
            const Organizer = await getOrganizerFromDB();
            res.status(200).json({
                status: "success",
                data: Organizer
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            error
        })
    }
}


//edit Organizer by Organizer or Organizer list
export const updateOrganizerData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        if (id) {
            const isUpdated = await updateOrganizerFromDB(id, req.body);
            res.status(200).json({
                status: "success",
                data: isUpdated
            })
        } else {
            throw new Error("Organizer not found for this id")
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            error
        })
    }
}

//remove Organizer by Organizer or Organizer list
export const removeOrganizer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        if (id) {
            const Organizer = await removeOrganizerFromDB(id);
            res.status(200).json({
                status: "success",
                data: Organizer
            })
        } else {
            throw new Error("Organizer not found for this id")
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            error
        })
    }
}