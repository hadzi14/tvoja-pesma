import { useState } from 'react';
import { AlertCircle, Sparkles } from 'lucide-react';

interface DetailsFormProps {
  occasion: string;
  data: Record<string, any>;
  onChange: (data: Record<string, any>) => void;
  onAIGenerate: () => void;
}

const musicStyles = [
  { id: 'sevdalinka', name: 'Sevdalinka', icon: '🎸', emoji: '🎸' },
  { id: 'pop-ballad', name: 'Pop balada', icon: '🎹', emoji: '🎹' },
  { id: 'turbo-folk', name: 'Turbo-folk', icon: '🎤', emoji: '🎤' },
  { id: 'rock', name: 'Rock', icon: '🎸', emoji: '🎸' },
  { id: 'hip-hop', name: 'Hip-hop / Rap', icon: '🧢', emoji: '🧢' },
  { id: 'narodna', name: 'Narodna', icon: '🪕', emoji: '🪕' },
  { id: 'decija', name: 'Dečija', icon: '🎈', emoji: '🎈' },
  { id: 'retro', name: 'Retro (80s/90s)', icon: '📼', emoji: '📼' },
  { id: 'electronic', name: 'Elektronska', icon: '🎛️', emoji: '🎛️' },
  { id: 'acoustic', name: 'Acoustic', icon: '🎵', emoji: '🎵' }
];

export default function DetailsForm({ occasion, data, onChange, onAIGenerate }: DetailsFormProps) {
  const [aiHelp, setAiHelp] = useState(false);

  const renderFormFields = () => {
    switch (occasion) {
      case 'birthday':
        return (
          <>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Ime osobe <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={data.recipientName || ''}
                onChange={(e) => onChange({ ...data, recipientName: e.target.value })}
                placeholder="npr. Marija, Marko, Petar"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Koliko godina? <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                value={data.age || ''}
                onChange={(e) => onChange({ ...data, age: e.target.value })}
                placeholder="npr. 30"
                min="1"
                max="120"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Odnos <span className="text-rose-500">*</span>
              </label>
              <select
                value={data.relationship || ''}
                onChange={(e) => onChange({ ...data, relationship: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all"
                required
              >
                <option value="">Izaberi odnos...</option>
                <option value="partner">Partner/Suprug(a)</option>
                <option value="closest-friend">Najbolji prijatelj/ljica</option>
                <option value="friend">Prijatelj/ljica</option>
                <option value="parent">Mama/Tata</option>
                <option value="sibling">Brat/Seestra</option>
                <option value="child">Sin/Kćerka</option>
                <option value="grandparent">Baka/Deda</option>
                <option value="colleague">Kolega/ica</option>
                <option value="other">Drugo</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                3 karakteristike osobe <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={data.characteristics || ''}
                onChange={(e) => onChange({ ...data, characteristics: e.target.value })}
                placeholder="npr. smiješna, pametna, velikodušna"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Odvoji zarezima</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Posebna uspomena ili inside joke (opciono)
              </label>
              <textarea
                value={data.specialMemory || ''}
                onChange={(e) => onChange({ ...data, specialMemory: e.target.value })}
                placeholder="npr. Zajedno smo preživele maturu..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all resize-none"
              />
            </div>
          </>
        );

      case 'apology':
        return (
          <>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Ime osobe <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={data.recipientName || ''}
                onChange={(e) => onChange({ ...data, recipientName: e.target.value })}
                placeholder="npr. Ana, Jovan"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Šta si zeznuo/la? (kratko) <span className="text-rose-500">*</span>
              </label>
              <textarea
                value={data.mistake || ''}
                onChange={(e) => onChange({ ...data, mistake: e.target.value })}
                placeholder="Opiši šta se desilo..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Koliko si iskren/na? (1-10) <span className="text-rose-500">*</span>
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={data.sincerity || 5}
                  onChange={(e) => onChange({ ...data, sincerity: e.target.value })}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-2xl font-bold text-rose-500 w-12 text-center">
                  {data.sincerity || 5}
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Parcijalno</span>
                <span>100% Iskren/na</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Ton pesme <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => onChange({ ...data, tone: 'serious' })}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    data.tone === 'serious'
                      ? 'border-rose-500 bg-rose-50 text-rose-600'
                      : 'border-gray-200 hover:border-rose-300'
                  }`}
                >
                  <div className="text-lg mb-1">😢</div>
                  <div className="text-sm font-medium">Ozbiljan i iskren</div>
                </button>
                <button
                  type="button"
                  onClick={() => onChange({ ...data, tone: 'humorous' })}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    data.tone === 'humorous'
                      ? 'border-rose-500 bg-rose-50 text-rose-600'
                      : 'border-gray-200 hover:border-rose-300'
                  }`}
                >
                  <div className="text-lg mb-1">😄</div>
                  <div className="text-sm font-medium">Lagano šaljiv</div>
                </button>
                <button
                  type="button"
                  onClick={() => onChange({ ...data, tone: 'dramatic' })}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    data.tone === 'dramatic'
                      ? 'border-rose-500 bg-rose-50 text-rose-600'
                      : 'border-gray-200 hover:border-rose-300'
                  }`}
                >
                  <div className="text-lg mb-1">🎭</div>
                  <div className="text-sm font-medium">Dramatičan</div>
                </button>
              </div>
            </div>
          </>
        );

      case 'love':
        return (
          <>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Ime osobe <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={data.recipientName || ''}
                onChange={(e) => onChange({ ...data, recipientName: e.target.value })}
                placeholder="npr. Jelena, Stefan"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Koliko dugo ste zajedno? <span className="text-gray-400">(opciono)</span>
              </label>
              <input
                type="text"
                value={data.togetherTime || ''}
                onChange={(e) => onChange({ ...data, togetherTime: e.target.value })}
                placeholder="npr. 3 godine, 6 meseci, 10 godina"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Šta ti znači? Kratko opisi <span className="text-rose-500">*</span>
              </label>
              <textarea
                value={data.meaning || ''}
                onChange={(e) => onChange({ ...data, meaning: e.target.value })}
                placeholder="npr. Ti si moja najveća podrška, ti me činiš boljim čovekom..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                3 stvari koje voliš kod nje/njega <span className="text-rose-500">*</span>
              </label>
              <textarea
                value={data.thingsILove || ''}
                onChange={(e) => onChange({ ...data, thingsILove: e.target.value })}
                placeholder="npr. njen osmeh, kako me podrzava, kako me nasmejava"
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Poseban momenat koji želiš da pomeneš <span className="text-gray-400">(opciono)</span>
              </label>
              <textarea
                value={data.specialMoment || ''}
                onChange={(e) => onChange({ ...data, specialMoment: e.target.value })}
                placeholder="npr. Kad smo se upoznali na obali..."
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all resize-none"
              />
            </div>
          </>
        );

      case 'funny':
        return (
          <>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Ime osobe <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={data.recipientName || ''}
                onChange={(e) => onChange({ ...data, recipientName: e.target.value })}
                placeholder="npr. Nemanja, Ivana"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Zašto ga/je zajebavaš? <span className="text-rose-500">*</span>
              </label>
              <textarea
                value={data.roastReason || ''}
                onChange={(e) => onChange({ ...data, roastReason: e.target.value })}
                placeholder="npr. ugojio se, ima los ukus za muziku, stalno kasni, ne zna cuvakati tajne..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Inside jokes (3-5) <span className="text-rose-500">*</span>
              </label>
              <textarea
                value={data.insideJokes || ''}
                onChange={(e) => onChange({ ...data, insideJokes: e.target.value })}
                placeholder="npr. kad je pao sa bicikla, kad je zaboravio svoje rođendan..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Koliko brutalno? (1-10) <span className="text-rose-500">*</span>
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={data.brutality || 5}
                  onChange={(e) => onChange({ ...data, brutality: e.target.value })}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-2xl font-bold text-amber-500 w-12 text-center">
                  {data.brutality || 5}
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>💛 Nekoliko šala</span>
                <span>🔥 Total roast</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Roast stil <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => onChange({ ...data, roastStyle: 'rap-diss' })}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    data.roastStyle === 'rap-diss'
                      ? 'border-rose-500 bg-rose-50 text-rose-600'
                      : 'border-gray-200 hover:border-rose-300'
                  }`}
                >
                  <div className="text-2xl mb-1">🎤</div>
                  <div className="text-sm font-medium">Rap Diss Track</div>
                </button>
                <button
                  type="button"
                  onClick={() => onChange({ ...data, roastStyle: 'cajke' })}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    data.roastStyle === 'cajke'
                      ? 'border-rose-500 bg-rose-50 text-rose-600'
                      : 'border-gray-200 hover:border-rose-300'
                  }`}
                >
                  <div className="text-2xl mb-1">🎸</div>
                  <div className="text-sm font-medium">Cajke Roast</div>
                </button>
                <button
                  type="button"
                  onClick={() => onChange({ ...data, roastStyle: 'comedy' })}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    data.roastStyle === 'comedy'
                      ? 'border-rose-500 bg-rose-50 text-rose-600'
                      : 'border-gray-200 hover:border-rose-300'
                  }`}
                >
                  <div className="text-2xl mb-1">😂</div>
                  <div className="text-sm font-medium">Comedy Song</div>
                </button>
              </div>
            </div>
          </>
        );

      case 'graduation':
      case 'parents':
      case 'wedding':
      case 'baby':
      case 'breakup':
      default:
        return (
          <>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Ime osobe <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={data.recipientName || ''}
                onChange={(e) => onChange({ ...data, recipientName: e.target.value })}
                placeholder="npr. Jelena, Stefan"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Odnos <span className="text-rose-500">*</span>
              </label>
              <select
                value={data.relationship || ''}
                onChange={(e) => onChange({ ...data, relationship: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all"
                required
              >
                <option value="">Izaberi odnos...</option>
                <option value="partner">Partner/Suprug(a)</option>
                <option value="closest-friend">Najbolji prijatelj/ljica</option>
                <option value="friend">Prijatelj/ljica</option>
                <option value="parent">Mama/Tata</option>
                <option value="sibling">Brat/Seestra</option>
                <option value="child">Sin/Kćerka</option>
                <option value="grandparent">Baka/Deda</option>
                <option value="colleague">Kolega/ica</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Šta bih da kažem? <span className="text-rose-500">*</span>
              </label>
              <textarea
                value={data.message || ''}
                onChange={(e) => onChange({ ...data, message: e.target.value })}
                placeholder="Opiši šta želiš da preneseš kroz pesmu..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Posebna uspomena (opciono)
              </label>
              <textarea
                value={data.specialMemory || ''}
                onChange={(e) => onChange({ ...data, specialMemory: e.target.value })}
                placeholder="npr. Kad smo..."
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all resize-none"
              />
            </div>
          </>
        );
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Ispričaj priču
        </h2>
        <p className="text-gray-600">
          Šta više detalja, to je pesma personalizovanija. AI će upotrebiti sve što upišeš.
        </p>
      </div>

      {/* AI Helper checkbox */}
      <div className="max-w-2xl mx-auto mb-6">
        <button
          type="button"
          onClick={() => { setAiHelp(!aiHelp); if (!aiHelp) onAIGenerate(); }}
          className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
            aiHelp 
              ? 'border-amber-400 bg-gradient-to-r from-amber-50 to-rose-50' 
              : 'border-gray-200 hover:border-amber-300'
          }`}
        >
          <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
            aiHelp 
              ? 'bg-gradient-to-r from-amber-400 to-rose-400 text-white shadow-lg' 
              : 'bg-gray-100 text-gray-500'
          }`}>
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="text-left">
            <p className="font-semibold text-gray-900">
              Nemam inspiraciju - AI neka napiše sve
            </p>
            <p className="text-sm text-gray-600">
              AI će kreirati tekst na osnovu samo imena, prilike i stila
            </p>
          </div>
        </button>
      </div>

      {!aiHelp && (
        <div className="max-w-2xl mx-auto space-y-5">
          {renderFormFields()}

          {/* Music Style Selection */}
          <div className="pt-4 border-t border-gray-200">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Muzički stil <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {musicStyles.map((style) => {
                const isSelected = data.musicStyle === style.id;
                return (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => onChange({ ...data, musicStyle: style.id })}
                    className={`
                      p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1
                      ${isSelected 
                        ? 'border-rose-500 bg-rose-50' 
                        : 'border-gray-200 hover:border-rose-300 hover:bg-rose-50/50'
                      }
                    `}
                  >
                    <span className="text-2xl">{style.emoji}</span>
                    <span className={`text-xs font-medium ${isSelected ? 'text-rose-600' : 'text-gray-700'}`}>
                      {style.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {aiHelp && (
        <div className="max-w-2xl mx-auto">
          <div className="p-6 bg-gradient-to-r from-amber-50 to-rose-50 rounded-2xl border border-amber-200">
            <div className="flex items-start gap-3">
              <Sparkles className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-gray-900 mb-2">
                  AI će generisati kompletan tekst pesme!
                </p>
                <p className="text-sm text-gray-600">
                  Na osnovu imena, prilike i muzičkog stila, AI će kreirati emotivan tekst pronalaženjem pravih reči za taj specijalan trenutak.
                </p>
              </div>
            </div>
            
            {/* Simplified form for AI mode */}
            <div className="mt-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ime osobe <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={data.recipientName || ''}
                  onChange={(e) => onChange({ ...data, recipientName: e.target.value })}
                  placeholder="npr. Marija, Marko"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Muzički stil <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {musicStyles.map((style) => {
                    const isSelected = data.musicStyle === style.id;
                    return (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => onChange({ ...data, musicStyle: style.id })}
                        className={`
                          p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1
                          ${isSelected 
                            ? 'border-rose-500 bg-rose-50' 
                            : 'border-gray-200 hover:border-rose-300 hover:bg-rose-50/50'
                          }
                        `}
                      >
                        <span className="text-2xl">{style.emoji}</span>
                        <span className={`text-xs font-medium ${isSelected ? 'text-rose-600' : 'text-gray-700'}`}>
                          {style.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info box */}
      <div className="max-w-2xl mx-auto mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-800">
          <strong>💡 Savet:</strong> Što više detalja uneseš, to će pesma biti emotivnija i personalizovanija. 
          Koristi specifične uspomene i unutarnje šale koje samo vi znate!
        </p>
      </div>
    </div>
  );
}