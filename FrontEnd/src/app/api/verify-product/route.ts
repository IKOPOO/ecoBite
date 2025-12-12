import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        console.log("Using API Key:", apiKey ? apiKey.substring(0, 5) + "..." : "undefined");

        if (!apiKey || apiKey === "YOUR_API_KEY_HERE") {
            return NextResponse.json(
                { error: "GEMINI_API_KEY is not configured. Please check your .env file." },
                { status: 500 }
            );
        }

        const body = await request.json();
        const { image, name, description } = body;

        if (!image) {
            return NextResponse.json(
                { error: "Image data is required" },
                { status: 400 }
            );
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        // Switching to gemini-flash-latest to avoid 404/429 issues
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const prompt = `
      Anda adalah sistem verifikasi kualitas produk untuk marketplace food rescue 'ecoBite'.

      TUGAS: Analisis HANYA foto produk yang diunggah. Abaikan jika nama/deskripsi kosong. Fokus pada kelayakan visual makanan.

      DATA INPUT (Hanya sebagai referensi, bukan syarat utama):
      - Nama Produk: ${name || "Tidak diketahui"}
      - Deskripsi: ${description || "Tidak ada deskripsi"}

      INSTRUKSI VERIFIKASI:
      1.  **Safety/Moderation**: Apakah gambar aman dan bukan konten terlarang?
      2.  **Kelayakan Konsumsi**: Tentukan kelayakan berdasarkan visual foto saja (kesegaran, kemasan utuh, tidak busuk).

      ATURAN OUTPUT:
      - Berikan respons JSON.
      - "reason" maksimal 5 kata. Singkat, padat, jelas.

      OUTPUT FORMAT (JSON RAW):
      {
        "safety_status": "Lolos" | "Tolak",
        "reason": "Alasan singkat (maks 10 kata)",
        "confidence_score": [Skor 0.0 - 1.0]
      }
    `;

        // Remove header if present (e.g., "data:image/jpeg;base64,")
        const base64Data = image.split(",")[1] || image;

        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    data: base64Data,
                    mimeType: "image/jpeg", // Assuming JPEG for now, or detect from header
                },
            },
        ]);

        const response = await result.response;
        const text = response.text();

        // Clean up markdown if Gemini returns it
        const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();

        try {
            const jsonResponse = JSON.parse(cleanText);
            return NextResponse.json(jsonResponse);
        } catch (e) {
            console.error("Failed to parse Gemini response:", text);
            return NextResponse.json(
                { error: "Failed to parse verification result", raw: text },
                { status: 500 }
            );
        }
    } catch (error: any) {
        console.error("Verification error:", error);
        return NextResponse.json(
            {
                error: error.message || "Internal server error",
                details: error.toString()
            },
            { status: 500 }
        );
    }
}
