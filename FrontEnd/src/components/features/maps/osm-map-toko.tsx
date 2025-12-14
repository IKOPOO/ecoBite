"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Fix for default marker icon in Next.js
const fixLeafletIcon = () => {
  // @ts-ignore
  delete L.Icon.Default.prototype._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  })
}

export default function OSMMapToko() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    fixLeafletIcon()
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="flex h-100 w-full items-center justify-center rounded-xl border bg-muted">
        <p className="text-muted-foreground">Memuat Peta...</p>
      </div>
    )
  }

  const center: [number, number] = [-7.055466276786032, 110.43521145952651] // Koordinat Toko
  const markerPos: [number, number] = [-7.055466276786032, 110.43521145952651] // Lokasi Toko

  return (
    <div className="h-100 w-full overflow-hidden rounded-xl border shadow-lg">
      <MapContainer center={center} zoom={12} scrollWheelZoom={false} className="size-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={markerPos}>
          <Popup>
            <div className="text-center">
              <h3 className="font-bold">Foster Coffee</h3>
              <p className="text-xs text-muted-foreground">coffee shop kalcer untuk semua kalangan</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
