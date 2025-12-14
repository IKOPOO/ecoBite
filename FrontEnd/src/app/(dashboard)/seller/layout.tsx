import type React from "react"
import { SellerSidebar } from "@/components/layouts/seller-sidebar"

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <SellerSidebar />
      <main className="md:ml-64">
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  )
}
