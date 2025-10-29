import type { Queue } from "bullmq";
export interface ResponseObjectType {
    success: boolean;
    message: string;
    payload?: any;
}

export interface RequestBodyType {
    timestamp: string;
    cacheHit: boolean;
    roundTripTime: number;
    responseStatusCode: number;
    httpMethod: string;
    url: string;
}

export interface LogSchema {
    timestamp: Date;
    metadata: {
        url: string;
        user : string;
    };
    cacheHit: boolean;
    roundTripTime: number;
    responseStatusCode: number;
    httpMethod: string;
}

export interface UserSchema {
    _id: string;
    email: string;
    api_key: string;
    config: {
        ttl: number;
        autoEviction: boolean;
    };
}

export type QueueType = typeof Queue