import { ErrorView } from "@/components/shared/error-view"
import { Header } from "@/components/layouts/header"
import { Footer } from "@/components/layouts/footer"
import { ShieldAlert } from "lucide-react"

export default function ForbiddenPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header variant="landing" />

      <main className="flex-1 flex flex-col">
        <ErrorView
          title="Akses Ditolak"
          description="Ups! Kamu tidak memiliki izin masuk ke area dapur ini (Restricted Area)."
          code="403"
          icon={ShieldAlert}
        />
      </main>

      <Footer />
    </div>
  )
}
