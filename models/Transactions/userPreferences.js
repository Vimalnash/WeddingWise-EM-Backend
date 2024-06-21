import mongoose from "mongoose";
import { ObjectId } from "bson";


const userPreferenceSchema = new mongoose.Schema(
    {
        userId: {type: ObjectId, ref:"users", required: true},
        eventPlanMainId: {type: ObjectId, ref:"usereventplanmains", required: true},
        preferenceDesc:  {type: String, required: true},
    },
    {
        timestamps: true
    }
);

const USEREVENTPREFERENCE= mongoose.model("usereventpreferences", userPreferenceSchema );
export { USEREVENTPREFERENCE };

// Shall Apply condition event service wise Preference if required