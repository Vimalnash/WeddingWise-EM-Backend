import mongoose from "mongoose";
import { ObjectId } from "bson";

const userPaymentSchema = new mongoose.Schema(
    {
        userId: {type: ObjectId, ref: "users", required: true},
        eventPlanMainId: {type: ObjectId, ref:"usereventplanmains", required: true},
        eventPlanVendorRegId: {type: ObjectId, ref: "usereventplanregs", required: true},
        vendorId: {type: ObjectId, ref: "vendors", required: true},
        payType: {type: String, enum:["cash", "card", "cheque", "online" ], required: true},
        paidDate: {type: String, required: true},
        amount: {type: Number, required: true},
        remarks: {type: String, default: null}
    },
    {
        timestamps: true
    }
);

const USERPAYMENT = mongoose.model("userpayments", userPaymentSchema);
export { USERPAYMENT };