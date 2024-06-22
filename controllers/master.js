import { CITY } from "../models/Master/city.js";
import { COUNTRY } from "../models/Master/country.js";
import { EVENTCATEGORY } from "../models/Master/eventcategory.js";
import { EVENTSERVICE } from "../models/Master/eventservice.js";
import { EVENTSUBSERVICE } from "../models/Master/eventsubservice.js";
import { STATE } from "../models/Master/state.js";

// Event Category Master Creation (Wedding, Reception)
function createEventCategory(req) {
    return new EVENTCATEGORY({
        ...req.body
    }).save()
};

// Add New MainServiceName (Photography, Catering, etc)
function createEventService(req) {
    return new EVENTSERVICE({
        ...req.body
    }).save()
};

// Add New SubService
function createEventSubService(req) {
    return new EVENTSUBSERVICE({
        ...req.body
    }).save()
};

// Add New State
function createState(req) {
    return new STATE({
        ...req.body
    }).save()
};

// Get Created State
function getCreatedState(id) {
    return STATE.findById(id)
    .populate({ 
        path: "countryId"
    })
};

// Get New Added SubService populated Data
function getEventServiceData(id) {
    return EVENTSUBSERVICE.findOne({_id: id}).populate({
        path: "eventServiceId"
    })
};

// Get All Countries List
function getAllCountries() {
    return COUNTRY.find()
};

// Get All States List
function getAllStates() {
    return STATE.find()
    .populate({ 
        path: "countryId"
    })
};

// Get All Cities List
function getAllCities() {
    return CITY.find()
};

// Only 1st Time DB Creation for All Option
function createCity(statedata) {
    console.log(statedata)
    return new CITY({
        cityName: "All",
        stateId: statedata.stateId._id
    }).save()
};

// Getting All EventCategory List
function getAllEventCategory() {
    return EVENTCATEGORY.find()
};

// Getting All Event Services list
function getAllEventService() {
    return EVENTSERVICE.find()
};

// Getting All Event Sub Services List
function getAllEventSubService() {
    return EVENTSUBSERVICE.find().populate({
        path: "eventServiceId"
    })
};

export {
    createEventCategory,
    createEventService,
    createEventSubService,
    createState,
    getCreatedState,
    getEventServiceData,
    getAllEventCategory,
    getAllEventService,
    getAllEventSubService,
    getAllCountries,
    getAllStates,
    getAllCities,
    createCity
};