"use client"

import { useRouter } from "next/navigation"
import { ArrowLeftIcon } from "lucide-react"

export default function BackButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      className="absolute top-4 left-4 inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors z-10"
    >
      <ArrowLeftIcon className="size-5" />
      <span className="font-medium">Kembali</span>
    </button>
  )
}
