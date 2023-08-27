import { Schema, model } from "mongoose";
import { IEvent } from "./event.interface";

const event = new Schema<IEvent>({
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
    ticket_cat: { type: Array, required: true, unique: false },


    // id: string;
    // name: string;
    // title: string;
    // organizer: string; // organizer id
    // city: string;
    // type: string;
    // latitude: string;
    // longitude: string;
    // image: string;
    // poster: string;
    // description: string;
    // general_info?: string;
    // seat_quantity: number;
    // time_slot: string[];
    // reviews?: string[];
    // ticket_cat?: ITicketType[];
});


const Event = model<IEvent>("Event", event);

export default Event;