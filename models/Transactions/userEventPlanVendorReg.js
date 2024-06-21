import mongoose from "mongoose";
import { ObjectId } from "bson";


const userEventPlanVendorReg = new mongoose.Schema(
    {
        userId: {type: ObjectId, ref:"users", required: true},
        eventPlanMainId: {type: ObjectId, ref:"usereventplanmains", required: true},
        eventServiceId: {type: ObjectId, ref:"eventservices", required: true},
        startTime: {type: String, required: true},
        endTime: {type: String, required: true},
        vendorId: {type: ObjectId, ref:"vendors", required: true, default: null},
        amount: {type: Number, required: true},
        description:  {type: String, required: true},
        registered: {type:Boolean, required: true, default: false}
    },
    {
        timestamps: true
    }
);

const USEREVENTPLANVENDORREG= mongoose.model("usereventplanregs", userEventPlanVendorReg );
export { USEREVENTPLANVENDORREG };

