/**
 * AI Service (Groq API)
 * Service for interacting with Groq API using Llama 3.2 Vision
 */

import Groq from "groq-sdk"

const API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY || ""

if (!API_KEY) {
    console.warn("NEXT_PUBLIC_GROQ_API_KEY is not set. AI features will not work.")
}

// Initialize Groq client
const groq = new Groq({
    apiKey: API_KEY,
    dangerouslyAllowBrowser: true // Required for client-side usage
})

/**
 * Analyze image with Groq Llama 4 Scout Vision
 */
export async function analyzeImageWithGemini(
    imageBase64: string,
    prompt: string,
    systemPrompt?: string
): Promise<string> {
    try {
        console.log("🤖 Using Groq API with Llama 4 Scout Vision")

        const completion = await groq.chat.completions.create({
            model: "meta-llama/llama-4-scout-17b-16e-instruct",
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: systemPrompt
                                ? `${systemPrompt}\n\n${prompt}`
                                : prompt
                        },
                        {
                            type: "image_url",
                            image_url: {
                                url: `data:image/jpeg;base64,${imageBase64}`
                            }
                        }
                    ]
                }
            ],
            temperature: 0.7,
            max_tokens: 2048,
        })

        const text = completion.choices[0]?.message?.content || ""

        if (!text) {
            throw new Error("No response from AI model")
        }

        console.log("✅ Groq API response received")
        return text
    } catch (error: any) {
        console.error("Groq API error:", error)

        if (error.message?.includes("429") || error.message?.includes("rate_limit")) {
            throw new Error("API rate limit tercapai. Mohon tunggu sebentar.")
        }

        if (error.message?.includes("401") || error.message?.includes("authentication")) {
            throw new Error("API key tidak valid. Periksa NEXT_PUBLIC_GROQ_API_KEY Anda.")
        }

        if (error.message?.includes("model_decommissioned") || error.message?.includes("deprecated")) {
            throw new Error("Model AI tidak tersedia. Mohon hubungi developer.")
        }

        throw new Error("Gagal menganalisis gambar. Silakan coba lagi.")
    }
}

/**
 * Generate text with Groq (no image)
 */
export async function generateWithGemini(
    prompt: string,
    systemPrompt?: string
): Promise<string> {
    try {
        console.log("🤖 Using Groq API with Llama 4 Scout")

        const completion = await groq.chat.completions.create({
            model: "meta-llama/llama-4-scout-17b-16e-instruct",
            messages: [
                ...(systemPrompt ? [{ role: "system" as const, content: systemPrompt }] : []),
                { role: "user" as const, content: prompt }
            ],
            temperature: 0.7,
            max_tokens: 2048,
        })

        const text = completion.choices[0]?.message?.content || ""

        if (!text) {
            throw new Error("No response from AI model")
        }

        console.log("✅ Groq API response received")
        return text
    } catch (error: any) {
        console.error("Groq API error:", error)

        if (error.message?.includes("429") || error.message?.includes("rate_limit")) {
            throw new Error("API rate limit tercapai. Mohon tunggu sebentar.")
        }

        throw new Error("Gagal memproses permintaan. Silakan coba lagi.")
    }
}

/**
 * Check if Groq API is configured
 */
export function isGeminiConfigured(): boolean {
    return !!API_KEY
}
