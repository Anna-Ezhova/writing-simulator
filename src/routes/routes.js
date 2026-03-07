import express from "express";
import { sendPromptToAPI } from "../controllers/sendPrompt.controller.js";
import { getResult } from "../controllers/getResult.controller.js";





const router = express.Router()

router.post("/api/v1/gemini", sendPromptToAPI)
router.get("/result", getResult)

export default router 