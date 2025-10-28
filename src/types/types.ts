import type { Queue } from "bullmq";
export interface ResponseObjectType {
    success: Boolean;
    message: String;
    payload?: any;
}

export interface RequestBodyType {
    email: String;
    timestamp: String;
    cacheHit: Boolean;
    roundTripTime: Number;
    responseStatusCode: Number;
    httpMethod: String;
    url: String;
}

export interface LogSchema {
    timestamp: Date;
    metadata: {
        url: String;
        user : String;
    };
    cacheHit: Boolean;
    roundTripTime: Number;
    responseStatusCode: Number;
    httpMethod: String;
}

export interface UserSchema {
    _id: String;
    email: String;
    api_key: String;
    config: {
        ttl: Number;
        autoEviction: Boolean;
    };
}

export type QueueType = typeof Queue