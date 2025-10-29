import type { NextFunction, Response, Request } from "express"
import type { RequestBodyType, ResponseObjectType } from "../types/types.js";
import { User } from "../models/User.js";

const verifyUser = async (req: Request, res: Response<ResponseObjectType>, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized: Bearer token missing or invalid'
            });
        }
        const token = authHeader.replace(/^Bearer\s+/, '')
        const user = await User.findOne({ api_key: token });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized user"
            });
        }
        if (user.api_key === token) {
            req.user = user;
            return next();
        }
        return res.status(401).json({
            success: false,
            message: "Invalid api key"
        })
    } catch (error) {
        console.log("Error in verifying user identity: ", error);
        res.status(500).json({
            success: false,
            message: "Error in verifying identity"
        })
    }
}

export default verifyUser