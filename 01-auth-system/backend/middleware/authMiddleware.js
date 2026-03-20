import User from "../models/User.js";
import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ success: false, message: 'user not authorized' });
        }

        const decode =  jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decode.id).select('-password');
        if (!user) {
            return res.status(401).json({ success: false, message: 'user not found' });
        }
        req.user = user;

        next()


    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
}

export default auth;