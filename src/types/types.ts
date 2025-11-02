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
    name?: string;
    company?: string;
    password_hash: string;
    api_key_hash?: string;
    api_key_encrypted_once?: string;
    api_key_retrieved?: boolean;
    config: {
        ttl: number;
        autoEviction: boolean;
    };
}

export type QueueType = typeof Queue