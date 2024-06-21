import mongoose from "mongoose";
import { ObjectId } from "bson";

const citySchema = new mongoose.Schema(
    {
        cityName: {type: String, requierd: true, trim: true},
        stateId: {type: ObjectId, ref: "states", required: true}
    }
);

const CITY = mongoose.model("cities", citySchema);
export { CITY };