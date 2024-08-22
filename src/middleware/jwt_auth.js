import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.SECRET;

// adding authorization middleware using JWT
export const jwtAuth = async (req, res, next)=>{
    const token = req.cookies.jwtToken;

    // if token not provided then return error
    if (!token) {
        return res.status(401).send({status: false, error: "JWT token must be provided"})
    }

    jwt.verify(token, JWT_SECRET, function (err, payload) {
        // if wrong token provided or any other error then return error
        if (err) {
            console.log(err);
            return res.status(401).send({status: false, error: "Unauthorized"})
        }
        // setting doctor Id to request headers for further usage
        req.doctorId = payload.doctorId;
    })

    // if no error then move on to next middleware
    next()
}