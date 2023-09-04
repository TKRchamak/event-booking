import { Schema, model } from "mongoose";
import { IEvent } from "./event.interface";

const eventSchema = new Schema<IEvent>({
    name: { type: String, required: true, unique: true },
    title: { type: String, required: true, unique: true },
    organizer: { type: String, required: true, unique: false },
    city: { type: String, required: true, unique: false },
    type: { type: String, required: true, unique: false },
    location: { type: Object, required: true, unique: false },
    image: { type: String, required: false, unique: false },
    poster: { type: String, required: false, unique: false },
    general_info: { type: String, required: true, unique: false },
    description: { type: String, required: true, unique: false },
    seat_quantity: { type: String, required: true, unique: false },
    time_slot: { type: Array, required: true, unique: false },
    reviews: { type: Array, required: true, unique: false },
    ticket_cat: { type: Array, required: true, unique: false },
    duration: { type: Number, required: true, unique: false },

    // ticket_cat: [{ type: Schema.Types.ObjectId, ref: 'Ticket' }],
    // name: {
    //     firstName: { type: String, required: true, unique: false },
    //     middleName: { type: String, required: false, unique: false },
    //     lastName: { type: String, required: true, unique: false },
    // },
    // ticket_cat: { type: Array, required: true, unique: false },
});


const Event = model("Event", eventSchema);

export default Event;