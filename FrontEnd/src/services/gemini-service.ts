/**
 * Gemini AI Service
 * Service for interacting with Google Gemini API
 */

import { GoogleGenerativeAI } from "@google/generative-ai"

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""

if (!API_KEY) {
    console.warn("NEXT_PUBLIC_GEMINI_API_KEY is not set. Gemini features will not work.")
}

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(API_KEY)

/**
 * Analyze image with Gemini Vision
 */
export async function analyzeImageWithGemini(
    imageBase64: string,
    prompt: string,
    systemPrompt?: string
): Promise<string> {
    try {
        // Use gemini-2.0-flash-exp or fallback to gemini-1.5-pro-vision
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash-exp",
            systemInstruction: systemPrompt
        })

        const imagePart = {
            inlineData: {
                data: imageBase64,
                mimeType: "image/jpeg",
            },
        }

        const result = await model.generateContent([prompt, imagePart])
        const response = await result.response
        const text = response.text()

        return text
    } catch (error) {
        console.error("Gemini API error:", error)
        throw new Error("Gagal menganalisis gambar. Silakan coba lagi.")
    }
}

/**
 * Generate text with Gemini (no image)
 */
export async function generateWithGemini(
    prompt: string,
    systemPrompt?: string
): Promise<string> {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash-exp",
            systemInstruction: systemPrompt
        })

        const result = await model.generateContent(prompt)
        const response = await result.response
        const text = response.text()

        return text
    } catch (error) {
        console.error("Gemini API error:", error)
        throw new Error("Gagal memproses permintaan. Silakan coba lagi.")
    }
}

/**
 * Check if Gemini API is configured
 */
export function isGeminiConfigured(): boolean {
    return !!API_KEY
}
