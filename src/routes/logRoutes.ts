import express from "express"
import { insertLog } from "../controllers/logControllers.js";
import verifyUser from "../middlewares/auth.js";

const router = express.Router();

router.post("/insertLog", verifyUser, insertLog);

export default router