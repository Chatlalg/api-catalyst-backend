import express from "express"
import { getUserLogs, insertLog } from "../controllers/logControllers.js";

const router = express.Router();

router.post("/insertLog", insertLog);
router.get("/getUserLogs", getUserLogs)

export default router