"use client"

import { useEffect } from "react"
import { ErrorView } from "@/components/shared/error-view"
import { Header } from "@/components/layouts/header"
import { Footer } from "@/components/layouts/footer"
import { ServerCrash } from "lucide-react"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Di sini biasanya kirim log ke Sentry/Datadog
    console.error("Terjadi error:", error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col">
      <Header variant="landing" />

      <main className="flex-1 flex flex-col">
        <ErrorView
          title="Dapur Sedang Sibuk"
          description="Maaf, server kami sedang mengalami sedikit gangguan teknis. Koki kami (developer) sedang memperbaikinya."
          code="500"
          icon={ServerCrash}
          onRetry={reset} // Tombol ini akan mencoba me-reload halaman
        />
      </main>

      <Footer />
    </div>
  )
}
