import express from "express";
import { servererror } from "../helper/utils.js";
import bcrypt from "bcrypt";
import { generateAuthToken } from "../helper/auth.js";
import { isUserAuthenticated } from "../middlewares/auth.js";
import { addEventPlanningVendor, addMyFavouriteVendor, 
    createEventPlanning, 
    createUser, 
    createUserPreference, 
    createVendorPayment, 
    deleteEventPlanVendorRegData, 
    deleteUserPreference, 
    deleteVendorPayment, 
    getAddUpdatePaymentData, 
    getAddUpdatePlanData, 
    getAddUpdatePrefernceData, 
    getAddUpdateVendorPlanData, 
    getAddedFavouriteData, 
    getAllEventPlanning, 
    getAllEventPlanningVendor, 
    getAllUserPreferences, 
    getAllVendorPackageData, 
    getAllVendorPayTerms, 
    getAllVendorPayments, 
    getAllVendors,
    getMyFavouriteVendor, 
    getUserByEmail, 
    removeMyFavouriteVendor, 
    updateEventPlanning,
    updateEventPlanningVendor,
    updateUserPreference,
    updateVendorPayment} from "../controllers/user.js";


const router = express.Router();


// User Signup for event arrangement
router.post("/signup", async (req, res) => {
    try {
        const userData = await getUserByEmail(req);
        if(userData) {
            return res.status(400).json({error: "Already Registered! Use Login"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(req.body.password, salt);

        const newUser = await createUser(req, hashPass);
        const {userName, email, phone} = newUser;

        return res.status(201).json({message: "Successfully Registered", user: {userName, email, phone}});
    } catch (error) {
        return servererror(error, res);
    }
});

// User Login to the portal
router.post("/login", async (req, res) => {
    try {
        const userData = await getUserByEmail(req);
        if(!userData) {
            return res.status(400).json({error: "Invalid Credentials"});
        }

        const isValidPass = await bcrypt.compare(req.body.password, userData.password);

        if (!isValidPass) {
            return res.status(400).json({error: "Invalid Credentials"});
        }

        const token = generateAuthToken(userData._id);
        const { userName, email, isAdmin } = userData;
        
        return res.status(201).json({message: "Successfully LoggedIn", token, user:{userName, email, isAdmin}, vendor:{vendorName:false} });
    } catch (error) {
        return servererror(error, res);
    }
});

// Viewing Vendors List
router.get("/master/get/vendors", isUserAuthenticated, async (req, res) => {
    try {
        const vendorsList = await getAllVendors(req);
        if(vendorsList.length <=0 ) {
            return res.status(400).json({error: "No Vendors at present, Try after some duration"});
        }

        if(!vendorsList) {
            return res.status(400).json({error: "Error Occurred, Please Reload or try adding vendors"});
        }
        return res.status(200).json({message: "SuccessGettingVendorsList", data: vendorsList});
    } catch (error) {
        return servererror(error, res);
    }
});


// Adding Vendor to My Favourites
router.post("/add/favouritevendor", isUserAuthenticated, async (req, res) => {
    try {
        const addedFavouriteVendor = await addMyFavouriteVendor(req);
        if( !addedFavouriteVendor ) {
            return res.status(400).json({error: "Cannot Add to Favourites"});
        };

        const getAddedData = await getAddedFavouriteData(addedFavouriteVendor._id)
        return res.status(200).json({message: "Added to Favourites", data: getAddedData});

    } catch (error) {
        return servererror(error, res);
    }
});


// getting favourite vendors from added list by the loggedin user
router.get("/get/myfavouritevendors", isUserAuthenticated, async (req, res) => {
    try {
        const myFavouriteVendors = await getMyFavouriteVendor(req);
        if(myFavouriteVendors.length <=0 ) {
            return res.status(400).json({error: "No Vendors, Try Adding Vendors to your Favourites"});
        }

        if(!myFavouriteVendors) {
            return res.status(400).json({error: "Error Occurred, Please Reload or try adding vendors"});
        }
        return res.status(200).json({message: "SuccessGettingMyFavouries", data: myFavouriteVendors});
    } catch (error) {
        return servererror(error, res);
    }
});

// Delete favourite vendor from added list by the loggedin user
router.delete("/vendor/deletefavourite/:removeId", isUserAuthenticated, async (req, res) => {
    try {
        const removedData = await removeMyFavouriteVendor(req);
        if(!removedData) {
            return res.status(400).json({error: "Error Removing Occurred, Please Reload or try adding vendors"});
        }
        return res.status(200).json({message: "Removed Successfully", data: removedData});
    } catch (error) {
        return servererror(error, res);
    }
});


// Add Main event details
router.post("/add/eventplanning", isUserAuthenticated, async (req, res) => {
    try {
        const addedPlanningData = await createEventPlanning(req);
        if(!addedPlanningData) {
            return res.status(400).json({error: "Error Creation, RefreshPage and TryAgain / Raise query"});
        };

        const getAddedData = await getAddUpdatePlanData(addedPlanningData._id);
        return res.status(201).json({message: "Successfully Planned", data: getAddedData});
    } catch (error) {
        return servererror(error, res);
    }
});

// Get Main Event Plan Details
router.get("/get/eventplanning", isUserAuthenticated, async (req, res) => {
    try {
        const getAllPlanned = await getAllEventPlanning(req);
        if(getAllPlanned.length <=0 ) {
            return res.status(400).json({error: "No Data, Try Add Planning"});
        }
        if(!getAllPlanned) {
            return res.status(400).json({error: "Error Getting Data"});
        };
        return res.status(201).json({message: "SuccessGetting Planned", data: getAllPlanned});
    } catch (error) {
        return servererror(error, res);
    }
});

// Update Main Event details
router.put("/update/eventplanning/:mainEventId", isUserAuthenticated, async (req, res) => {
    try {
        const updatedDataResponse = await updateEventPlanning(req);
        if(!updatedDataResponse) {
            return res.status(400).json({error: "Error Updation, RefreshPage and TryAgain / Raise query"});
        };

        const getUpdatedData = await getAddUpdatePlanData(req.params.mainEventId);

        return res.status(201).json({message: "Updated Successfully", data: getUpdatedData});
    } catch (error) {
        return servererror(error, res);
    }
});


// Deleting Main EventPlan
router.delete("/delete/eventplanning/:deleteId", isUserAuthenticated, async (req, res) => {
    try {
        const deletedData = await deleteMainEventPlanData(req);
        if(!deletedData) {
            return res.status(400).json({error: "Error Deletion, RefreshPage and TryAgain / Raise query"});
        };
        return res.status(201).json({message: "Deleted MainEvent Successfully", data: deletedData});
    } catch (error) {
        return servererror(error, res);
    }
});


// Vendor Wise Event Planning
// Sub Grid for Event Vendor Assigning for different roles like Catering, travels, photography services
router.post("/add/eventplanningvendor", isUserAuthenticated, async (req, res) => {
    try {
        const addedDataResponse = await addEventPlanningVendor(req);
        if(!addedDataResponse) {
            return res.status(400).json({error: "Error Adding, RefreshPage and TryAgain / Raise query"});
        };

        const getAddedData = await getAddUpdateVendorPlanData(addedDataResponse._id);

        return res.status(201).json({message: "Added Successfully", data: getAddedData});
    } catch (error) {
        return servererror(error, res);
    }
});

// Getting Vendor Wise Event Plan Details
router.get("/get/eventplanningvendor", isUserAuthenticated, async (req, res) => {
    try {
        const getAllVendorWisePlanned = await getAllEventPlanningVendor(req);
        if(getAllVendorWisePlanned.length <=0 ) {
            return res.status(400).json({error: "No Data, Try Add VendorWisePlanning"});
        }
        if(!getAllVendorWisePlanned) {
            return res.status(400).json({error: "Error Getting Data"});
        };
        return res.status(201).json({message: "SuccessGetting VendorWisePlanned", data: getAllVendorWisePlanned})
    } catch (error) {
        return servererror(error, res);
    }
});

// Update eventplan vendor data
router.put("/update/eventplanningvendor/:updateId", isUserAuthenticated, async (req, res) => {
    try {
        const updatedDataResponse = await updateEventPlanningVendor(req);
        if(!updatedDataResponse) {
            return res.status(400).json({error: "Error Updation, RefreshPage and TryAgain / Raise query"});
        };

        const getUpdatedData = await getAddUpdateVendorPlanData(req.params.updateId);

        return res.status(201).json({message: "Updated Successfully", data: getUpdatedData});
    } catch (error) {
        return servererror(error, res);
    }
});

// Deleting EventPlan Vendor NotReg Data
router.delete("/delete/eventplanningvendor/:deleteId", isUserAuthenticated, async (req, res) => {
    try {
        const deletedData = await deleteEventPlanVendorRegData(req);
        if(!deletedData) {
            return res.status(400).json({error: "Error Deletion, RefreshPage and TryAgain / Raise query"});
        };
        return res.status(201).json({message: "Deleted Successfully", data: deletedData});
    } catch (error) {
        return servererror(error, res);
    }
});


// Adding New Payment Entry By User
router.post("/add/vendorpayment", isUserAuthenticated, async (req, res) => {
    try {
        const newVendorPayment = await createVendorPayment(req);
        if(!newVendorPayment) {
            return res.status(400).json({error: "Error Creation, RefreshPage and TryAgain / Raise query"});
        };

        const getAddedData = await getAddUpdatePaymentData(newVendorPayment._id);

        return res.status(201).json({message: "Added Successfully", data: getAddedData});
    } catch (error) {
        return servererror(error, res);
    }
});

// Updating Payment Entry By User
router.put("/update/vendorpayment/:updateId", isUserAuthenticated, async (req, res) => {
    try {
        const updatedResponse = await updateVendorPayment(req);
        if(!updatedResponse) {
            return res.status(400).json({error: "Error Updation, RefreshPage and TryAgain / Raise query"});
        };

        const getUpdatedData = await getAddUpdatePaymentData(req.params.updateId);
        return res.status(201).json({message: "Updated Successfully", data: getUpdatedData});
    } catch (error) {
        return servererror(error, res);
    }
});

// Getting All Vendor Payments for the User
router.get("/get/vendorpayment", isUserAuthenticated, async (req, res) => {
    try {
        const getAllVendorPaymentData = await getAllVendorPayments(req);
        if(getAllVendorPaymentData.length <=0 ) {
            return res.status(400).json({error: "No Data, Try Add Vendor Payments"});
        }
        if(!getAllVendorPaymentData) {
            return res.status(400).json({error: "Error Getting Data"});
        };
        return res.status(201).json({message: "SuccessGetting UserPayments", data: getAllVendorPaymentData});
    } catch (error) {
        return servererror(error, res);
    }
});

// Deleting Payment Entry By User
router.delete("/delete/vendorpayment/:deleteId", isUserAuthenticated, async (req, res) => {
    try {
        const deletedData = await deleteVendorPayment(req);
        if(!deletedData) {
            return res.status(400).json({error: "Error Deletion, RefreshPage and TryAgain / Raise query"});
        };
        return res.status(201).json({message: "Deleted Successfully", data: deletedData});
    } catch (error) {
        return servererror(error, res);
    }
});


// Getting All Vendors Package Details to Display in Details and Dashboard
router.get("/get/packagedetails", isUserAuthenticated, async (req, res) => {
    try {
        const getAllVendorPackageList = await getAllVendorPackageData(req);
        if(getAllVendorPackageList.length <= 0) {
            return res.status(400).json({error: "No Data to Display. Raise Query"});
        };
        if (!getAllVendorPackageList) {
            return res.status(400).json({error: "Error Getting Datas!. logout and login"});
        }
        return res.status(201).json({message: "SuccessGettingAllVendorPackageList", data: getAllVendorPackageList});
    } catch (error) {
        return servererror(error, res);
    }
});

// Getting All PaymentTerms of vendors
router.get("/get/paymentterms", isUserAuthenticated, async (req, res) => {
    try {
        const getAllVendorPayTermsDetails = await getAllVendorPayTerms(req);
        if (getAllVendorPayTermsDetails.length <=0 ) {
            return res.status(400).json({error: "No Data Found!, Try Adding PayTerms"})
        };

        if(!getAllVendorPayTermsDetails) {
            return res.status(400).json({error: "Error Getting List, Contact Admin"});
        };

        return res.status(201).json({message: "SuccessGettingVendorPaymentTerms", data: getAllVendorPayTermsDetails});
    } catch (error) {;
        return servererror(error, res);
    }
});


// Adding New Preference by User
router.post("/add/preference", isUserAuthenticated, async (req, res) => {
    try {
        const newUserPreference = await createUserPreference(req);
        if(!newUserPreference) {
            return res.status(400).json({error: "Error Creation, RefreshPage and TryAgain / Raise query"});
        };

        const addedData = await getAddUpdatePrefernceData(newUserPreference._id);

        return res.status(201).json({message: "Added Successfully", data: addedData});
    } catch (error) {
        return servererror(error, res);
    }
});

// Updating preference by User
router.put("/update/preference/:updateId", isUserAuthenticated, async (req, res) => {
    try {
        const updatedResponse = await updateUserPreference(req);
        if(!updatedResponse) {
            return res.status(400).json({error: "Error Updation, RefreshPage and TryAgain / Raise query"});
        };

        const updatedData = await getAddUpdatePrefernceData(req.params.updateId);
        return res.status(201).json({message: "Updated Successfully", data: updatedData});
    } catch (error) {
        return servererror(error, res);
    }
});

// Getting All preferences for the User
router.get("/get/preference", isUserAuthenticated, async (req, res) => {
    try {
        const getAllUserPreferenceData = await getAllUserPreferences(req);
        if(getAllUserPreferenceData.length <=0 ) {
            return res.status(400).json({error: "No Data, Try Add Your Preferences"});
        }
        if(!getAllUserPreferenceData) {
            return res.status(400).json({error: "Error Getting Data"});
        };
        return res.status(201).json({message: "SuccessGetting User Preferences", data: getAllUserPreferenceData});
    } catch (error) {
        return servererror(error, res);
    }
});

// Deleting preference by User
router.delete("/delete/preference/:deleteId", isUserAuthenticated, async (req, res) => {
    try {
        const deletedData = await deleteUserPreference(req);
        if(!deletedData) {
            return res.status(400).json({error: "Error Deletion, RefreshPage and TryAgain / Raise query"});
        };
        return res.status(201).json({message: "Deleted Successfully", data: deletedData});
    } catch (error) {
        return servererror(error, res);
    }
});

export const userRouter = router;