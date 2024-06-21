import mongoose from "mongoose";

const eventCategorySchema = new mongoose.Schema(
    {
        categoryName: {type: String, required: true,  unique: true}
    },
    {
        timestamps: true
    }
);

const EVENTCATEGORY = mongoose.model("eventcategories", eventCategorySchema);
export { EVENTCATEGORY }