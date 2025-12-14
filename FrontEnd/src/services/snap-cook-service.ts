/**
 * Snap & Cook Service
 * Business logic for Snap & Cook feature
 */

import type { CartItem } from "@/providers/cart-provider"
import { fileToBase64, compressImage } from "@/lib/image-utils"
import { analyzeImageWithGemini } from "./gemini-service"
import {
    getSystemPrompt,
    generatePrompt,
    parseGeminiResponse,
    type ChefSavorBiteResponse,
} from "@/lib/prompts/chef-savorbite-prompt"

export interface SnapAndCookInput {
    image: File
    cartItems: CartItem[]
}

export interface SnapAndCookResult {
    success: boolean
    data?: ChefSavorBiteResponse
    error?: string
}

/**
 * Main function to analyze image and get recipe recommendation
 */
export async function getRecipeRecommendation(
    input: SnapAndCookInput
): Promise<SnapAndCookResult> {
    try {
        // Compress image if needed (max 4MB for Gemini)
        const compressedImage = await compressImage(input.image, 4 * 1024 * 1024)

        // Convert to base64
        const base64Image = await fileToBase64(compressedImage)

        // Generate prompts
        const systemPrompt = getSystemPrompt()
        const userPrompt = generatePrompt({ cartItems: input.cartItems })

        // Call Gemini API
        const response = await analyzeImageWithGemini(
            base64Image,
            userPrompt,
            systemPrompt
        )

        // Parse response
        const parsedResponse = parseGeminiResponse(response)

        if (!parsedResponse) {
            return {
                success: false,
                error: "Gagal memproses respons dari Chef SavorBite. Silakan coba lagi.",
            }
        }

        return {
            success: true,
            data: parsedResponse,
        }
    } catch (error) {
        console.error("Snap & Cook error:", error)
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "Terjadi kesalahan. Silakan coba lagi.",
        }
    }
}
