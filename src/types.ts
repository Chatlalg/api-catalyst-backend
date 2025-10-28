import type { Queue } from "bullmq";

export interface ResponseObjectType {
    success: Boolean;
    message: String;
    payload?: any;
}

export interface RequestBodyType {
    key: String;
    value: any;
}

export type QueueType = typeof Queue