"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface User {
  id: string
  name: string
  email: string
  phone: string
  role: "buyer" | "seller" | "admin"
  avatar?: string
  address?: string
  joinedAt: string
}

interface AuthProviderType {
  user: User | null
  setUser: (user: User | null) => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthProviderType | undefined>(undefined)

// Mock user data for demo
const mockBuyerUser: User = {
  id: "user-1",
  name: "Budi Santoso",
  email: "budi@example.com",
  phone: "081234567890",
  role: "buyer",
  avatar: "/indonesian-man-avatar.jpg",
  address: "Jl. Sudirman No. 123, Jakarta Selatan",
  joinedAt: "2024-06-15",
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(mockBuyerUser)

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
