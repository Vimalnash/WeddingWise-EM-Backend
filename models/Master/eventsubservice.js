import mongoose from "mongoose";
import { ObjectId } from "bson";

const eventSubServiceSchema = new mongoose.Schema(
    {
        eventServiceId: {type: ObjectId, ref:"eventservices", required: true},
        subServiceName: {type: String, unique: true},
        subServiceDescription: {type: String, maxlength: 256}
    },
    {
        timestamps: true
    }
);

const EVENTSUBSERVICE = mongoose.model("eventsubservices", eventSubServiceSchema);
export { EVENTSUBSERVICE };