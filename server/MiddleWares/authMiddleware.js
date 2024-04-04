import Jwt from 'jsonwebtoken'
import User from '../Models/userModel.js'

const verifyToken = async (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        return res.status(400).json({
            success: false,
            message: 'Un Authorized'
        })
    }

    const decoded = Jwt.verify(token, process.env.JWT_SECRET_KEY)
    const user = await User.findById(decoded.id)

    if (!user) {
        res.status(400).json({
            success: false,
            message: 'User Not Found'
        })
    }

    req.user = user
    next();
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user) {
            next();
        } else {
            res.status(401);
            next(new Error("You're not authenticated"));
        }
    })
}