# 📸 Snap & Cook Feature

Fitur **Snap & Cook** memungkinkan pembeli untuk memotret bahan makanan yang mereka miliki dan mendapatkan rekomendasi resep dari AI assistant **Chef SavorBite**.

## Features

- 📷 **Camera Integration** - Akses kamera langsung dari browser atau upload foto
- 🤖 **AI-Powered Recipe Recommendations** - Menggunakan Gemini Vision API
- 🛒 **Cart Integration** - Rekomendasi resep berdasarkan item di keranjang
- 👨‍🍳 **Chef SavorBite Persona** - AI assistant dengan persona chef yang ramah
- 📱 **Mobile Responsive** - Optimized untuk mobile dan desktop

## Setup

### 1. Get Gemini API Key

1. Kunjungi [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Login dengan Google account
3. Create new API key
4. Copy API key

### 2. Configure Environment

Buat file `.env.local` di root FrontEnd directory:

```bash
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

⚠️ **Important**: Jangan commit file `.env.local` ke git!

### 3. Run Development Server

```bash
npm run dev
```

### 4. Access Feature

Navigate to: `http://localhost:3000/buyer/snap-cook`

## Usage

1. **Login atau Register** sebagai buyer
2. (Optional) **Tambahkan produk ke cart** dari marketplace
3. **Navigate ke Snap & Cook** dari buyer dashboard
4. **Ambil foto** bahan makanan yang ada di kulkas/dapur
5. **Tunggu AI menganalisis** foto dan keranjang
6. **Lihat rekomendasi resep** dari Chef SavorBite
7. **Checkout keranjang** untuk beli bahan yang kurang

## How It Works

```
┌─────────────────┐
│  User captures  │
│  photo of       │
│  ingredients    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Image is       │
│  compressed &   │
│  converted to   │
│  base64         │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Gemini Vision  │
│  API analyzes   │
│  image + cart   │
│  context        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Chef SavorBite │
│  returns recipe │
│  in JSON format │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Recipe is      │
│  displayed with │
│  ingredients &  │
│  steps          │
└─────────────────┘
```

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **AI**: Google Gemini 2.0 Flash Exp (Vision)
- **Camera**: Browser MediaDevices API
- **UI**: shadcn/ui, TailwindCSS

## Components

### Core Components

- `SnapCookCamera` - Camera capture and file upload
- `ChefSavorBite` - AI assistant with loading states
- `RecipeRecommendation` - Recipe display with ingredients and steps

### Services

- `gemini-service.ts` - Gemini API integration
- `snap-cook-service.ts` - Business logic for Snap & Cook
- `chef-savorbite-prompt.ts` - AI prompt templates

### Utilities

- `image-utils.ts` - Image processing (resize, compress, validate)

## AI Prompt System

Chef SavorBite menggunakan system prompt yang detail untuk menghasilkan rekomendasi resep yang:

1. **Contextual** - Berdasarkan foto bahan makanan dan items di cart
2. **Practical** - Resep yang mudah dimasak dengan tools standar
3. **Persuasive** - Mendorong user untuk checkout cart
4. **Conversational** - Bahasa yang ramah dan natural

Response format (JSON):
```json
{
  "hasil_pandangan_kamera": "string",
  "nama_resep": "string",
  "mengapa_cocok": "string",
  "bahan_dari_keranjang": ["array"],
  "bahan_terdeteksi_kamera": ["array"],
  "bahan_tambahan_umum": ["array"],
  "cara_buat_singkat": ["array"],
  "call_to_action": "string"
}
```

## Browser Compatibility

### Camera API Support

- ✅ Chrome 53+
- ✅ Safari 11+
- ✅ Firefox 36+
- ✅ Edge 12+

### Requirements

- HTTPS connection (or localhost for development)
- Camera permission granted by user

## Security Considerations

⚠️ **Development Setup**: API key exposed di client-side (acceptable untuk demo)

🔒 **Production Recommendations**:
1. Use API key restrictions (HTTP referrers)
2. Implement rate limiting
3. Monitor API usage
4. Consider backend proxy for API calls

## Troubleshooting

### Camera not working

- Check browser permissions
- Ensure HTTPS or localhost
- Try file upload instead

### Gemini API errors

- Verify API key is correct
- Check API quota/limits
- Ensure image size < 4MB

### No recipe returned

- Check network connection
- Verify image quality (clear, good lighting)
- Try different photo

## Future Enhancements

- [ ] Save favorite recipes
- [ ] Recipe history
- [ ] Share recipes with friends
- [ ] Custom dietary preferences
- [ ] Nutritional information
- [ ] Cooking timer integration
- [ ] Video tutorials

## License

Part of ecoBite marketplace platform.
