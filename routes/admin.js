import express from "express";
import { servererror } from "../helper/utils.js";
// import { getUserByEmail } from "../controllers/user.js";
import { isAdmin, isUserAuthenticated } from "../middlewares/auth.js";
import { 
    createCity, 
    createEventCategory, 
    createEventService, 
    createEventSubService, 
    getAllCities, 
    getAllCountries, 
    getAllEventCategory, 
    getAllEventService, 
    getAllEventSubService,
    getAllStates,
    getEventServiceData
} from "../controllers/master.js";

const router = express.Router();

// Event Category Master Creation
router.post("/master/add/eventcategory", isUserAuthenticated, isAdmin, async (req, res) => {
    try {
        const newEventCategory = await createEventCategory(req);
        if(!newEventCategory) {
            return res.status(400).json({error: "Error Creation"});
        }
        return res.status(201).json({message:"CreatedSuccessfully", data: newEventCategory})
    } catch (error) {
        return servererror(error, res);
    }
})


// Event Service Master Creation
router.post("/master/add/eventservice", isUserAuthenticated, isAdmin, async (req, res) => {
    try {
        const newEventService = await createEventService(req);
        if(!newEventService) {
            return res.status(400).json({error: "Error Creation"});
        }
        return res.status(201).json({message:"CreatedSuccessfully", data: newEventService})
    } catch (error) {
        return servererror(error, res);
    }
});

// todo FRONTEND - Extra Triedto implement
//  Event SubService Master Creation , Extra Services If applicable by vendors
// Backend is OK,
router.post("/master/add/eventsubservice", isUserAuthenticated, isAdmin, async (req, res) => {
    try {
        const newEventSubService = await createEventSubService(req);
        if(!newEventSubService) {
            return res.status(400).json({error: "Error Creation"});
        }
        const addedData = await getEventServiceData(newEventSubService._id)
        return res.status(201).json({message:"CreatedSuccessfully", data: addedData})
    } catch (error) {
        return servererror(error, res);
    }
});

// City Master Bulk Creation  =>  (Only First time Database Creation)
router.post("/master/cities", isUserAuthenticated, isAdmin, async (req, res) => {
    try {
        const states = await getAllStates();
        let citiesList = [];
        if(states.length > 0 ) {
            for(let i=0; i<states.length; i++) {
                const newCity = await createCity(states[i]);
                // console.log("city",newCity)
                citiesList.push(newCity)
            }
        }
        return res.status(201).json({message:"Success", data: citiesList})
    } catch (error) {
        return servererror(error, res)
    }
})

// Get Event Category Master List
router.get("/master/get/eventcategory", async (req, res) => {
    try {
        const getEventCategories = await getAllEventCategory(req);
        if(getEventCategories <=0 ) {
            return res.status(400).json({error: "No Data, Try Adding New Data"})
        }
        if(!getEventCategories) {
            return res.status(400).json({error: "Error getting list"});
        }
        return res.status(201).json({message:"SuccessGettingEventCategoires", data: getEventCategories})
    } catch (error) {
        return servererror(error, res);
    }
});

// Get Event Services Master List
router.get("/master/get/eventservice", async (req, res) => {
    try {
        const getEventServices = await getAllEventService(req);
        if(getEventServices <=0 ) {
            return res.status(400).json({error: "No EventServices Data, Try Adding New Data"})
        }
        if(!getEventServices) {
            return res.status(400).json({error: "Error getting list"});
        }
        return res.status(201).json({message:"SuccessGettingEventServices", data: getEventServices})
    } catch (error) {
        return servererror(error, res);
    }
});

// Get Event SubServices Master List
router.get("/master/get/eventsubservice", async (req, res) => {
    try {
        const getEventServices = await getAllEventSubService(req);
        if(getEventServices <=0 ) {
            return res.status(400).json({error: "No EventSubServices Data, Try Adding New Data"})
        }
        if(!getEventServices) {
            return res.status(400).json({error: "Error getting list"});
        }
        return res.status(201).json({message:"SuccessGettingEventSubServices", data: getEventServices})
    } catch (error) {
        return servererror(error, res);
    }
});


// Get Countries Master List
router.get("/master/get/countries", async (req, res) => {
    try {
        const countriesList = await getAllCountries();
        if(!countriesList) {
            return res.status(400).json({error: "Error getting list"});
        }
        return res.status(201).json({message:"SuccessGettingcountries", data: countriesList})
    } catch (error) {
        return servererror(error, res);
    }
});


// Get States Master List
router.get("/master/get/states", async (req, res) => {
    try {
        const statesList = await getAllStates();
        if(!statesList) {
            return res.status(400).json({error: "Error getting list"});
        }
        return res.status(201).json({message:"SuccessGettingStates", data: statesList})
    } catch (error) {
        return servererror(error, res);
    }
});

// Get Cities Master List
router.get("/master/get/cities", async (req, res) => {
    try {
        const citiesList = await getAllCities();
        if(!citiesList) {
            return res.status(400).json({error: "Error getting list"});
        }
        return res.status(201).json({message:"SuccessGettingCities", data: citiesList})
    } catch (error) {
        return servererror(error, res);
    }
});

export const adminRouter = router;