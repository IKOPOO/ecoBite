"use client"

import { Loader2, ChefHat } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface ChefSavorBiteProps {
    isLoading?: boolean
    message?: string
}

export function ChefSavorBite({ isLoading, message }: ChefSavorBiteProps) {
    if (!isLoading && !message) return null

    return (
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-6">
                <div className="flex items-start gap-4">
                    {/* Chef Avatar */}
                    <div className="relative">
                        <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                            {isLoading ? (
                                <Loader2 className="size-8 animate-spin" />
                            ) : (
                                <ChefHat className="size-8" />
                            )}
                        </div>
                        {!isLoading && (
                            <div className="absolute -bottom-1 -right-1 size-5 animate-pulse rounded-full bg-green-500 ring-2 ring-background" />
                        )}
                    </div>

                    {/* Message */}
                    <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-primary">Chef SavorBite</h3>
                            <span className="text-xs text-muted-foreground">
                                AI Assistant
                            </span>
                        </div>

                        {isLoading ? (
                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">
                                    Sedang menganalisis bahan makanan...
                                </p>
                                <div className="flex gap-1">
                                    <div className="size-2 animate-bounce rounded-full bg-primary delay-0" />
                                    <div className="size-2 animate-bounce rounded-full bg-primary delay-100" />
                                    <div className="size-2 animate-bounce rounded-full bg-primary delay-200" />
                                </div>
                            </div>
                        ) : (
                            <p className="text-sm leading-relaxed">{message}</p>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
