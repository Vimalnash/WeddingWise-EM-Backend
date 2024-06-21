import mongoose from "mongoose";

const eventServiceSchema = new mongoose.Schema(
    {
        eventServiceName: {type: String, required: true, unique: true},
    },
    {
        timestamps: true
    }
);

const EVENTSERVICE = mongoose.model("eventservices", eventServiceSchema);
export { EVENTSERVICE };