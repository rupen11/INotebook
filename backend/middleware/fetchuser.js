const jwt = require('jsonwebtoken');

const JWT_SECRETKEY = "Rjisagoodboyandthisisjwt$";

const fetchuser = (req, res, next) => {
    try {
        // Get user from jwt token and add id to req object
        const token = req.header("auth-token");
        if (!token) {
            return res.status(401).json({ error: "Please authenticate using valid user" });
        }
        const data = jwt.verify(token, JWT_SECRETKEY);
        req.user = data.user.id;
        next();
    }
    catch (err) {
        console.log("Some error occured to fetch user " + err);
        return res.status(401).json({ error: "Some error occured to fetch user" });
    }
}

module.exports = fetchuser;