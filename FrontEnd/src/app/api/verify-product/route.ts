import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { error: "GEMINI_API_KEY is not configured" },
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
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
      Anda adalah sistem verifikasi kualitas produk untuk marketplace food rescue 'ecoBite'.

      TUGAS: Analisis foto produk ini berdasarkan kriteria di bawah.

      DATA INPUT:
      - Nama Produk: ${name || "Tidak diketahui"}
      - Deskripsi: ${description || "Tidak ada deskripsi"}

      INSTRUKSI VERIFIKASI:
      1.  **Safety/Moderation**: Apakah gambar mengandung konten terlarang, spam, atau materi SARA? (Ya/Tidak)
      2.  **Kelayakan Konsumsi**: Apakah produk makanan dalam foto terlihat segar, tidak ada jamur/tanda busuk, dan layak dikonsumsi? (Ya/Tidak/Unclear)
      3.  **Relevansi/Kesesuaian**: Apakah objek di foto sesuai dengan 'Nama Produk' dan 'Deskripsi' yang diberikan? (Ya/Tidak)

      OUTPUT HARUS DALAM FORMAT JSON BERIKUT (tanpa markdown formatting, hanya raw json):
      {
        "safety_status": "Lolos" | "Tolak",
        "reason": "Alasan spesifik penolakan jika 'Tolak'",
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
    } catch (error) {
        console.error("Verification error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
