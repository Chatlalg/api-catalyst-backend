import express from "express"
import type { Request, Response } from "express";
import type { ResponseObjectType } from "./types/types.js";
import logRoutes from "./routes/logRoutes.js"
import cors from "cors"

const app = express();
app.use(cors({
    origin: "*"
}))
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));

app.get("/", (req: Request, res: Response<ResponseObjectType>) => {
    res.status(200).json({
        success: true,
        message: "Welcome to api catalyst backend!",
    })
});
app.use("/logs", logRoutes)

export { app };