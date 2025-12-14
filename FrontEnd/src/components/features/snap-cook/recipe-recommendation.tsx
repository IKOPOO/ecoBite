"use client"

import { ChefHat, ShoppingCart, Camera as CameraIcon, Sparkles, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { ChefSavorBiteResponse } from "@/lib/prompts/chef-savorbite-prompt"

interface RecipeRecommendationProps {
    recipe: ChefSavorBiteResponse
    capturedImage?: string
    onCheckout?: () => void
    onTryAgain?: () => void
}

export function RecipeRecommendation({
    recipe,
    capturedImage,
    onCheckout,
    onTryAgain,
}: RecipeRecommendationProps) {
    return (
        <div className="space-y-6">
            {/* Header with Image */}
            <Card className="overflow-hidden border-2 border-primary/20">
                <div className="relative">
                    {capturedImage && (
                        <div className="relative aspect-video overflow-hidden bg-muted">
                            <img
                                src={capturedImage}
                                alt="Captured ingredients"
                                className="size-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                        </div>
                    )}
                    <CardHeader className={capturedImage ? "absolute bottom-0 left-0 right-0" : ""}>
                        <div className="flex items-start gap-3">
                            <div className="rounded-xl bg-primary p-3 text-primary-foreground shadow-lg">
                                <ChefHat className="size-6" />
                            </div>
                            <div className="flex-1">
                                <CardTitle className="mb-1 text-2xl">{recipe.nama_resep}</CardTitle>
                                <p className="text-sm text-muted-foreground">
                                    Rekomendasi spesial dari Chef SavorBite
                                </p>
                            </div>
                        </div>
                    </CardHeader>
                </div>
            </Card>

            {/* AI Insight */}
            {recipe.hasil_pandangan_kamera && (
                <Card className="border-primary/20 bg-primary/5">
                    <CardContent className="p-4">
                        <div className="flex gap-3">
                            <CameraIcon className="size-5 shrink-0 text-primary" />
                            <div>
                                <p className="mb-1 text-sm font-semibold">Yang aku lihat di fotomu:</p>
                                <p className="text-sm text-muted-foreground">
                                    {recipe.hasil_pandangan_kamera}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Why It Works */}
            {recipe.mengapa_cocok && (
                <Card>
                    <CardContent className="p-4">
                        <div className="flex gap-3">
                            <Sparkles className="size-5 shrink-0 text-amber-500" />
                            <div>
                                <p className="mb-1 text-sm font-semibold">Mengapa resep ini cocok?</p>
                                <p className="text-sm text-muted-foreground">{recipe.mengapa_cocok}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Ingredients */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Bahan-Bahan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* From Camera */}
                    {recipe.bahan_terdeteksi_kamera.length > 0 && (
                        <div>
                            <div className="mb-2 flex items-center gap-2">
                                <CameraIcon className="size-4 text-muted-foreground" />
                                <p className="text-sm font-medium">Yang kamu sudah punya:</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {recipe.bahan_terdeteksi_kamera.map((item, index) => (
                                    <Badge key={index} variant="secondary" className="gap-1">
                                        ✓ {item}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* From Cart */}
                    {recipe.bahan_dari_keranjang.length > 0 && (
                        <>
                            <Separator />
                            <div>
                                <div className="mb-2 flex items-center gap-2">
                                    <ShoppingCart className="size-4 text-primary" />
                                    <p className="text-sm font-medium">Dari keranjangmu:</p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {recipe.bahan_dari_keranjang.map((item, index) => (
                                        <Badge key={index} variant="default" className="gap-1">
                                            🛒 {item}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {/* Common Ingredients */}
                    {recipe.bahan_tambahan_umum.length > 0 && (
                        <>
                            <Separator />
                            <div>
                                <p className="mb-2 text-sm font-medium text-muted-foreground">
                                    Bahan pelengkap:
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {recipe.bahan_tambahan_umum.map((item, index) => (
                                        <Badge key={index} variant="outline" className="text-xs">
                                            {item}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>

            {/* Cooking Steps */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Cara Membuat</CardTitle>
                </CardHeader>
                <CardContent>
                    <ol className="space-y-3">
                        {recipe.cara_buat_singkat.map((step, index) => (
                            <li key={index} className="flex gap-3">
                                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                                    {index + 1}
                                </span>
                                <p className="flex-1 pt-0.5 text-sm">{step}</p>
                            </li>
                        ))}
                    </ol>
                </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="border-2 border-primary bg-gradient-to-br from-primary/5 to-primary/10">
                <CardContent className="p-6">
                    <div className="mb-4 text-center">
                        <p className="text-lg font-semibold text-primary">
                            {recipe.call_to_action}
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        {recipe.bahan_dari_keranjang.length > 0 && (
                            <Button
                                onClick={onCheckout}
                                size="lg"
                                className="flex-1 gap-2"
                            >
                                <ShoppingCart className="size-5" />
                                Checkout Sekarang
                                <ChevronRight className="size-4" />
                            </Button>
                        )}
                        <Button
                            onClick={onTryAgain}
                            variant="outline"
                            size="lg"
                            className={recipe.bahan_dari_keranjang.length > 0 ? "" : "flex-1"}
                        >
                            <CameraIcon className="size-5" />
                            Coba Foto Lain
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
