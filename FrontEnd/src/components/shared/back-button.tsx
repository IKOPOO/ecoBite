"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button" // Pastikan path ini benar

interface BackButtonProps {
  label?: string
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

export default function BackButton({
  label,
  className,
  variant = "ghost", // Default "ghost" biar transparan & bersih
}: BackButtonProps) {
  const router = useRouter()

  return (
    <Button
      variant={variant}
      // Kalau ada label, ukurannya normal. Kalau cuma icon, ukurannya 'icon' (kotak presisi)
      size={label ? "default" : "icon"}
      onClick={() => router.back()}
      className={cn(
        "group transition-all hover:-translate-x-1", // Efek animasi geser dikit pas hover
        className
      )}
      title="Kembali" // Tooltip native browser
    >
      <ArrowLeft className={cn("size-5", label && "mr-2")} />
      {label && <span>{label}</span>}
    </Button>
  )
}
