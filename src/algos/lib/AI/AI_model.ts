import { GoogleGenAI } from "@google/genai";


const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; 

const ai = new GoogleGenAI({ apiKey: API_KEY }); 

async function AI_model(prompt: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  console.log(response.text);
}


export default AI_model;