import { Schema, model } from "mongoose";
import { IEvent_type } from "./eventType.interface";

const event_typeSchema = new Schema<IEvent_type>({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    title: { type: String, required: true, unique: false },
    posterUrl: { type: String, required: true },
});


const Event_type = model("Event_type", event_typeSchema);

export default Event_type;