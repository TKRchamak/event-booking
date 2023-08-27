import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";

// creating schema using interface
const userSchema = new Schema<IUser>({
    id: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    name: {
        firstName: { type: String, required: true, unique: false },
        lastName: { type: String, required: true, unique: false },
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: false },
    gender: { type: String, enum: ["male", "female"], required: true, unique: false },
    role: { type: String, enum: ["user", "admin"], required: true, unique: false },

    contactNo: { type: String, required: true, unique: false },
    address: { type: String, required: true, unique: false },
    selected_city: { type: String, required: false, unique: false },
    interest_list: { type: Array, required: false, unique: false }, // event type id
    watch_list: { type: Array, required: false, unique: false }, // event id
    favorite_list: { type: Array, required: false, unique: false }, // organizer id
    ticket_list: { type: Array, required: false, unique: false }, // ticket id
});

// userSchema.static('getAdminUsers', async function getAdminUsers(): Promise<IUser[]> {
//     const admin = await this.find({ role: "admin" });
//     return admin;
// });

// userSchema.method('fullName', function fullName() {
//     return this.name.firstName + ' ' + this.name.lastName;
// });

const User = model<IUser>("User", userSchema);

export default User;