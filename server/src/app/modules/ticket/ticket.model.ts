import { Schema, model } from "mongoose";
import { ITicket } from "./ticket.interface";

// creating schema using interface
const ticketSchema = new Schema<ITicket>({
    id: { type: String, required: true, unique: true },
    description: { type: String, required: true, unique: true },
    discount: { type: String, required: false },
    price: { type: String, required: true, unique: true },
    user_id: { type: String, required: true },
    event_id: { type: String, required: true },
    ticket_date: { type: String, required: true },
    time_slot: { type: String, required: true },
});

const Ticket = model("Ticket", ticketSchema);

export default Ticket;