import mongoose, { Schema } from "mongoose";

const logSchema = new Schema(
    {
        timestamp: Date,
        metadata: {
            url: String,
            user: {
                type: String,
            }
        },
        cacheHit: Boolean,
        roundTripTime: Number,
        responseStatusCode: Number,
        httpMethod: String,
    },
    {
        timeseries: {
            timeField: "timestamp",
            metaField: "metadata",
            granularity: "seconds"
        }
    }
)

export const Log = mongoose.model("Log", logSchema)