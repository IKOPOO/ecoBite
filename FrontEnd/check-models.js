const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '.env' });

async function listModels() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("No API KEY found in .env");
        return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    try {
        // For listing models, we can use the model manager if exposed, 
        // but the SDK handles getGenerativeModel. 
        // Actually the SDK doesn't expose listModels directly on genAI instance easily in older versions, 
        // but let's check if we can just try a generic request or use the verify logic.

        // Correction: The node SDK usually doesn't have a direct 'listModels' helper on the client *instance* in early versions,
        // but let's try to see if we can just error handle or use a known list.
        // Wait, the error message clearly says: "Call ListModels to see the list of available models"
        // This implies we can call it. 

        // Actually, making a raw HTTP request might be easier to be sure.
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.models) {
            console.log("Available Models:");
            data.models.forEach(m => {
                if (m.supportedGenerationMethods.includes("generateContent")) {
                    console.log(`- ${m.name} (${m.displayName})`);
                }
            });
        } else {
            console.log("Error listing models:", data);
        }

    } catch (error) {
        console.error("Error:", error);
    }
}

listModels();
