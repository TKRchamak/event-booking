import { Schema, model } from "mongoose";
import { ICity } from "./city.interface";

const citySchema = new Schema<ICity>({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: false },
    title: { type: String, required: true, unique: false },
    logoUrl: { type: String, required: true },
    posterUrl: { type: String, required: true },
});


const City = model("City", citySchema);

export default City;