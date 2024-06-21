import { getUserById } from "../controllers/user.js";
import { getVendorById } from "../controllers/vendor.js";
import { verifyAuthToken } from "../helper/auth.js";
import { autherror, servererror } from "../helper/utils.js";

async function isUserAuthenticated(req, res, next) {
    if(req.headers["x-auth-token"]) {
        try {
            let rcvdtoken = await req.headers["x-auth-token"]
            let decodedToken;
            try {
                decodedToken = verifyAuthToken(rcvdtoken)
            } catch (error) {
                return autherror(res, "Invalid Token")
            }
            req.user = await getUserById(decodedToken.id);
            next();
        } catch (error) {
            return servererror(error, res)
        }
    } else {
        return autherror(res, "Invalid Authorization")
    }
};

async function isAdmin(req, res, next) {
    try {
        const adminuser = await getUserById(req.user._id)
        if(!adminuser.isAdmin) {
            return autherror(res, "Access Denied")
        }
        next();
    } catch (error) {
        return servererror(error, res)
    }
};

async function isVendorAuthenticated(req, res, next) {

    if(req.headers["x-auth-token"]) {
        try {
            const rcvdtoken = await req.headers["x-auth-token"]
            let decodedToken;
            try {
                decodedToken = verifyAuthToken(rcvdtoken)
            } catch (error) {
                autherror(res, "Invalid Token")
            }
    
            req.vendor = await getVendorById(decodedToken.id);
            next();
        } catch (error) {
            servererror(error, res)
        }
    } else {
        autherror(res, "Invalid Authorization")
    }
};

export { isUserAuthenticated, isAdmin, isVendorAuthenticated };