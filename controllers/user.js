import { USER } from "../models/Master/user.js";
import { USERFAVOURITEVENDORS } from "../models/Transactions/userFavouriteVendor.js";
import { USEREVENTPLANMAIN } from "../models/Transactions/userEventPlanMain.js";
import { USERPAYMENT } from "../models/Transactions/userPayment.js";
import { VENDOR } from "../models/Master/vendor.js";
import { USEREVENTPLANVENDORREG } from "../models/Transactions/userEventPlanVendorReg.js";
import { VENDORPACKAGE } from "../models/Master/vendorpackage.js";
import { USEREVENTPREFERENCE } from "../models/Transactions/userPreferences.js";
import { VENDORPAYTERMS } from "../models/Master/vendorpaymentterms.js";


// Get User Details by EmailId
function getUserByEmail(req) {
    return USER.findOne({email: req.body.email})
};

// Create New User for Register in Portal
function createUser(req, hashPass) {
    return new USER(
        {
            ...req.body,
            password: hashPass
        }
    ).save()
};

// Getting User by Id
function getUserById(id) {
    return USER.findById(id)
};

// Getting vendors List by User to view and addFavourites
function getAllVendors() {
    return VENDOR.find().populate(["stateId", "cityId", "eventServiceId"]).select("-password -userName -approvedDate -createdAt -updatedAt")
};


// Adding to User Favourites
function addMyFavouriteVendor(req) {
    return new USERFAVOURITEVENDORS({
        userId: req.user._id,
        vendorId: req.body.vendorId
    }).save()
};

// Getting User Favourite data newly addedorupdated
function getAddedFavouriteData(id) {
    return USERFAVOURITEVENDORS.findOne({_id: id})
    .populate({path: "userId", select : "-password -createdAt -updatedAt -phone"})
    .populate({ 
        path: "vendorId", 
        select: "-password -userName -approvedDate -createdAt -updatedAt",
        populate: {
            path: "stateId cityId eventServiceId"
        }
    })
};

// Get User Favourites List
function getMyFavouriteVendor(req) {
    return USERFAVOURITEVENDORS.find({userId: req.user._id})
    .populate({path: "userId", select : "-password -createdAt -updatedAt -phone"})
    .populate({ 
        path: "vendorId", 
        select: "-password -userName -approvedDate -createdAt -updatedAt",
        populate: {
            path: "stateId cityId eventServiceId"
        }
    })
};

// Remove Favourite by User
function removeMyFavouriteVendor(req) {
    return USERFAVOURITEVENDORS.findByIdAndDelete({_id: req.params.removeId})
};

// Event Plannings Main
// Main Grid Add
function createEventPlanning(req) {
    return new USEREVENTPLANMAIN({
        userId: req.user._id,
        ...req.body
    }).save()
};

// getting Added or Updated Plan Populated Data 
function getAddUpdatePlanData(id) {
    return USEREVENTPLANMAIN.findOne({_id: id})
    .populate({path: "userId", select : "-password -createdAt -updatedAt -phone"})
    .populate({path: "eventCategoryId stateId cityId"})
};

// Getting All Event Planning List for the user
function getAllEventPlanning(req) {
    return USEREVENTPLANMAIN.find({userId: req.user._id})
    .populate({path: "userId", select : "-password -createdAt -updatedAt -phone"})
    .populate({path: "eventCategoryId stateId cityId"})
};

// Update Main Event Planning
function updateEventPlanning(req) {
    return USEREVENTPLANMAIN.updateOne(
        {_id: req.params.mainEventId},
        {$set: {...req.body}}
    )
};

// Delete Main Event Plan
function deleteMainEventPlanData(req) {
    return USEREVENTPLANMAIN.findByIdAndDelete(req.params.deleteId)
};

// Add Event Plan VendorWise
function addEventPlanningVendor(req) {
    return new USEREVENTPLANVENDORREG({
        userId: req.user._id,
        ...req.body
    }).save();
};

// Getting Added Event Plan details objectIds populated
function getAddUpdateVendorPlanData(id) {
    return USEREVENTPLANVENDORREG.findOne({_id: id})
    .populate({path: "eventPlanMainId"})
    .populate({path: "eventServiceId"})
    .populate({ 
        path: "vendorId", 
        select: "-password -userName -approvedDate -createdAt -updatedAt",
        populate: {
            path: "stateId cityId eventServiceId"
        }
    })
};

// Vendorwise Registration Form update
function updateEventPlanningVendor(req) {
    return USEREVENTPLANVENDORREG.updateOne(
        {_id: req.params.updateId},
        {$set: {...req.body}}
    )
};

// Getting All Event Plan details for the loggedin User -  objectIds populated
function getAllEventPlanningVendor(req){
    return USEREVENTPLANVENDORREG.find({userId: req.user._id})
    .populate({path: "eventPlanMainId"})
    .populate({path: "eventServiceId"})
    .populate({ 
        path: "vendorId", 
        select: "-password -userName -approvedDate -createdAt -updatedAt",
        populate: {
            path: "stateId cityId eventServiceId"
        }
    })
};

// Delete Event Vendor Plan RegData
function deleteEventPlanVendorRegData(req) {
    return USEREVENTPLANVENDORREG.deleteOne({_id: req.params.deleteId, registered: false})
};

// Adding New Payment Entry by User
function createVendorPayment(req) {
    return new USERPAYMENT({
        userId: req.user._id,
        ...req.body
    }).save()
};

// Update Payment Entry by User
function updateVendorPayment(req) {
    return USERPAYMENT.updateOne(
        {_id: req.params.updateId},
        {$set: {...req.body}}
    )
};

// Delete Payment Entry by User
function deleteVendorPayment(req) {
    return USERPAYMENT.findByIdAndDelete(req.params.deleteId)
};

// Getting Added/Updated Event Payment details objectIds populated
function getAddUpdatePaymentData(id) {
    return USERPAYMENT.findOne({_id: id})
    .populate({path: "eventPlanMainId"})
    .populate({path: "eventPlanVendorRegId"})
    .populate({ 
        path: "vendorId", 
        select: "-password -userName -approvedDate -createdAt -updatedAt",
        populate: {
            path: "stateId cityId eventServiceId"
        }
    })
};

function getAllVendorPayments(req){
    return USERPAYMENT.find({userId: req.user._id})
    .populate({path: "eventPlanMainId"})
    .populate({path: "eventPlanVendorRegId"})
    .populate({ 
        path: "vendorId", 
        select: "-password -userName -approvedDate -createdAt -updatedAt",
        populate: {
            path: "stateId cityId eventServiceId"
        }
    })
};

function getAllVendorPackageData(req) {
    return VENDORPACKAGE.find()
    .populate({
        path: "vendorId",
        select: "-password -userName -approvedDate -createdAt -updatedAt",
        populate: {
            path: "stateId cityId eventServiceId"
        }
    })
    .populate({path: "eventServiceId"})
    .populate({path: "serviceApplyStateIds"})

};


// Getting All vendors Pay Terms to show in detail view
function getAllVendorPayTerms(req) {
    return VENDORPAYTERMS.find()
    .populate({
        path: "vendorId", 
        select: "-password"
    })
};

// Adding New Preference by User
function createUserPreference(req) {
    return new USEREVENTPREFERENCE({
        userId: req.user._id,
        ...req.body
    }).save()
};

// Updating Preference by User
function updateUserPreference(req) {
    return USEREVENTPREFERENCE.updateOne(
        {_id: req.params.updateId},
        {$set: {...req.body}}
    )
};

// Deleting Preference by User
function deleteUserPreference(req) {
    return USEREVENTPREFERENCE.findByIdAndDelete(req.params.deleteId)
};

// Getting Added/Updated Preference details
function getAddUpdatePrefernceData(id) {
    return USEREVENTPREFERENCE.findOne({_id: id})
    .populate({path: "eventPlanMainId"})
};

// Getting All Preferences for the user
function getAllUserPreferences(req){
    return USEREVENTPREFERENCE.find({userId: req.user._id})
    .populate({path: "eventPlanMainId"})
};


export { 
    getUserByEmail, 
    createUser, 
    addMyFavouriteVendor, 
    getAddedFavouriteData,
    getMyFavouriteVendor, 
    removeMyFavouriteVendor,
    getUserById,
    createEventPlanning,
    updateEventPlanning,
    getAllEventPlanning,
    getAddUpdatePlanData,
    deleteMainEventPlanData,
    addEventPlanningVendor,
    getAddUpdateVendorPlanData,
    updateEventPlanningVendor,
    getAllEventPlanningVendor,
    deleteEventPlanVendorRegData,
    createVendorPayment,
    updateVendorPayment,
    deleteVendorPayment,
    getAddUpdatePaymentData,
    getAllVendorPayments,
    getAllVendors,
    getAllVendorPackageData,
    getAllVendorPayTerms,
    createUserPreference,
    updateUserPreference,
    deleteUserPreference,
    getAddUpdatePrefernceData,
    getAllUserPreferences
};