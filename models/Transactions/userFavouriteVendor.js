import mongoose from "mongoose";
import { ObjectId } from "bson";

const userFavouriteVendorSchema = new mongoose.Schema(
    {
        userId: {type: ObjectId, ref:"users", required: true},
        vendorId: {type: ObjectId, ref:"vendors", required: true}
    }
);

const USERFAVOURITEVENDORS = mongoose.model("userfavouritevendors", userFavouriteVendorSchema);
export { USERFAVOURITEVENDORS };