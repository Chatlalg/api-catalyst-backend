import { Worker, type SandboxedJob, type Job } from "bullmq";
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from "node:path";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const processorUrl = pathToFileURL(__dirname + '/jobProcessor.ts');

export const setupWorker = async () => {
    const consumerProcess = new Worker('logsMQ', processorUrl, {
        connection: {
            host: process.env.REDIS_SOCKET_HOST || "localhost",
            port: parseInt(process.env.REDIS_SOCKET_PORT || "6379"),
            username: process.env.REDIS_USERNAME || "default",
            password: process.env.REDIS_PASSWORD || "pass123",
        }
    })

    consumerProcess.on('completed', (job: Job, returnvalue: 'DONE') => {
        console.debug(`Completed job with id ${job.id}`, returnvalue);
    });
    consumerProcess.on('active', (job: Job<unknown>) => {
        console.debug(`Completed job with id ${job.id}`);
    });
    consumerProcess.on('error', (failedReason: Error) => {
        console.error(`Job encountered an error`, failedReason);
    });
}
