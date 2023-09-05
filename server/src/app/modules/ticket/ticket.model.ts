import { Schema, model } from "mongoose";
import { ITicket } from "./ticket.interface";

// creating schema using interface
const ticketSchema = new Schema<ITicket>({
    price: { type: Number, required: true },
    user_id: { type: String, required: true },
    event_id: { type: String, required: true },
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

// user_id: {
//     type: Schema.Types.ObjectId,
//     ref: "User"
// },