import type { NextFunction, Response, Request } from "express"
import type { RequestBodyType, ResponseObjectType } from "../types/types.js";
import { User } from "../models/User.js";

const verifyUser = async (req: Request, res: Response<ResponseObjectType>, next: NextFunction) => {
    try {
        const key: String | String[] | undefined = req.headers?.key;
        const message: RequestBodyType = req.body;
        const email: String = message.email;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized user"
            });
        }
        if (user.api_key === key) {
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