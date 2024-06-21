import { VENDOR } from "../models/Master/vendor.js";
import { VENDORPACKAGE } from "../models/Master/vendorpackage.js";
import { VENDORPACKAGEEXTRAS } from "../models/Master/vendorpackageextras.js";
import { VENDORPAYTERMS } from "../models/Master/vendorpaymentterms.js";

// Getting Vendor details by email for signup
function getVendorByEmail(req) {
    return VENDOR.findOne({email: req.body.email});
};

// Getting Vendor details by email for login authentication
function getVendorById(id) {
    return VENDOR.findById(id)
};

function createVendor(req, hashPass, approveddate) {
    return new VENDOR({
        ...req.body,
        password: hashPass,
        approvedDate: approveddate
    }).save()
};

// getting loggedIn Vendor Master data
function getMyMaterData(req) {
    return VENDOR.findOne({_id: req.vendor._id}).select("-password")
};

// Creating New vendor Package
function createVendorPackage(req) {
    return new VENDORPACKAGE({
        vendorId: req.vendor._id,
        ...req.body
    }).save()
};

// Updating vendor package details
function updateVendorPackage(req) {
    return VENDORPACKAGE.updateOne(
        {_id: req.params.updateId},
        {$set: {...req.body}}
    )
};

// Getting Add or updated package details populated
function getAddUpdateVendorPackage(id) {
    return VENDORPACKAGE.findOne({_id: id})
    .populate({
        path: "vendorId", 
        select: "-password"
    })
    .populate({path: "eventServiceId"})
    .populate({path: "serviceApplyStateIds"})
};

// Getting  Basic vendor Service details
function getAllVendorPackages(req) {
    return VENDORPACKAGE.find({vendorId: req.vendor._id})
    .populate({
        path: "vendorId", 
        select: "-password"
    })
    .populate({path: "eventServiceId"})
    .populate({path: "serviceApplyStateIds"})
};

// Adding Package Extras added by vendor - Extras not implemented
function createVendorPackageExtras(req) {
    return new VENDORPACKAGEEXTRAS({
        vendorId: req.vendor._id,
        ...req.body
    }).save()
};

// Updating Package Extras added by vendor - Extras not implemented
function updateVendorPackageExtras(req) {
    return VENDORPACKAGEEXTRAS.updateOne(
        {_id: req.params.updateId},
        {$set: {...req.body}}
    )
};

// Getting Package Extras added by vendor - Extras not implemented
function getVendorPackagesExtras(req) {
    return VENDORPACKAGEEXTRAS.find({vendorId: req.vendor._id})
    .populate(["vendorId", "eventServiceId", "eventSubServiceId"])
};

// Create New Payterms by vendor
function createVendorPayTerms(req) {
    return new VENDORPAYTERMS({
        vendorId: req.vendor._id,
        ...req.body
    }).save()
};

// update Payment terms by vendor
function updateVendorPayTerms(req) {
    return VENDORPAYTERMS.updateOne(
        {_id: req.params.updateId},
        {$set: {...req.body}}
    )
};

// Getting Payment Term added or updated in populated
function getAddUpdateVendorPayTerms(id) {
    return VENDORPAYTERMS.findOne({_id: id})
    .populate({
        path: "vendorId", 
        select: "-password"
    })
};

// Getting Payment Terms defined by vendor
function getAllVendorPayTerms(req) {
    return VENDORPAYTERMS.find({vendorId: req.vendor._id})
    .populate({
        path: "vendorId", 
        select: "-password"
    })
};

export { 
    createVendor, 
    getVendorByEmail, 
    getVendorById, 
    getMyMaterData,
    createVendorPackage,
    updateVendorPackage,
    getAddUpdateVendorPackage,
    getAllVendorPackages,
    createVendorPackageExtras,
    updateVendorPackageExtras,
    getVendorPackagesExtras,
    createVendorPayTerms, 
    updateVendorPayTerms,
    getAddUpdateVendorPayTerms,
    getAllVendorPayTerms,
};