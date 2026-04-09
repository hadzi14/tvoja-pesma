# Pesma Za Tebe - Backend DEL 1

## ✅ Completed in DEL 1

### 📁 Files Created

| File | Description | Status |
|------|-------------|--------|
| `src/lib/db.ts` | Database client & Schema interfaces | ✅ |
| `src/lib/ai.ts` | AI Services (ChatGPT + Suno AI) | ✅ |
| `src/lib/pdf.ts` | PDF Generator utilities | ✅ |
| `.env.example` | Environment variables template | ✅ |
| `BACKEND_README.md` | This file | ✅ |

---

## 📚 Database Schema (Supabase)

### Required Tables

Run these SQL queries in your Supabase SQL Editor:

```sql
-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  first_purchase_at TIMESTAMP WITH TIME ZONE,
  total_songs INTEGER DEFAULT 0,
  total_spent DECIMAL DEFAULT 0
);

-- Songs table
CREATE TABLE IF NOT EXISTS songs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email TEXT REFERENCES users(email),
  recipient_name TEXT NOT NULL,
  recipient_email TEXT,
  occasion TEXT NOT NULL,
  relationship TEXT,
  music_style TEXT NOT NULL,
  voice_type TEXT,
  tempo TEXT,
  instruments TEXT[],
  lyrics_text TEXT NOT NULL,
  prompt_used TEXT,
  audio_url TEXT NOT NULL,
  cover_art_url TEXT,
  pdf_url TEXT,
  video_url TEXT,
  lyrics_video_url TEXT,
  duration INTEGER NOT NULL,
  package TEXT NOT NULL CHECK (package IN ('basic', 'pro', 'premium')),
  price DECIMAL NOT NULL,
  has_dedication BOOLEAN DEFAULT false,
  dedication_text TEXT,
  ai_generate_lyrics BOOLEAN DEFAULT false,
  ai_cost DECIMAL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'generating' CHECK (status IN ('generating', 'completed', 'failed')),
  error_message TEXT,
  generated_at TIMESTAMP WITH TIME ZONE,
  paddle_transaction_id TEXT UNIQUE,
  add_ons TEXT[],
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Purchases table
CREATE TABLE IF NOT EXISTS purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  song_id UUID NOT NULL REFERENCES songs(id),
  user_email TEXT NOT NULL,
  amount DECIMAL NOT NULL,
  currency TEXT DEFAULT 'EUR',
  paddle_transaction_id TEXT UNIQUE NOT NULL,
  paddle_checkout_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'refunded')),
  refunded_at TIMESTAMP WITH TIME ZONE,
  purchased_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_songs_user_email ON songs(user_email);
CREATE INDEX IF NOT EXISTS idx_songs_status ON songs(status);
CREATE INDEX IF NOT EXISTS idx_songs_created_at ON songs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_purchases_status ON purchases(status);
CREATE INDEX IF NOT EXISTS idx_purchases_user_email ON purchases(user_email);
```

---

## 🤖 AI Services

### Generate Lyrics (ChatGPT-4o-mini)

```typescript
import { generateLyrics } from './lib/ai';
import { GenerateLyricsInput } from './lib/ai';

const input: GenerateLyricsInput = {
  occasion: 'rođendan',
  recipientName: 'Marija',
  details: {
    name: 'Marija',
    age: 30,
    relationship: 'najbolja prijateljica',
    characteristics: 'smiješna, pametna, velikodušna',
    specialMemory: 'zajedno smo preživele maturu',
  },
  musicStyle: 'pop-balada',
  tone: 'emotivan ali veseo',
  duration: 120,
  package: 'pro',
};

const lyrics = await generateLyrics(input);
console.log(lyrics); // The generated lyrics
```

### Generate Song (Suno AI)

```typescript
import { generateSong } from './lib/ai';
import { GenerateSongInput } from './lib/ai';

const input: GenerateSongInput = {
  lyrics: lyrics, // From ChatGPT
  musicStyle: 'pop-balada',
  voice: 'female-soft',
  tempo: 'medium',
  instruments: ['piano', 'strings'],
  duration: 120,
  recipientName: 'Marija',
  occasion: 'rođendan',
};

const song = await generateSong(input);
console.log(song);
// {
//   audioUrl: '/demo-audio.mp3',
//   coverArtUrl: '/images/demo-cover.jpg',
//   duration: 120,
//   lyrics: lyrics,
//   metadata: { ... }
// }
```

### Music Styles Available

| Style | Genre | Mood | Voice |
|-------|-------|------|-------|
| `sevdalinka` | Traditional, Balkan | Emotional, Nostalgic | Female soft or Male deep |
| `pop-balada` | Pop, Ballad | Emotional, Romantic | Female soft or Male gentle |
| `turbo-folk` | Turbo-folk, Pop-folk | Energetic, Party | Female powerful or Male energetic |
| `rock` | Rock, Alternative | Energetic, Raw | Male raspy or Female powerful |
| `hip-hop` | Hip-hop, Rap, Trap | Confident, Rhythmic | Male rap flow |
| `narodna` | Folk, Traditional | Emotional, Warm | Female or Male traditional |
| `decija` | Children, Playful | Happy, Cheerful | Child cute or Female bright |
| `retro` | Synth-pop, 80s/90s | Nostalgic, Fun | Male retro or Female 80s |
| `elektronska` | EDM, Electronic | Energetic, Modern | Female ethereal |
| `acoustic` | Acoustic, Guitar | Intimate, Warm | Male gentle or Female soft |

### Voice Types Available

| ID | Name | Style |
|----|------|-------|
| `male-deep` | Muški duboki | Male, deep, warm, baritone |
| `male-high` | Muški visoki | Male, tenor, bright |
| `female-soft` | Ženski nežan | Female, soft, gentle, sweet |
| `female-strong` | Ženski snažan | Female, powerful, soulful |
| `child` | Dečiji | Child, cute, playful |
| `duet` | Duet | Male and female duet, harmonies |

---

## 📄 PDF Generator

```typescript
import { generatePDF, downloadPDF, generatePDFFilename } from './lib/pdf';
import { PDFData } from './lib/pdf';

const data: PDFData = {
  recipientName: 'Marija',
  occasion: 'rođendan',
  package: 'pro',
  lyrics: lyrics, // Generated lyrics
  musicStyle: 'pop-balada',
  generatedAt: new Date(),
  coverArtUrl: '/images/demo-cover.jpg',
  dedicationText: 'Ovo je za tebe, Marija, srećan 30. rođendan!',
};

// Generate PDF
const pdfBlob = await generatePDF(data);

// Download PDF
const filename = generatePDFFilename('Marija', 'rođendan');
downloadPDF(pdfBlob, filename);
```

---

## 🗄️ Database Functions

### Song Operations

```typescript
import { createSong, updateSong, getSong, getSongsByEmail } from './lib/db';

// Create a new song (status: 'generating')
const newSong = await createSong({
  user_email: 'user@example.com',
  recipient_name: 'Marija',
  occasion: 'rođendan',
  music_style: 'pop-balada',
  lyrics_text: lyrics,
  audio_url: '',
  duration: 120,
  package: 'pro',
  price: 7.99,
  ai_cost: 0.50,
});

// Update song after generation
const updatedSong = await updateSong(song.id, {
  status: 'completed',
  audio_url: 'https://...',
  cover_art_url: 'https://...',
  pdf_url: 'https://...',
  generated_at: new Date(),
});

// Get song by ID
const song = await getSong(songId);

// Get all songs for a user
const songs = await getSongsByEmail('user@example.com');
```

### Purchase Operations

```typescript
import { createPurchase } from './lib/db';

const purchase = await createPurchase({
  song_id: song.id,
  user_email: 'user@example.com',
  amount: 7.99,
  currency: 'EUR',
  paddle_transaction_id: 'txn_...',
  paddle_checkout_id: 'chk_...',
  status: 'completed',
});
```

### Analytics

```typescript
import { getSongAnalytics } from './lib/db';

const analytics = await getSongAnalytics();
console.log(analytics);
// {
//   total_songs: 387,
//   songs_this_week: 24,
//   songs_this_month: 87,
//   total_revenue: 2845.50,
//   revenue_this_month: 678.00,
//   popular_occasions: [{ occasion: 'rođendan', count: 45 }, ...],
//   popular_styles: [{ style: 'pop-balada', count: 30 }, ...],
//   package_distribution: [{ package: 'pro', count: 20 }, ...],
// }
```

---

## 🔧 Utility Functions

```typescript
import {
  estimateGenerationTime,
  calculateAICost,
  musicStyles,
  voiceTypes
} from './lib/ai';

// Estimate generation time (in seconds)
const time = estimateGenerationTime(120, 'premium');
// 90 seconds (1.5 minutes)

// Calculate AI cost
const cost = calculateAICost('pro', 120, true);
// 0.68 (lyrics: 0.01 + song: 0.50 + dedication: 0.05 + cover: 0.02)
```

---

## 🚀 Setup Instructions

### 1. Supabase Setup

1. Go to https://supabase.com
2. Create a new project
3. Copy `Project URL` → `VITE_SUPABASE_URL`
4. Copy `anon public key` → `VITE_SUPABASE_ANON_KEY`
5. Copy `service_role key` → `SUPABASE_SERVICE_ROLE_KEY`
6. Run SQL queries in Supabase SQL Editor (see above)

### 2. Environment Variables

```bash
# Copy .env.example to .env.local
cp .env.example .env.local

# Fill in your actual values
nano .env.local
```

### 3. Install Dependencies

```bash
npm install

# Already installed:
# - @supabase/supabase-js
```

### 4. Test Database Connection

```typescript
import { supabase } from './lib/db';

const { data, error } = await supabase.from('users').select('count');
console.log('Database connected:', !error);
```

---

## 📊 What's Next (DEL 2)

In DEL 2, we'll create:

- ✅ `/api/generate-song` - Main API route (ChatGPT + Suno AI)
- ✅ `/api/webhooks/paddle` - Payment webhook handler
- ✅ `/api/download/[id]` - Download route with validation

---