import jwt from "jsonwebtoken"

// Generating Authentication Token to the logged user or vendor
function generateAuthToken(id) {
    return jwt.sign({id}, process.env.SECRET_KEY)
};

// Verifying Authentication Token to the logged user or vendor
function verifyAuthToken(token) {
    return jwt.verify(token, process.env.SECRET_KEY)
};

export { generateAuthToken, verifyAuthToken };