interface DedicationFormProps {
  packageType: string;
  data: Record<string, any>;
  onChange: (data: Record<string, any>) => void;
}

export default function DedicationForm({ packageType, data, onChange }: DedicationFormProps) {
  // Dedication is only available for Pro and Premium
  if (packageType === 'basic') {
    return (
      <div>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Dedikacija
          </h2>
          <p className="text-gray-600">
            Dodajte ličnu poruku na početak pesme - samo za Pro i Premium pakete!
          </p>
        </div>

        <div className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-2xl border border-gray-200 text-center">
          <div className="text-4xl mb-4">🔒</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Dedikacija je dostupna samo za Pro i Premium pakete
          </h3>
          <p className="text-gray-600 mb-4">
            Ugozdite nazad da biste promenili paket ako želite dodati ličnu poruku!
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-rose-100 rounded-lg text-sm text-gray-700">
            Pro i Premium uključuju dedikaciju + visokiji kvalitet
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Dodaj dedikaciju
        </h2>
        <p className="text-gray-600">
          {packageType === 'premium' 
            ? 'Napravi poklon još posebnim sa personalizovanom porukom na početku!'
            : 'Dodaj ličnu poruku koja će biti izgovorelja na početku pesme!'
          }
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Dedication Text */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Poruka za dedikaciju <span className="text-gray-400">(opciono)</span>
          </label>
          <textarea
            value={data.dedicationText || ''}
            onChange={(e) => onChange({ ...data, dedicationText: e.target.value })}
            placeholder='npr. "Ovo je za tebe, Marija, srećan 30. rođendan! Hvala što ste u mom životu."'
            rows={3}
            maxLength={200}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all resize-none"
          />
          <p className="text-xs text-gray-500 mt-1">
            Maksimum 200 karaktera. AI će preuzeti naravni glas na srpskom.
          </p>
        </div>

        {/* Examples */}
        <div className="p-4 bg-gradient-to-r from-rose-50 to-amber-50 rounded-xl border border-rose-200">
          <p className="text-sm font-semibold text-gray-900 mb-3">
            💡 Primjeri dediakcija:
          </p>
          <div className="space-y-2">
            {[
              '"Ovo je za tebe, Marija, srećan 30. rođendan! Hvala što si u mom životu."',
              '"Za najboljeg prijatelja, Marko. Više od 10 godina zajedno!"',
              '"Mami, za baš sve. Ti si moja heroina. Srećan Dan žena!"',
              '"Jovani, izvini me za sve. Volim te."'
            ].map((example, index) => (
              <button
                key={index}
                type="button"
                onClick={() => onChange({ ...data, dedicationText: example.replace(/"/g, '') })}
                className="block w-full text-left px-3 py-2 bg-white rounded-lg text-sm text-gray-700 hover:bg-white/80 transition-colors"
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        {/* Sender Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Tvoje ime (ko šalje pesmu) <span className="text-gray-400">(opciono)</span>
          </label>
          <input
            type="text"
            value={data.senderName || ''}
            onChange={(e) => onChange({ ...data, senderName: e.target.value })}
            placeholder="npr. Petar, Ana, Tvoj sin"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all"
          />
          <p className="text-xs text-gray-500 mt-1">
            Ovo ime će biti navedeno u dedikaciji i email-u
          </p>
        </div>

        {/* Voice for dedication (Premium only) */}
        {packageType === 'premium' && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Glas za dedikaciju
            </label>
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: 'male', name: 'Muški glas', icon: '🎤' },
                { id: 'female', name: 'Ženski glas', icon: '🎵' }
              ].map((option) => {
                const isSelected = data.dedicationVoice === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => onChange({ ...data, dedicationVoice: option.id })}
                    className={`
                      p-4 rounded-xl border-2 transition-all flex items-center gap-3
                      ${isSelected 
                        ? 'border-rose-500 bg-rose-50' 
                        : 'border-gray-200 hover:border-rose-300 hover:bg-rose-50/50'
                      }
                    `}
                  >
                    <span className="text-2xl">{option.icon}</span>
                    <span className={`font-semibold ${isSelected ? 'text-rose-600' : 'text-gray-800'}`}>
                      {option.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Skip option */}
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
          <input
            type="checkbox"
            id="skip-dedication"
            checked={data.skipDedication || false}
            onChange={(e) => onChange({ ...data, skipDedication: e.target.checked })}
            className="w-5 h-5 rounded border-gray-300 text-rose-500 focus:ring-rose-500"
          />
          <label htmlFor="skip-dedication" className="text-sm text-gray-700">
            Preskoči dedikaciju - direkt na pesmu
          </label>
        </div>

        {/* Premium features highlight */}
        {packageType === 'premium' && (
          <div className="p-4 bg-gradient-to-r from-amber-100 to-rose-100 rounded-xl border border-amber-300">
            <p className="text-sm font-semibold text-gray-900 mb-2">
              🎁 Premium paket dodatno uključuje:
            </p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Video sa lirikom (MP4 format)</li>
              <li>• Profesionalni mastering (studio kvalitet)</li>
              <li>• 1 besplatna revizija ako nisi zadovoljan</li>
              <li>• Prioritetna generacija (1-2 minuta)</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}