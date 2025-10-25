import connectDB from "./db/index.js";
import dotenv from "dotenv"
import { app } from "./app.js"

dotenv.config();

const PORT = process.env.PORT || "3000";

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log("Server listening on port: ", process.env.PORT)
        })
    })
    .catch((err) => {
        console.error("Error connecting to database!", err)
    })