import Link from "next/link"
import { Button } from "@/components/ui/button" // Pastikan path ini sesuai
import { AlertTriangle, HomeIcon } from "lucide-react"

interface ErrorViewProps {
  title: string
  description: string
  code?: string
  icon?: React.ElementType
  action?: React.ReactNode
  onRetry?: () => void
}

export function ErrorView({ title, description, code, icon: Icon = AlertTriangle, action, onRetry }: ErrorViewProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center py-16 text-center">
      <div className="mb-6 flex size-24 items-center justify-center rounded-full bg-muted/50">
        <Icon className="size-12 text-muted-foreground/70" />
      </div>

      {code && (
        <span className="mb-3 inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-600 dark:bg-red-900/30 dark:text-red-400">
          Error {code}
        </span>
      )}

      <h1 className="mb-3 text-3xl font-bold tracking-tight lg:text-4xl">{title}</h1>
      <p className="mx-auto mb-8 max-w-md text-muted-foreground">{description}</p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        {onRetry && (
          <Button onClick={onRetry} variant="outline" size="lg">
            Coba Lagi
          </Button>
        )}

        {action ? (
          action
        ) : (
          <Link href="/">
            <Button size="lg" className="gap-2">
              <HomeIcon className="size-4" />
              Kembali ke Beranda
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
