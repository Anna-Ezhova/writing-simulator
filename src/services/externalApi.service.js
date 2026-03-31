/**
 * This service establishes connection to the Gemini AI API using the API-Key
 * Returns response from the AI as string
 */


import { GoogleGenAI } from "@google/genai";
import buildPrompt from "./buildPrompt.service.js";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function fetchGeminiApi(task, input) {
  const prompt = buildPrompt(task, input);

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}
