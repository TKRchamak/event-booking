import { Schema } from "mongoose";

export interface ITicket {
    _id: Schema.Types.ObjectId;
    user: Schema.Types.ObjectId;
    event: Schema.Types.ObjectId;
    price: number;
    ticket_date: Date;
    time_slot: object;
    quantity: number;
    status: "active" | "done";
    discount?: number;
    description?: string;
}