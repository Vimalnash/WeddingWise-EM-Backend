import mongoose from "mongoose"
import { ObjectId } from "bson";

const vendorPayTermsSchema = new mongoose.Schema(
    {
        vendorId: {type: ObjectId, ref:"vendors", required: true, unique: true},
        advBookingPayPercent: {type: Number, required: true},
        onEventDatePayPercent: {type: Number, required: true},
        postEventPayPercent: {type: Number, required: true},
        payTermsDescription: {type: String, required: true},
        cancelPolicyDescription: {type: String, required: true}
    },
    {
        timestamps: true
    }
);

const VENDORPAYTERMS = mongoose.model("vendorpayterms", vendorPayTermsSchema);
export { VENDORPAYTERMS };


