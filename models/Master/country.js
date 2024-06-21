import mongoose from "mongoose";

const countrySchema = new mongoose.Schema(
    {
        countryName: {type: String, required: true, trim: true}
    },
    {
        timestamps: true
    }
)

const COUNTRY = mongoose.model("countries", countrySchema);
export { COUNTRY }