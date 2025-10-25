import mongoose, { Schema } from "mongoose"

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    api_key: {
        type: String,
        required: true,
        unique: true
    },
    config : {
        ttl : {
            type: Number,
            default : 3600,
        },
        autoEviction : {
            type: Boolean,
            default: false,
        }
    }
}, { timestamps: true })

export const User = mongoose.model("User", userSchema)