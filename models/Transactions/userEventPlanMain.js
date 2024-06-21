import mongoose from "mongoose";
import { ObjectId } from "bson";


const userEventPlanMainSchema = new mongoose.Schema(
    {
        userId: {type: ObjectId, ref:"users", required: true},
        eventCategoryId: {type: ObjectId, ref:"eventcategories", required: true},
        stateId: {type: ObjectId, ref:"states", required: true},
        cityId: {type: ObjectId, ref:"cities", required: true},
        date: {type: String, required: true},
        startTime: {type: String, required: true},
        endTime: {type: String, required: true},
        expectedMemberCount: {type: Number, required: true},
        budgetAmount: {type: Number, required: true},
    },
    {
        timestamps: true
    }
);

const USEREVENTPLANMAIN= mongoose.model("usereventplanmains", userEventPlanMainSchema );
export { USEREVENTPLANMAIN };

