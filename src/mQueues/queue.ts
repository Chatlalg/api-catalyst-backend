import { Job, Queue } from 'bullmq';
import { setupWorker } from './worker.js';
import { ADDRGETNETWORKPARAMS } from 'dns';

const PORT = process.env.REDIS_SOCKET_PORT || '6379';

export const logsMQ = new Queue('logsMQ', {
    connection: {
        host: process.env.REDIS_SOCKET_HOST,
        port: parseInt(PORT),
        password: process.env.REDIS_PASSWORD || "",
    },
});

const DEFAULT_REMOVE_CONFIG = {
    attempts:1,
    removeOnComplete: {
        age: 3600,
    },
    removeOnFail: {
        age: 24 * 3600,
    },
};

export async function addJobToQueue<T>(job_name:String,data: T): Promise<Job<T>> {
    return logsMQ.add(`${job_name}`, data, DEFAULT_REMOVE_CONFIG);
}

setupWorker();