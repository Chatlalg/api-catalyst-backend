import { Log } from "../models/Log.js";
import type { Request, Response } from "express"
import type { RequestBodyType, ResponseObjectType } from "../types.js";
import { addJobToQueue } from "../mQueues/queue.js";


const getUserLogs = async (req: Request, res: Response<ResponseObjectType>) => {
    const email = "user@gmail.com"
    try {
        const response = await Log.find({ "metadata.user": email });
        res.status(200).json({
            success: true,
            message: `Successfully fetched logs of user: ${email}`,
            payload: response
        })
    } catch (error) {
        console.error(`Error fetching logs of user: ${email}`);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

const insertLog = async (req: Request, res: Response<ResponseObjectType>) => {
    try {
        const message: RequestBodyType = req.body;
        const job = await addJobToQueue(message)
        res.status(200).json({
            success: true,
            message: `Successfully inserted log with job id: ${job.id}`,
        })
    } catch (error) {
        console.error(`Error inserting log of user`);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export { getUserLogs, insertLog }