import mongoose from "mongoose";
import { ObjectId } from "bson";

const stateSchema = new mongoose.Schema(
    {
        stateName: {type:String, required: true, unique: true, trim: true},
        countryId: {type: ObjectId, ref:"countries", required: true}
    }
);


const STATE = mongoose.model("states", stateSchema);
export { STATE };