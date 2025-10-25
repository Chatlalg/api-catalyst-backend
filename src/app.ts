import express from "express"
import type { Request, Response } from "express";
import type { ResponseObject } from "./types.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));

app.get("/", (req: Request, res: Response<ResponseObject>) => {
    res.status(200).json({
        success: true,
        message: "Welcome to api catalyst backend!",
    })
});


export { app };