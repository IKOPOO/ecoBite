"use client"

import dynamic from "next/dynamic"

// Import data dummy yang tadi dibuat (atau define langsung di sini)
import { foodRescueSpots } from "@/lib/dummy-maps"

const OSMMapToko = dynamic(() => import("@/components/features/maps/osm-map-toko"), {
  ssr: false,
  loading: () => (
    <div className="flex h-100 w-full items-center justify-center rounded-xl border bg-muted">
      <p className="text-muted-foreground">Memuat Peta Semarang...</p>
    </div>
  ),
})

export function MapWrapper() {
  // Pass data dummy ke komponen peta
  return <OSMMapToko data={foodRescueSpots} />
}
