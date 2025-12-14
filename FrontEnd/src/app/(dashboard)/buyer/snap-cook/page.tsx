"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Camera, ShoppingBag, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { SnapCookCamera } from "@/components/features/snap-cook/snap-cook-camera"
import { ChefSavorBite } from "@/components/features/snap-cook/chef-savorbite"
import { RecipeRecommendation } from "@/components/features/snap-cook/recipe-recommendation"
import { useCart } from "@/providers/cart-provider"
import { getRecipeRecommendation } from "@/services/snap-cook-service"
import { isGeminiConfigured } from "@/services/gemini-service"
import type { ChefSavorBiteResponse } from "@/lib/prompts/chef-savorbite-prompt"

export default function SnapCookPage() {
    const router = useRouter()
    const { items: cartItems } = useCart()
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [error, setError] = useState<string>("")
    const [recipe, setRecipe] = useState<ChefSavorBiteResponse | null>(null)
    const [capturedImage, setCapturedImage] = useState<string>("")

    const handleImageCapture = async (image: File) => {
        setIsAnalyzing(true)
        setError("")
        setRecipe(null)

        // Create preview URL
        const previewUrl = URL.createObjectURL(image)
        setCapturedImage(previewUrl)

        try {
            const result = await getRecipeRecommendation({
                image,
                cartItems,
            })

            if (result.success && result.data) {
                setRecipe(result.data)
            } else {
                setError(result.error || "Terjadi kesalahan saat menganalisis gambar.")
            }
        } catch (err) {
            console.error("Snap & Cook error:", err)
            setError("Terjadi kesalahan. Silakan coba lagi.")
        } finally {
            setIsAnalyzing(false)
        }
    }

    const handleTryAgain = () => {
        setRecipe(null)
        setCapturedImage("")
        setError("")
    }

    const handleCheckout = () => {
        router.push("/buyer/checkout")
    }

    // Check if Gemini is configured
    if (!isGeminiConfigured()) {
        return (
            <div className="container mx-auto max-w-4xl px-4 py-8">
                <Alert variant="destructive">
                    <AlertCircle className="size-4" />
                    <AlertDescription>
                        Fitur Snap & Cook memerlukan Gemini API Key. Silakan tambahkan{" "}
                        <code className="rounded bg-destructive-foreground/10 px-1 py-0.5">
                            NEXT_PUBLIC_GEMINI_API_KEY
                        </code>{" "}
                        ke file <code className="rounded bg-destructive-foreground/10 px-1 py-0.5">.env.local</code>
                    </AlertDescription>
                </Alert>
            </div>
        )
    }

    return (
        <div className="container mx-auto max-w-4xl px-4 py-8">
            {/* Header */}
            <div className="mb-8 text-center">
                <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 p-4">
                    <Camera className="size-12 text-primary" />
                </div>
                <h1 className="mb-2 text-3xl font-bold">Snap & Cook</h1>
                <p className="text-lg text-muted-foreground">
                    Foto bahan makananmu, dapatkan resep instan dari Chef SavorBite!
                </p>
            </div>

            {/* Cart Info */}
            {cartItems.length > 0 && !recipe && (
                <Card className="mb-6 border-primary/30 bg-primary/5">
                    <CardContent className="flex items-center gap-3 p-4">
                        <ShoppingBag className="size-5 text-primary" />
                        <div className="flex-1">
                            <p className="text-sm font-medium">
                                Kamu punya {cartItems.length} item di keranjang
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Chef SavorBite akan merekomendasikan resep yang sesuai!
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Main Content */}
            <div className="space-y-6">
                {!recipe ? (
                    <>
                        {/* Camera Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Ambil Foto Bahan Makanan</CardTitle>
                                <CardDescription>
                                    Foto kulkas, lemari dapur, atau bahan makanan yang kamu punya
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <SnapCookCamera
                                    onCapture={handleImageCapture}
                                    disabled={isAnalyzing}
                                />
                            </CardContent>
                        </Card>

                        {/* Chef Loading */}
                        {isAnalyzing && (
                            <ChefSavorBite
                                isLoading={true}
                                message="Wah, aku lihat bahan-bahan menarik di situ! Tunggu sebentar ya, aku sedang memikirkan resep terbaik untukmu..."
                            />
                        )}

                        {/* Error */}
                        {error && (
                            <Alert variant="destructive">
                                <AlertCircle className="size-4" />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                    </>
                ) : (
                    <>
                        {/* Chef Success Message */}
                        <ChefSavorBite message="Aku sudah menemukan resep yang pas untukmu! Lihat di bawah ya 😊" />

                        {/* Recipe Recommendation */}
                        <RecipeRecommendation
                            recipe={recipe}
                            capturedImage={capturedImage}
                            onCheckout={handleCheckout}
                            onTryAgain={handleTryAgain}
                        />
                    </>
                )}
            </div>

            {/* How It Works */}
            {!recipe && !isAnalyzing && (
                <Card className="mt-8 border-dashed">
                    <CardHeader>
                        <CardTitle className="text-base">Cara Kerja Snap & Cook</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ol className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex gap-2">
                                <span className="font-semibold text-foreground">1.</span>
                                <span>Foto bahan makanan yang kamu punya di rumah</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="font-semibold text-foreground">2.</span>
                                <span>
                                    Chef SavorBite AI akan menganalisis foto dan keranjangmu
                                </span>
                            </li>
                            <li className="flex gap-2">
                                <span className="font-semibold text-foreground">3.</span>
                                <span>
                                    Dapatkan rekomendasi resep yang bisa langsung kamu masak!
                                </span>
                            </li>
                        </ol>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
