// Server Error response return
function servererror(error, res) {
    return res.status(500).json({error: "Internal Server Error", errorData: error})
};

// Authentication error response return
function autherror(res, message) {
    return res.status(500).json({error: message})
};

export { servererror, autherror }