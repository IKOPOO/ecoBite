"use client"

import dynamic from "next/dynamic"

const OSMMapToko = dynamic(() => import("@/components/features/maps/osm-map-toko"), {
  ssr: false,
  loading: () => (
    <div className="flex h-100 w-full items-center justify-center rounded-xl border bg-muted">
      <p className="text-muted-foreground">Memuat Peta...</p>
    </div>
  ),
})

export function MapWrapper() {
  return <OSMMapToko />
}
