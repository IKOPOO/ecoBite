import type React from "react"
import { AdminSidebar } from "@/components/layouts/admin-sidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <AdminSidebar />
      <main className="md:ml-64">
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  )
}
