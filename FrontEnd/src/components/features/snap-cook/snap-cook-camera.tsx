"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Camera, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { captureFromVideo } from "@/lib/image-utils"

interface SnapCookCameraProps {
  onCapture: (image: File) => void
  disabled?: boolean
}

export function SnapCookCamera({ onCapture, disabled }: SnapCookCameraProps) {
    const [stream, setStream] = useState<MediaStream | null>(null)
    const [error, setError] = useState<string>("")
    const [isCameraActive, setIsCameraActive] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const videoRef = useRef<HTMLVideoElement>(null)

    // Start camera automatically on mount
    useEffect(() => {
        console.log("🎥 Snap & Cook: Starting camera...")
        startCamera()
        return () => {
            console.log("🎥 Snap & Cook: Cleaning up camera...")
            stopCamera()
        }
    }, [])

    // Start camera
    const startCamera = useCallback(async () => {
        try {
            console.log("🎥 Requesting camera permission...")
            setError("")
            setIsLoading(true)

            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: "environment",
                    width: { ideal: 1920 },
                    height: { ideal: 1080 }
                },
                audio: false,
            })

            console.log("✅ Camera permission granted!")
            setStream(mediaStream)
            setIsCameraActive(true)
            setIsLoading(false)
        } catch (err: any) {
            console.error("❌ Camera error:", err)
            setIsLoading(false)

            let errorMessage = "Tidak dapat mengakses kamera. "

            if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
                errorMessage = "🚫 Akses kamera ditolak. Silakan klik ikon kamera di address bar dan izinkan akses kamera."
            } else if (err.name === "NotFoundError") {
                errorMessage = "📷 Kamera tidak ditemukan. Pastikan device memiliki kamera."
            } else if (err.name === "NotReadableError") {
                errorMessage = "⚠️ Kamera sedang digunakan aplikasi lain. Tutup aplikasi lain yang menggunakan kamera."
            } else {
                errorMessage = `❌ Error: ${err.message || 'Unknown error'}`
            }

            setError(errorMessage)
        }
    }, [])

    // Attach stream to video element when ready
    useEffect(() => {
        if (stream && videoRef.current && isCameraActive) {
            console.log("🔗 Attaching stream to video element...")
            const video = videoRef.current
            video.srcObject = stream

            const playVideo = async () => {
                try {
                    // Wait for metadata
                    if (video.readyState < 2) {
                        await new Promise((resolve) => {
                            const onLoadedMetadata = () => {
                                video.removeEventListener('loadedmetadata', onLoadedMetadata)
                                resolve(true)
                            }
                            video.addEventListener('loadedmetadata', onLoadedMetadata)
                            // Fallback
                            setTimeout(resolve, 2000)
                        })
                    }

                    await video.play()
                    console.log("▶️ Video playing successfully")
                } catch (e) {
                    console.error("❌ Error playing video:", e)
                }
            }

            playVideo()
        }
    }, [stream, isCameraActive])

  // Stop camera
  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
      setIsCameraActive(false)
    }
  }, [stream])

    // Capture photo from camera
    const capturePhoto = useCallback(async () => {
        if (!videoRef.current) {
            setError("Video tidak tersedia")
            return
        }

        // Check if video is ready
        if (videoRef.current.readyState < 2) {
            setError("Video belum siap. Tunggu sebentar...")
            return
        }

        try {
            console.log("📸 Capturing photo...")
            const file = await captureFromVideo(videoRef.current)
            console.log("✅ Photo captured successfully!")
            onCapture(file)
            stopCamera()
        } catch (err: any) {
            console.error("❌ Capture error:", err)
            setError(err.message || "Gagal mengambil foto. Silakan coba lagi.")
        }
    }, [onCapture, stopCamera])

    return (
        <div className="space-y-4">
            {/* Camera Preview */}
            <Card className="overflow-hidden border-2 border-primary">
                <div className="relative aspect-[4/3] bg-black">
                    {isCameraActive ? (
                        <>
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                muted
                                className="size-full object-cover"
                            />
                            {/* Camera Frame Guide */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="absolute inset-8 rounded-2xl border-4 border-white/50" />
                            </div>
                        </>
                    ) : isLoading ? (
                        <div className="flex size-full flex-col items-center justify-center p-8 text-center">
                            <div className="mb-4 animate-pulse rounded-full bg-primary/10 p-6">
                                <Camera className="size-12 text-primary" />
                            </div>
                            <p className="text-sm font-semibold text-white mb-2">
                                Meminta izin kamera...
                            </p>
                            <p className="text-xs text-white/60">
                                Klik "Allow" jika browser menanyakan permission
                            </p>
                        </div>
                    ) : (
                        <div className="flex size-full flex-col items-center justify-center p-8 text-center">
                            <div className="mb-4 rounded-full bg-destructive/10 p-6">
                                <Camera className="size-12 text-destructive" />
                            </div>
                            <p className="text-sm text-white/80">
                                Kamera tidak aktif
                            </p>
                        </div>
                    )}
                </div>
            </Card>

            {/* Error Message */}
            {error && (
                <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
                    <p className="font-semibold mb-1">⚠️ Error</p>
                    <p>{error}</p>
                    <Button
                        onClick={startCamera}
                        variant="outline"
                        size="sm"
                        className="mt-3"
                    >
                        Coba Lagi
                    </Button>
                </div>
            )}

            {/* Action Buttons */}
            {isCameraActive && (
                <div className="flex gap-3">
                    <Button
                        onClick={capturePhoto}
                        disabled={disabled}
                        className="flex-1 gap-2 h-14"
                        size="lg"
                    >
                        <Camera className="size-5" />
                        Ambil Foto
                    </Button>
                    <Button
                        onClick={() => {
                            stopCamera()
                            startCamera()
                        }}
                        disabled={disabled}
                        variant="outline"
                        className="gap-2 h-14"
                        size="lg"
                    >
                        <X className="size-5" />
                        Reset
                    </Button>
                </div>
            )}

            <p className="text-center text-xs text-muted-foreground">
                📸 Posisikan bahan makanan di dalam frame putih
            </p>
        </div>
    )
}
