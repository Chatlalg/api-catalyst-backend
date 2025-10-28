import { Job } from 'bullmq';
import { Log } from '../models/Log.js';
import type { LogSchema, RequestBodyType } from '../types/types.js';
import connectDB from '../db/index.js';

await connectDB();

export default async function jobProcessor(job: Job): Promise<'DONE' | "FAILED"> {
	try {
		const data: RequestBodyType = job.data
		const logToInsert: LogSchema = {
			timestamp: new Date(`${data.timestamp}`),
			metadata: {
				url: data.url,
				user: job.name,
			},
			cacheHit: data.cacheHit,
			httpMethod: data.httpMethod,
			responseStatusCode: data.responseStatusCode,
			roundTripTime: data.roundTripTime
		}
		const response = await Log.insertOne(logToInsert);
		return "DONE"
	} catch (error) {
		console.log(error)
		return "FAILED"	
	}
};
