import { Schema, model } from "mongoose";
import { IOrganizer } from "./organizer.interface";

const organizerSchema = new Schema<IOrganizer>({
    owner_name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: 'organizer' },
    password: { type: String, required: true, unique: false },
    organization_name: { type: String, required: true, unique: true },
    organization_title: { type: String, required: true, unique: true },
    organization_logo: { type: String, required: true, unique: false },
    organization_poster: { type: String, required: true, unique: false },
    // start_at: { type: Date, required: true, unique: false },
    // country: { type: String, required: true, unique: false },
    event_list: { type: Array, required: false, unique: false },
    description: { type: String, required: true, unique: false },
    followers: { type: Array, required: false, unique: false },
    status: { type: String, enum: ["active", "reject", "pending"], required: true, unique: false },
});


const Organizer = model<IOrganizer>("Organizer", organizerSchema);

export default Organizer;