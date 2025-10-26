import { Log } from "../models/Log.js";
import type { Request, Response } from "express"
import type { ResponseObject } from "../types.js";

const getUserLogs = async (req: Request, res: Response<ResponseObject>) => {
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

const insertLog = async (req: Request, res: Response<ResponseObject>) => {
    const dummyData = {
        timestamp: new Date(),
        metadata: {
            url: "/api/weather",
            user: "user@gmail.com"
        },
        cacheHit: true,
        roundTripTime: 360,
        responseStatusCode: 200,
        httpMethod: "GET"
    }
    try {
        const response = await Log.insertOne(dummyData);
        res.status(200).json({
            success: true,
            message: `Successfully inserted log of user: ${dummyData.metadata.user}`,
        })
        console.log(response)
    } catch (error) {
        console.error(`Error inserting log of user: ${dummyData.metadata.user}`);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export { getUserLogs, insertLog }