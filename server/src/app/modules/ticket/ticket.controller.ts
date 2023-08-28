import { Request, Response, NextFunction } from "express";
import { createTicketToDB } from "./ticket.service";

export const createTicket = async (req: Request, res: Response, next: NextFunction) => {
    try {
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
