import { Schema, model } from "mongoose";
import { IEvent } from "./event.interface";

const eventSchema = new Schema<IEvent>({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    title: { type: String, required: true, unique: true },
    organizer: { type: String, required: true, unique: false },
    city: { type: String, required: true, unique: false },
    type: { type: String, required: true, unique: true },
    latitude: { type: String, required: true, unique: false },
    longitude: { type: String, required: true, unique: false },
    image: { type: String, required: false, unique: false },
    poster: { type: String, required: false, unique: false },
    general_info: { type: String, required: true, unique: false },
    description: { type: String, required: true, unique: false },
    seat_quantity: { type: Number, required: true, unique: false },
    time_slot: { type: Array, required: true, unique: false },
    reviews: { type: Array, required: true, unique: false },
    ticket_cat: [{ type: Schema.Types.ObjectId, ref: 'Ticket' }],
    // ticket_cat: { type: Array, required: true, unique: false },
});


const Event = model<IEvent>("Event", eventSchema);

export default Event;