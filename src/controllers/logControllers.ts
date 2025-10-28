import { Log } from "../models/Log.js";
import type { Request, Response } from "express"
import type { RequestBodyType, ResponseObjectType } from "../types/types.js";
import { addJobToQueue } from "../mQueues/queue.js";


const insertLog = async (req: Request, res: Response<ResponseObjectType>) => {
    try {
        const message: RequestBodyType = req.body;
        const job_name: String = req.user._id;
        const job = await addJobToQueue<RequestBodyType>(job_name, message)
        if (job) {
            res.status(200).json({
                success: true,
                message: `Successfully inserted log`,
            })
        } else {
            res.status(500).json({
                success: false,
                message: "Error inserting logs in queue"
            })
        }  
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export { insertLog }