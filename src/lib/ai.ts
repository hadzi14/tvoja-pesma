// AI Services - ChatGPT for lyrics, Suno AI for music generation
// Replace these with actual API calls in production

export interface MusicStyle {
  id: string;
  name: string;
  genres: string[];
  mood: string;
  voice: string;
}

export interface GenerateLyricsInput {
  occasion: string;
  recipientName: string;
  details: Record<string, any>;
  musicStyle: string;
  tone?: string;
  duration?: number; // seconds
  package: 'basic' | 'pro' | 'premium';
}

export interface GenerateSongInput {
  lyrics: string;
  musicStyle: string;
  voice?: string;
  tempo?: string;
  instruments?: string[];
  duration: number;
  recipientName: string;
  occasion: string;
}

export interface GeneratedSong {
  audioUrl: string;
  coverArtUrl?: string;
  duration: number;
  lyrics: string;
  metadata: {
    style: string;
    voice: string;
    generatedAt: string;
  };
}

// Music styles configuration
export const musicStyles: Record<string, MusicStyle> = {
  sevdalinka: {
    id: 'sevdalinka',
    name: 'Sevdalinka',
    genres: ['sevdalinka', 'traditional', 'balkan'],
    mood: 'emotional, nostalgic, melancholic',
    voice: 'female, soft, traditional or male, deep, traditional',
  },
  'pop-balada': {
    id: 'pop-balada',
    name: 'Pop Balada',
    genres: ['pop', 'ballad', 'contemporary'],
    mood: 'emotional, romantic, heartfelt',
    voice: 'female, soft, contemporary or male, gentle',
  },
  'turbo-folk': {
    id: 'turbo-folk',
    name: 'Turbo-folk',
    genres: ['turbo-folk', 'pop-folk', 'balkan'],
    mood: 'energetic, party, emotional',
    voice: 'female, powerful or male, energetic',
  },
  rock: {
    id: 'rock',
    name: 'Rock',
    genres: ['rock', 'alternative', 'indie'],
    mood: 'energetic, raw, passionate',
    voice: 'male, raspy or female, powerful',
  },
  'hip-hop': {
    id: 'hip-hop',
    name: 'Hip-hop / Rap',
    genres: ['hip-hop', 'rap', 'trap'],
    mood: 'confident, rhythmic, storytelling',
    voice: 'male, rhythmic, rap flow',
  },
  narodna: {
    id: 'narodna',
    name: 'Narodna',
    genres: ['narodna', 'folk', 'traditional'],
    mood: 'emotional, warm, celebratory',
    voice: 'female, traditional or male, folk',
  },
  decija: {
    id: 'decija',
    name: 'Dečija',
    genres: ['children', 'playful', 'educational'],
    mood: 'happy, playful, cheerful',
    voice: 'child, cute or female, bright',
  },
  retro: {
    id: 'retro',
    name: 'Retro (80s/90s)',
    genres: ['synth-pop', 'retro', '80s', '90s'],
    mood: 'nostalgic, fun, dance',
    voice: 'male, retro or female, 80s style',
  },
  elektronska: {
    id: 'elektronska',
    name: 'Elektronska',
    genres: [' EDM', 'electronic', 'dance'],
    mood: 'energetic, uplifting, modern',
    voice: 'female, ethereal or processed vocals',
  },
  acoustic: {
    id: 'acoustic',
    name: 'Acoustic / Gitara',
    genres: ['acoustic', 'singer-songwriter', 'indie'],
    mood: 'intimate, warm, sentimental',
    voice: 'male, gentle acoustic or female, soft',
  },
};

// Voice types
export const voiceTypes = {
  'male-deep': { name: 'Muški duboki', style: 'male, deep, warm, baritone' },
  'male-high': { name: 'Muški visoki', style: 'male, tenor, bright' },
  'female-soft': { name: 'Ženski nežan', style: 'female, soft, gentle, sweet' },
  'female-strong': { name: 'Ženski snažan', style: 'female, powerful, soulful' },
  'child': { name: 'Dečiji', style: 'child, cute, playful' },
  'duet': { name: 'Duet', style: 'male and female duet, harmonies' },
};

// Build ChatGPT prompt for lyrics generation
export function buildLyricsPrompt(input: GenerateLyricsInput): string {
  const { occasion, recipientName, details, musicStyle, tone = 'emotivan', duration = 120 } = input;
  const style = musicStyles[musicStyle] || musicStyles['pop-balada'];

  // Calculate number of verses based on duration
  const versesPerSecond = 6; // seconds per verse
  const totalVerses = Math.ceil(duration / versesPerSecond);

  let prompt = `Napiši tekst pesme na srpskom/hrvatskom/bosanskom jeziku za:\n\n`;

  for (const [key, value] of Object.entries(details)) {
    const label = formatKey(key);
    if (value) {
      prompt += `${label}: ${value}\n`;
    }
  }

  prompt += `Prilika: ${occasion}\n`;
  prompt += `Ime: ${recipientName}\n`;
  prompt += `Muzički stil: ${style.name}\n`;
  prompt += `Ton: ${tone}\n`;
  prompt += `Dužina: ${duration} sekundi (oko ${totalVerses} stihova)\n\n`;
  prompt += `VAŽNO:\n`;
  prompt += `- Koristi prirodan balkanski jezik\n`;
  prompt += `- Rime gde god ima smisla, ali ne forsiraj\n`;
  prompt += `- Refren koji se lako pamti i ponavlja 2-3 puta\n`;
  prompt += `- 2-3 strofe + most (bridge)\n`;
  prompt += `- Emotivan ali ne pretenciozan\n`;
  prompt += `- Bez kliše fraza osim ako ne pasuje\n\n`;
  prompt += `Format:\n`;
  prompt += `[Strofa 1]\n...\n\n`;
  prompt += `[Refren]\n...\n\n`;
  prompt += `[Strofa 2]\n...\n\n`;
  prompt += `[Refren]\n\n`;
  prompt += `[Most]\n...\n\n`;
  prompt += `[Refren - Outro]\n...\n\n`;
  prompt += `Napiši pesmu koja će ${recipientName} naježiti i rasplakati od sreće.`;

  return prompt;
}

// Format key for display
function formatKey(key: string): string {
  const keyMap: Record<string, string> = {
    name: 'Ime osobe',
    age: 'Starost',
    years: 'Koliko godina',
    relationship: 'Odnos',
    characteristics: 'Karakteristike',
    specialMemory: 'Posebna uspomena',
    whatHappened: 'Šta si zeznuo/la',
    sincerity: 'Iskrenost (1-10)',
    tone: 'Ton',
    duration: 'Koliko dugo zajedno',
    meaning: 'Šta znači',
    thingsYouLove: '3 stvari koje voliš',
    specialMoment: 'Posebni momenat',
    whatGraduated: 'Šta je završavao',
    achievements: 'Uspjesi',
    wishes: 'Želje',
    role: 'Uloga',
    thingsToRemember: '3 stvari',
    specialMemories: 'Uspomene',
    coupleName: 'Ime para',
    date: 'Kada',
    location: 'Gde',
    futureWishes: 'Želje za budućnost',
    babyName: 'Ime bebe',
    parents: 'Imena roditelja',
    family: 'Porodica',
    reasonForRoast: 'Zašto zajebavaš',
    insideJokes: 'Inside jokes',
    brutality: 'Koliko brutalno (1-10)',
    roastStyle: 'Stil roasta',
  };
  return keyMap[key] || key;
}

// Simulate ChatGPT API call (replace with actual API call in production)
export async function generateLyrics(input: GenerateLyricsInput): Promise<string> {
  try {
    const prompt = buildLyricsPrompt(input);

    // TODO: Replace with actual OpenAI API call
    // const response = await fetch('https://api.openai.com/v1/chat/completions', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    //   },
    //   body: JSON.stringify({
    //     model: 'gpt-4o-mini',
    //     messages: [{ role: 'user', content: prompt }],
    //     max_tokens: 1000,
    //     temperature: 0.8,
    //   }),
    // });
    // const data = await response.json();
    // return data.choices[0].message.content;

    // Mock response for development
    console.log('[AI] Generating lyrics with prompt:', prompt.substring(0, 200) + '...');

    return await mockGenerateLyrics(input);
  } catch (error) {
    console.error('[AI] Failed to generate lyrics:', error);
    throw new Error('Failed to generate lyrics. Please try again.');
  }
}

// Mock lyrics generation (for development)
async function mockGenerateLyrics(input: GenerateLyricsInput): Promise<string> {
  const { recipientName, occasion } = input;

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const templates: Record<string, string> = {
    rođendan: `[Strofa 1]
${recipientName}, još jedan dan prošao je
Rođendan tvoj, to danas slavimo
Svake godine sve lepše te vidim
I to mi srce puno vrelo'ma

[Refren]
Srećan rođendan, ${recipientName}!
Neka ti svi snovi se ostvare
Neka ti život pun je srećanja
I da ti ljubav uvek je tu!

[Strofa 2]
Ti si osoba koja meni znači
Prijatelj, partner, sve u jednom
Zahvalan sam što te imam
Te dane zajedno dragam se

[Refren]
Srećan rođendan, ${recipientName}!
Neka ti svi snovi se ostvare
Neka ti život pun je srećanja
I da ti ljubav uvek je tu!

[Most]
Godine prolaze, a ti ostaješ
Isto toliko lepa i dobra
${recipientName}, ti si inspiracija
Za sve nas koji te poznajemo

[Refren - Outro]
Srećan rođendan,${recipientName}!
Neka ti život bude prepun!
Sve najbolje, ti to značiš!
Srećan rođendan!`,

    izvinjenje: `[Strofa 1]
${input.details.name || 'Draga'}, znam da sam dobro zaznuo
Neko se to više ne može ni opisati
Te reči izrečene u tuđini
Sada mi žao što sam te time povredio

[Refren]
${input.details.name || 'Draga'}, izvini!
Neznam šta mi to što kažem
Želim ti sve da istinu doživim
A ti znaš da si mi najvažnija

[Strofa 2]
Kada fakao to što radim, to nije ja to
Riječi su uletile, i mi smo tu živeli
Sada želim da vratim taj dan
I zaboravim sve to što se desilo

[Refren]
${input.details.name || 'Draga'}, izvini!
Neznam šta mi to što kažem
Želim ti sve da istinu doživim
A ti znaš da si mi najvažnija

[Most]
Molim te, daj mi još šansu
Da ti dokažu da si moj sviđom to
${input.details.name || 'Draga'}, biće sve drugačije
Od danas sam drugačiji

[Refren - Outro]
${input.details.name || 'Draga'}, izvini!
Neznam šta mi to što kažem
Želim ti sve da istinu doživim
A ti znaš da si mi najvažnija
Ljubim te više nego ikad...`,

    default: `[Strofa 1]
${recipientName}, pesma ova je za tebe
Reči koje tebe do dna dodiruju
Svaki stih ispunjen je srcem
Jer si ti ta koja svetlo meni ručuje

[Refren]
Za tebe, ${recipientName}, ova pesma znači
Sve ono što ti srce kažete
Ljubav, ponos, još svaki osjećaj
Vrijednost što ti mi ovaj dan daruje

[Strofa 2]
Svaki trenutak s tobama je dar
Svaki trenutak s tobom čuvam
Hvala ti što u mom životu si
Ti si moje sve, dušo moja!

[Refren]
Za tebe, ${recipientName}, ova pesma znači
Sve ono što ti srce kažete
Ljubav, ponos, još svaki osjećaj
Vrijednost što ti mi ovaj dan daruje

[Most]
Budala da zna koliko te volim
Riječi nedovoljuju da to dokažu
${recipientName}, ti moj sreća
Sve sto imam, to ti daje

[Refren - Outro]
Za tebe, ${recipientName}, ova pesma znači
Sve ono što ti srce kažete
Ljubav, ponos, još svaki osjećaj
Vrijednost što ti mi ovaj dan daruje
Tebe volim više nego ikad!`,
  };

  return templates[occasion.toLowerCase() as keyof typeof templates] || templates.default;
}

// Build Suno AI prompt for song generation
export function buildSunoPrompt(input: GenerateSongInput): string {
  const { lyrics, musicStyle, voice = 'female-soft', tempo = 'medium', instruments = [], duration } = input;
  const styleConfig = musicStyles[musicStyle] || musicStyles['pop-balada'];
  const voiceConfig = voiceTypes[voice as keyof typeof voiceTypes] || voiceTypes['female-soft'];

  const tempoMap: Record<string, string> = {
    slow: 'slow tempo, 60-80 BPM',
    medium: 'moderate tempo, 90-120 BPM',
    fast: 'fast tempo, 130-160 BPM',
  };

  const instrumentDescriptions = instruments.length > 0
    ? `instruments: ${instruments.join(', ')}`
    : '';

  const prompt = [
    styleConfig.genres.join(', '),
    styleConfig.mood,
    `${tempoMap[tempo]}`,
    voiceConfig.style,
    `Lyrics: ${lyrics.substring(0, 500)}...`,
    instrumentDescriptions,
    `song about ${input.recipientName}, ${input.occasion}`,
  ].filter(Boolean).join(', ');

  // Silence unused variable warning
  void duration;

  return prompt;
}

// Simulate Suno AI API call (replace with actual API call in production)
export async function generateSong(input: GenerateSongInput): Promise<GeneratedSong> {
  try {
    const prompt = buildSunoPrompt(input);

    // TODO: Replace with actual Suno AI API call
    // const response = await fetch('https://api.suno.ai/v1/generate', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${process.env.SUNO_API_KEY}`,
    //   },
    //   body: JSON.stringify({
    //     prompt,
    //     lyrics: input.lyrics,
    //     style: input.musicStyle,
    //     duration: input.duration,
    //     instrumental: false,
    //   }),
    // });
    // const data = await response.json();
    // return {
    //   audioUrl: data.audio_url,
    //   coverArtUrl: data.cover_art_url,
    //   duration: data.duration,
    //   lyrics: input.lyrics,
    //   metadata: data.metadata,
    // };

    console.log('[AI] Generating song with prompt:', prompt.substring(0, 200) + '...');

    // Simulate API delay (longer for realism)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock response for development
    return {
      audioUrl: '/demo-audio.mp3',
      coverArtUrl: '/images/demo-cover.jpg',
      duration: input.duration,
      lyrics: input.lyrics,
      metadata: {
        style: input.musicStyle ?? '',
        voice: input.voice ?? '',
        generatedAt: new Date().toISOString(),
      },
    };
  } catch (error) {
    console.error('[AI] Failed to generate song:', error);
    throw new Error('Failed to generate song. Please try again.');
  }
}

// Calculate estimated generation time
export function estimateGenerationTime(duration: number, packageType: 'basic' | 'pro' | 'premium'): number {
  // Base time + audio generation time
  const baseTime = 30; // seconds for API overhead
  const audioTime = duration * 0.5; // 0.5 seconds per second of audio

  let multiplier = 1;
  if (packageType === 'pro') multiplier = 1.2;
  if (packageType === 'premium') multiplier = 1.5;

  return Math.ceil(baseTime + audioTime * multiplier);
}

// Calculate AI cost
export function calculateAICost(
  packageType: 'basic' | 'pro' | 'premium',
  duration: number,
  hasDedication: boolean
): number {
  // GPT-4o-mini: ~$0.01 per request
  const lyricsCost = 0.01;

  // Suno AI: ~$0.50 per song (subscription)
  // Longer songs cost more
  const durationMultiplier = Math.max(1, Math.ceil(duration / 60)); // per minute
  const songCost = 0.50 * durationMultiplier;

  // Extra for dedication (ElevenLabs): ~$0.05
  const dedicationCost = hasDedication ? 0.05 : 0;

  // Premium extra (video generation): ~$0.10
  const videoCost = packageType === 'premium' ? 0.10 : 0;

  // Pro extra (cover art): ~$0.02
  const coverArtCost = packageType === 'pro' || packageType === 'premium' ? 0.02 : 0;

  return lyricsCost + songCost + dedicationCost + videoCost + coverArtCost;
}