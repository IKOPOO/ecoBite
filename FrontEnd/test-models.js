import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!API_KEY) {
    console.error("Please set NEXT_PUBLIC_GEMINI_API_KEY");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

async function listModels() {
    try {
        // Note: listModels might not be available in all SDK versions directly or requires different call
        // But let's try a simple generation with 'gemini-pro' to check connectivity first
        // Actually, let's try to get a model that definitely exists
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent("Hello");
        console.log("gemini-pro works:", result.response.text());
    } catch (e) {
        console.log("gemini-pro failed:", e.message);
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-001" });
        const result = await model.generateContent("Hello");
        console.log("gemini-1.5-flash-001 works:", result.response.text());
    } catch (e) {
        console.log("gemini-1.5-flash-001 failed:", e.message);
    }
}

listModels();
