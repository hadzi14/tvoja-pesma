import { Check, Music2, Clock, Download } from 'lucide-react';

interface ReviewStepProps {
  data: Record<string, any>;
  packageType: string;
  onBack: () => void;
  onPay: () => void;
}

const occasionNames: Record<string, string> = {
  'birthday': 'Rođendan',
  'anniversary': 'Godišjnica / Veridba',
  'love': 'Ljubavna poruka',
  'apology': 'Izvinjenje',
  'graduation': 'Diplomiranje / Uspeh',
  'parents': 'Majčin / Očev dan',
  'wedding': 'Venčanje',
  'baby': 'Rođenje deteta',
  'breakup': 'Raskid',
  'funny': 'Šaljiva pesma (Roast)'
};

const musicStyleNames: Record<string, string> = {
  'sevdalinka': 'Sevdalinka',
  'pop-ballad': 'Pop balada',
  'turbo-folk': 'Turbo-folk',
  'rock': 'Rock',
  'hip-hop': 'Hip-hop / Rap',
  'narodna': 'Narodna',
  'decija': 'Dečija',
  'retro': 'Retro (80s/90s)',
  'electronic': 'Elektronska',
  'acoustic': 'Acoustic'
};

const voiceTypeNames: Record<string, string> = {
  'male-deep': 'Muška duboki',
  'male-high': 'Muški visoki',
  'female-soft': 'Ženski nežan',
  'female-strong': 'Ženski snažan',
  'child': 'Dečiji glas',
  'duet': 'Duet (M + Ž)'
};

const tempoNames: Record<string, string> = {
  'slow': 'Sporo (balada)',
  'medium': 'Srednje',
  'fast': 'Brzo (energična)'
};

const moodNames: Record<string, string> = {
  'emotional': 'Emotivno',
  'happy': 'Srećno',
  'energetic': 'Energično',
  'calm': 'Mirno',
  'romantic': 'Romantično',
  'nostalgic': 'Nostalgično',
  'epic': 'Epski',
  'playful': 'Igraljivo'
};

const packagePrices: Record<string, number> = {
  'basic': 4.99,
  'pro': 7.99,
  'premium': 9.99
};

export default function ReviewStep({ data, packageType, onBack, onPay }: ReviewStepProps) {
  const totalPrice = packagePrices[packageType] || 4.99;
  
  const packageFeatures: Record<string, string[]> = {
    'basic': [
      'Pesma do 2 minuta',
      '1 muzički stil',
      'MP3 + tekst (PDF)',
      'Standardni kvalitet'
    ],
    'pro': [
      'Pesma do 3 minuta',
      'Bilo koji stil',
      'Cover art',
      'Dedikacija',
      'Visoki audio kvalitet'
    ],
    'premium': [
      'Pesma do 4 minuta',
      'Miksani stilovi',
      'Video sa lirikom',
      'Profesionalni remaster',
      '1 revizija uključena'
    ]
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Proveri sve pre plaćanja
        </h2>
        <p className="text-gray-600">
          Pesma kreće u generaciju odmah nakon plaćanja. Gotovo za ~3 minuta!
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Summary Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Recipient Info */}
          <div className="bg-gradient-to-br from-rose-50 to-amber-50 rounded-2xl p-6 border border-rose-200">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Music2 className="w-5 h-5 text-rose-500" />
              Osnovno
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Za:</span>
                <span className="font-semibold text-gray-900">{data.recipientName || 'Nije upisano'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Prilika:</span>
                <span className="font-semibold text-gray-900">{occasionNames[data.occasion] || data.occasion}</span>
              </div>
              {data.age && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Godine:</span>
                  <span className="font-semibold text-gray-900">{data.age}</span>
                </div>
              )}
              {data.relationship && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Odnos:</span>
                  <span className="font-semibold text-gray-900">{data.relationship}</span>
                </div>
              )}
            </div>
          </div>

          {/* Music Details */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Music2 className="w-5 h-5 text-blue-500" />
              Muzika
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Stil:</span>
                <span className="font-semibold text-gray-900">{musicStyleNames[data.musicStyle] || data.musicStyle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Glas:</span>
                <span className="font-semibold text-gray-900">{voiceTypeNames[data.voiceType] || data.voiceType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tempo:</span>
                <span className="font-semibold text-gray-900">{tempoNames[data.tempo] || data.tempo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Raspoloženje:</span>
                <span className="font-semibold text-gray-900">{moodNames[data.mood] || data.mood}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Details */}
        {data.aiHelp ? (
          <div className="bg-gradient-to-r from-amber-100 to-amber-100 rounded-2xl p-6 border border-amber-300">
            <h3 className="font-semibold text-gray-900 mb-3">✨ AI je piše tekst</h3>
            <p className="text-sm text-gray-700">
              AI će generisati originalni tekst na osnovu imena "<strong>{data.recipientName}</strong>" 
              i prilike "<strong>{occasionNames[data.occasion]}</strong>".
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">💭 Detalji priče</h3>
            <div className="space-y-2 text-sm">
              {data.characteristics && (
                <div>
                  <span className="text-gray-600">Karakteristike:</span>
                  <span className="text-gray-900 ml-2">{data.characteristics}</span>
                </div>
              )}
              {data.mistake && (
                <div>
                  <span className="text-gray-600">Šta je zeznuto:</span>
                  <span className="text-gray-900 ml-2">{data.mistake}</span>
                </div>
              )}
              {data.meaning && (
                <div>
                  <span className="text-gray-600">Šta ti znači:</span>
                  <span className="text-gray-900 ml-2">{data.meaning}</span>
                </div>
              )}
              {data.roastReason && (
                <div>
                  <span className="text-gray-600">Razlog za roast:</span>
                  <span className="text-gray-900 ml-2">{data.roastReason}</span>
                </div>
              )}
              {data.thingsILove && (
                <div>
                  <span className="text-gray-600">Šta voliš:</span>
                  <span className="text-gray-900 ml-2">{data.thingsILove}</span>
                </div>
              )}
              {data.specialMemory && (
                <div>
                  <span className="text-gray-600">Posebna uspomena:</span>
                  <span className="text-gray-900 ml-2">{data.specialMemory}</span>
                </div>
              )}
              {data.message && (
                <div>
                  <span className="text-gray-600">Poruka:</span>
                  <span className="text-gray-900 ml-2">{data.message}</span>
                </div>
              )}
              {data.tone && (
                <div>
                  <span className="text-gray-600">Ton:</span>
                  <span className="text-gray-900 ml-2">
                    {data.tone === 'serious' ? 'Ozbiljan i iskren' : 
                     data.tone === 'humorous' ? 'Šaljiv' : 'Dramatičan'}
                  </span>
                </div>
              )}
              {(data.sincerity || data.brutality) && (
                <div>
                  <span className="text-gray-600">Intenzitet:</span>
                  <span className="text-gray-900 ml-2">{
                    data.sincerity ? `${data.sincerity}/10 (iskrenost)` : 
                    data.brutality ? `${data.brutality}/10 (brutalnost)` : ''
                  }</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Dedication */}
        {packageType !== 'basic' && !data.skipDedication && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Music2 className="w-5 h-5 text-purple-500" />
              Dedikacija
            </h3>
            <div className="space-y-2 text-sm">
              {data.dedicationText && (
                <div>
                  <span className="text-gray-600">Poruka:</span>
                  <p className="text-gray-900 mt-1 italic">"{data.dedicationText}"</p>
                </div>
              )}
              {data.senderName && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Šalje:</span>
                  <span className="font-semibold text-gray-900">{data.senderName}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* What You'll Get */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Check className="w-5 h-5 text-green-500" />
            Šta dobijaš ({packageType.toUpperCase()} paket)
          </h3>
          <ul className="space-y-2">
            {packageFeatures[packageType]?.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Delivery Info */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 flex items-start gap-4">
          <div className="flex-shrink-0">
            <Clock className="w-6 h-6 text-green-500" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">
              Gotovo za 3 minuta
            </h3>
            <p className="text-sm text-gray-700">
              Nakon plaćanja, AI je krenula u generaciju pesme. Za 2-3 minuta 
              dobićeš email sa MP3, PDF tekstom, a za Premium i video sa lirikom.
            </p>
          </div>
        </div>

        {/* Price & Pay */}
        <div className="bg-gradient-to-r from-rose-500 to-amber-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/80 text-sm">Ukupno za plaćanje</p>
              <p className="text-4xl font-bold">€{totalPrice.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className="text-white/80 text-sm mb-1">Sigurna plaćanje preko</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔐</span>
                <span className="font-semibold">Paddle</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={onBack}
              className="flex-1 py-3 px-6 bg-white/20 hover:bg-white/30 rounded-xl font-semibold transition-all"
            >
              Nazad
            </button>
            <button
              onClick={onPay}
              className="flex-1 py-3 px-6 bg-white text-rose-600 rounded-xl font-semibold hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              PLATI I KREIRAJ PESMU
            </button>
          </div>

          <p className="text-xs text-white/80 text-center mt-4">
            Do 30 dana možete skinuti fajlove. Snimite ih i čuvajte! 💾
          </p>
        </div>

        {/* Contact Email (for demo) */}
        <div className="text-center p-4 bg-gray-100 rounded-xl">
          <p className="text-sm text-gray-600">
            Za demo: unesi email <span className="font-mono">demo@pesmazgatebe.com</span>
          </p>
        </div>
      </div>
    </div>
  );
}