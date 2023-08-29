import { Request, Response, NextFunction } from "express";
import { createTicketToDB, getTicketFromDB } from "./ticket.service";

export const createTicket = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        // const { userId, role } = req.authUser;
        const ticket = await createTicketToDB(req.body);
        res.status(200).json({
            status: "success",
            data: ticket
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            error
        })
    }
}

export const getTicketListByToken = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        const { userId, role } = req.authUser;
        const ticket = await getTicketFromDB(userId);
        res.status(200).json({
            status: "success",
            data: ticket
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            error
        })
    }
}
