"use client"

import dynamic from "next/dynamic"

const OSMMapToko = dynamic(() => import("@/components/osm-map-toko"), {
    ssr: false,
    loading: () => (
        <div className="flex h-[400px] w-full items-center justify-center rounded-xl border bg-muted">
            <p className="text-muted-foreground">Memuat Peta...</p>
        </div>
    ),
})

export function MapWrapper() {
    return <OSMMapToko />
}
