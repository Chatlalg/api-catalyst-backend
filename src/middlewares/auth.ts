import type { NextFunction, Response, Request } from "express"
import type { ResponseObjectType } from "../types/types.js";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";

const BCRYPT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || "12", 10);

const verifyUser = async (req: Request, res: Response<ResponseObjectType>, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        const email = (req.headers.email) as string | undefined;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized: Bearer token missing or invalid'
            });
        }
        if (!email) {
            return res.status(404).json({
                success: false,
                message: 'Missing email, provide email in headers'
            });
        }
        const token = authHeader.replace(/^Bearer\s+/, '');
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized user"
            });
        }
        if (!user.api_key_hash) {
            return res.status(401).json({
                success: false,
                message: "API key not configured for user"
            });
        }

        const isApiKeyValid = await bcrypt.compare(token, user.api_key_hash);
        if (!isApiKeyValid) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Invalid API key"
            });
        }

        req.user = user;
        return next();
    } catch (error) {
        console.log("Error in verifying user identity: ", error);
        res.status(500).json({
            success: false,
            message: "Error in verifying identity"
        })
    }
}

export default verifyUser