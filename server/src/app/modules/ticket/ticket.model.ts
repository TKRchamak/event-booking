import { Schema, model } from "mongoose";
import { ITicket } from "./ticket.interface";

// creating schema using interface
const ticketSchema = new Schema<ITicket>({
    price: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    event: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    ticket_date: { type: Date, required: true },
    time_slot: { type: Object, required: true },
    quantity: { type: Number, required: true },
    status: { type: String, default: "active", enum: ["active", "done"], required: true },
    discount: { type: Number, required: false },
    description: { type: String, required: false },
}, {
    timestamps: true, // This option will automatically create 'created_at' and 'updated_at' fields
});

const Ticket = model("Ticket", ticketSchema);

export default Ticket;