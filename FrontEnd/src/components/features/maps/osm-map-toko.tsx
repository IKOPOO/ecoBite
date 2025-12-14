"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// PERBAIKAN 1: Gunakan URL CDN agar icon langsung muncul tanpa perlu file lokal
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

interface FoodSpot {
  id: number
  name: string
  category: string
  address: string
  lat: number
  lng: number
  items: string
  status: string
  price: string
}

interface OSMMapTokoProps {
  data: FoodSpot[]
}

export default function OSMMapToko({ data }: OSMMapTokoProps) {
  const center: [number, number] = [-6.966667, 110.416664]

  return (
    <MapContainer center={center} zoom={12} scrollWheelZoom={false} className="h-125 w-full rounded-xl z-0">
      <TileLayer attribution="&copy; OpenStreetMap" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {data.map(spot => (
        <Marker
          key={spot.id}
          position={[spot.lat, spot.lng]}
          icon={icon} // <--- PERBAIKAN 2: Jangan lupa pasang props icon ini!
        >
          <Popup>
            <div className="p-1 min-w-50">
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded border border-green-400">
                {spot.category}
              </span>

              <h3 className="font-bold text-sm mt-2">{spot.name}</h3>
              <p className="text-xs text-gray-500 mb-2">{spot.address}</p>

              {/* <button className="w-full mt-2 bg-blue-600 text-white text-xs py-1 px-2 rounded hover:bg-blue-700">
                Lihat Detail
              </button> */}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
