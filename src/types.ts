import type { Queue } from "bullmq";
import { Types } from "mongoose";
export interface ResponseObjectType {
    success: Boolean;
    message: String;
    payload?: any;
}

export interface RequestBodyType {
    key: String;
    value: any;
}

export interface LogSchema {
    timestamp: Date;
    metadata: {
        url: String;
        user : Types.ObjectId;
    };
    cacheHit: Boolean;
    roundTripTime: Number;
    responseStatusCode: Number;
    httpMethod: String;
}

export interface UserSchema {
    email: String;
    api_key: String;
    config: {
        ttl: Number;
        autoEviction: Boolean;
    };
}

export type QueueType = typeof Queue