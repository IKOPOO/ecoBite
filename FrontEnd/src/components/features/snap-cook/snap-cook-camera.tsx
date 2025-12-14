"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Camera, Upload, X, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { captureFromVideo, validateImage } from "@/lib/image-utils"

interface SnapCookCameraProps {
  onCapture: (image: File) => void
  disabled?: boolean
}

export function SnapCookCamera({ onCapture, disabled }: SnapCookCameraProps) {
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [error, setError] = useState<string>("")
  const [isCameraActive, setIsCameraActive] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Start camera
  const startCamera = useCallback(async () => {
    try {
      setError("")
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }, // Use back camera on mobile
        audio: false,
      })

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        await videoRef.current.play()
      }

      setStream(mediaStream)
      setIsCameraActive(true)
    } catch (err) {
      console.error("Camera error:", err)
      setError("Tidak dapat mengakses kamera. Pastikan Anda memberikan izin akses kamera atau gunakan upload foto.")
    }
  }, [])

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
    if (!videoRef.current) return

    try {
      const file = await captureFromVideo(videoRef.current)
      onCapture(file)
      stopCamera()
    } catch (err) {
      console.error("Capture error:", err)
      setError("Gagal mengambil foto. Silakan coba lagi.")
    }
  }, [onCapture, stopCamera])

  // Handle file upload
  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return

      const validation = validateImage(file)
      if (!validation.valid) {
        setError(validation.error || "File tidak valid")
        return
      }

      setError("")
      onCapture(file)
    },
    [onCapture]
  )

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [stopCamera])

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden border-2 border-dashed">
        <div className="relative aspect-4/3 bg-muted">
          {isCameraActive ? (
            <>
              <video ref={videoRef} autoPlay playsInline muted className="size-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute inset-8 rounded-2xl border-4 border-primary/30" />
              </div>
            </>
          ) : (
            <div className="flex size-full flex-col items-center justify-center p-8 text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-6">
                <Camera className="size-12 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Foto Bahan Makananmu!</h3>
              <p className="mb-6 text-sm text-muted-foreground">
                Ambil foto kulkas atau bahan makanan yang kamu punya, dan Chef SavorBite akan kasih rekomendasi resep
              </p>
            </div>
          )}
        </div>
      </Card>

      {error && <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">{error}</div>}

      <div className="flex flex-col gap-3 sm:flex-row">
        {!isCameraActive ? (
          <>
            <Button onClick={startCamera} disabled={disabled} className="flex-1 gap-2" size="lg">
              <Camera className="size-5" />
              Buka Kamera
            </Button>
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled}
              variant="outline"
              className="flex-1 gap-2"
              size="lg"
            >
              <Upload className="size-5" />
              Upload Foto
            </Button>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          </>
        ) : (
          <>
            <Button onClick={capturePhoto} disabled={disabled} className="flex-1 gap-2" size="lg">
              <Camera className="size-5" />
              Ambil Foto
            </Button>
            <Button onClick={stopCamera} disabled={disabled} variant="outline" className="gap-2" size="lg">
              <X className="size-5" />
              Batal
            </Button>
          </>
        )}
      </div>

      <p className="text-center text-xs text-muted-foreground">
        💡 Tips: Pastikan pencahayaan cukup dan bahan makanan terlihat jelas
      </p>
    </div>
  )
}
