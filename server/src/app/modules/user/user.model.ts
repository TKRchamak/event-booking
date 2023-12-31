import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";

// creating schema using interface
const userSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: false },
    // lastName: { type: String, required: true, unique: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: false },
    // gender: { type: String, enum: ["male", "female"], required: true, unique: false },
    // role: { type: String, enum: ["user", "admin"], required: true, unique: false },
    role: { type: String, default: "user", required: true, unique: false },
    profile_pic_url: { type: String, required: false, unique: false },
    // contactNo: { type: String, required: true, unique: false },
    // address: { type: String, required: true, unique: false },
    selected_city: { type: String, default: "", required: false, unique: false },
    interest_list: { type: Array, default: [], required: false, unique: false }, // event type id
    watch_list: { type: Array, default: [], required: false, unique: false }, // event id
    favorite_list: { type: Array, default: [], required: false, unique: false }, // organizer id
    // favorite_list: [{ type: Schema.Types.ObjectId, ref: 'Event' }], // organizer id
    // ticket_list: { type: Array, required: false, unique: false }, // ticket id
});

const User = model("User", userSchema);

export default User;