import bcrypt from "bcrypt";
import express from "express";
import { servererror } from "../helper/utils.js";
import { generateAuthToken } from "../helper/auth.js";
import { createVendor, 
    createVendorPackage, 
    createVendorPayTerms, 
    updateVendorPayTerms,
    getVendorByEmail,
    updateVendorPackage,
    createVendorPackageExtras,
    getVendorPackagesExtras,
    updateVendorPackageExtras,
    getMyMaterData,
    getAllVendorPackages,
    getAddUpdateVendorPackage,
    getAddUpdateVendorPayTerms,
    getAllVendorPayTerms, 
} from "../controllers/vendor.js";
import { isVendorAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Vendor Signup for their Business needs
router.post("/signup", async (req, res) => {
    const approveddate = new Date().toJSON().slice(0, 10);
    try {        
        const vendorData = await getVendorByEmail(req);
        if(vendorData) {
            return res.status(400).json({error: "Already Registered! Use VendorLogin"});
        }
    
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(req.body.password, salt);
        
        const newVendor = await createVendor(req, hashPass, approveddate);
        
        return res.status(201).json({message: "Registerd Successfully! Wait For Admin Approval", vendor: newVendor});
    } catch (error) {
        return servererror(error, res);
    }
});

// Vendor Login to update their datas
router.post("/login", async (req, res) => {
    try {
        const vendorData = await getVendorByEmail(req);
        if(!vendorData) {
            return res.status(400).json({error: "Invalid Credential"});
        };

        const isValidPass = await bcrypt.compare(req.body.password, vendorData.password);

        if (!isValidPass) {
            return res.status(400).json({error: "Invalid Credential"});
        };

        const token = generateAuthToken(vendorData._id);
        const {vendorName, userName, email} = vendorData;

        return res.status(201).json({message: "LoggedIn Successfully", token, vendor: {vendorName, userName, email} });
    } catch (error) {
        return servererror(error, res);
    }
});

// get logged in Vendor data
router.get("/get/mymasterdata", isVendorAuthenticated, async (req, res) => {
    try {
        const myMasterData = await getMyMaterData(req);

        if(!myMasterData) {
            return res.status(400).json({error: "Error Fetching, Try Refreshing HomePage"});
        }
        return res.status(201).json({message: "Success Getting Pers.Data", data: myMasterData});
    } catch (error) {
        return servererror(error, res);
    }
});

// Vendor Adding their Service package details
router.post("/add/packagedetails", isVendorAuthenticated, async (req, res) => {
    try {
        const newPackage = await createVendorPackage(req);
        if(!newPackage) {
            return res.status(400).json({error: "Error Creation, Refresh Page and TryAgain/Contact Admin"});
        }
        
        const addedData = await getAddUpdateVendorPackage(newPackage._id);
        return res.status(201).json({message: "Added Successfully", data: addedData});
    } catch (error) {;
        return servererror(error, res);
    }
});

// Vendor Updating their Service package details
router.put("/update/packagedetails/:updateId", isVendorAuthenticated, async (req, res) => {
    try {
        const updatedPackageResponse = await updateVendorPackage(req);
        if(!updatedPackageResponse) {
            return res.status(400).json({error: "Error Updation, Refresh Page and TryAgain/Contact Admin"});
        }

        const updatedData = await getAddUpdateVendorPackage(req.params.updateId);

        return res.status(201).json({message: "Updated Successfully", data: updatedData});
    } catch (error) {;
        return servererror(error, res);
    }
});

// Getting Package Details
router.get("/get/packagedetails", isVendorAuthenticated, async (req, res) => {
    try {
        const getAllVendorPackageDetails = await getAllVendorPackages(req);
        if(!getAllVendorPackageDetails) {
            return res.status(400).json({error: "Error Getting List, Contact Admin"});
        }
        return res.status(201).json({message: "SuccessGettingServicePackageData", data: getAllVendorPackageDetails});
    } catch (error) {;
        return servererror(error, res);
    }
});




// TODO Extras
//adding new Additional Service package details
router.post("/add/packageextradetails", isVendorAuthenticated, async (req, res) => {
    try {
        const newPackageExtras = await createVendorPackageExtras(req);
        if(!newPackageExtras) {
            return res.status(400).json({error: "Error Creation, Refresh Page and TryAgain/Contact Admin"});
        }
        return res.status(201).json({message: "Added Successfully", data: newPackageExtras});
    } catch (error) {;
        return servererror(error, res);
    }
});

// TODO Extras
//Update Additional Service package details
router.put("/update/packageextradetails/:updateId", isVendorAuthenticated, async (req, res) => {
    try {
        const updatedPackageExtrasResponse = await updateVendorPackageExtras(req);
        if(!updatedPackageExtrasResponse) {
            return res.status(400).json({error: "Error Updation, Refresh Page and TryAgain/Contact Admin"});
        }
        return res.status(201).json({message: "Updated Successfully", data: updatedPackageExtrasResponse})
    } catch (error) {;
        return servererror(error, res)
    }
});

// TODO Extras
// Getting Additional Service package details
router.get("/get/packageextradetails", isVendorAuthenticated, async (req, res) => {
    try {
        const getVendorPackageDetails = await getVendorPackagesExtras();
        if(!getVendorPackageDetails) {
            return res.status(400).json({error: "Error Loading Data, Refresh Page and TryAgain"});
        }
        return res.status(201).json({message: "SuccessGettingData", data: getVendorPackageDetails});
    } catch (error) {;
        return servererror(error, res);
    }
});



// Add new Payment Terms
router.post("/add/paymentterms", isVendorAuthenticated, async (req, res) => {
    try {
        const newPayTerms = await createVendorPayTerms(req);
        if(!newPayTerms) {
            return res.status(400).json({error: "Error Creation, Contact Admin"});
        }
        const addedData = await getAddUpdateVendorPayTerms(newPayTerms._id);

        return res.status(201).json({message: "Added Successfully", data: addedData});
    } catch (error) {;
        return servererror(error, res);
    }
});

// Updating Payment terms
router.put("/update/paymentterms/:updateId", isVendorAuthenticated, async (req, res) => {
    try {
        const updatedDataResponse = await updateVendorPayTerms(req);
        if(!updatedDataResponse) {
            return res.status(400).json({error: "Error Updation, Refresh/Try or Contact Admin"});
        }
        const updatedData = await getAddUpdateVendorPayTerms(req.params.updateId);

        return res.status(201).json({message: "Updated Successfully", data: updatedData});
    } catch (error) {;
        return servererror(error, res);
    }
});

// Getting Payment Terms Details
router.get("/get/paymentterms", isVendorAuthenticated, async (req, res) => {
    try {
        const getAllVendorPayTermsDetails = await getAllVendorPayTerms(req);
        if (getAllVendorPayTermsDetails.length <=0 ) {
            return res.status(400).json({error: "No Data Found!, Try Adding PayTerms"});
        };

        if(!getAllVendorPayTermsDetails) {
            return res.status(400).json({error: "Error Getting List, Contact Admin"});
        };
        return res.status(201).json({message: "SuccessGettingVendorPaymentTerms", data: getAllVendorPayTermsDetails});
    } catch (error) {;
        return servererror(error, res);
    }
});


export const vendorRouter = router;

