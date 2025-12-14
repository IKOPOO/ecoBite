"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useState } from "react"

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  // useState memastikan QueryClient hanya dibuat sekali per sesi browser
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Data dianggap basi (stale) setelah 1 menit.
            // Selama 1 menit, kalau user pindah page lalu balik lagi, ga akan fetch ulang.
            staleTime: 60 * 1000,

            // Kalau error (misal 500), coba fetch ulang 1 kali saja sebelum nyerah
            retry: 1,

            // Jangan fetch ulang otomatis pas window focus (ganti tab)
            refetchOnWindowFocus: false,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Devtools cuma muncul di mode development (npm run dev) */}
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
    </QueryClientProvider>
  )
}
