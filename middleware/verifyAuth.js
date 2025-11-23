import jwt from "jsonwebtoken";

function verifyAuth(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        req.user = jwt.verify(token, process.env.JWT_SECRET);

        next();
    }catch (error) {
        res.status(401).json("You are not logged in properly.");
    }
}

export default verifyAuth;