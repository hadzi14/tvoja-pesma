interface MusicDetailsFormProps {
  data: Record<string, any>;
  onChange: (data: Record<string, any>) => void;
}

const voiceTypes = [
  { id: 'male-deep', name: 'Muški duboki', icon: '🎤', description: 'Dubok, moćan glas' },
  { id: 'male-high', name: 'Muški visoki', icon: '🎤', description: 'Viši, melanholičniji glas' },
  { id: 'female-soft', name: 'Ženski nežan', icon: '🎵', description: 'Mekan, topliji glas' },
  { id: 'female-strong', name: 'Ženski snažan', icon: '🎵', description: 'Snažan, empatičan glas' },
  { id: 'child', name: 'Dečiji glas', icon: '👶', description: 'Za dečije pesme' },
  { id: 'duet', name: 'Duet', icon: '👫', description: 'Muški + ženski' }
];

const tempoOptions = [
  { id: 'slow', name: 'Sporo', icon: '🐢', description: 'Balada, emotivno' },
  { id: 'medium', name: 'Srednje', icon: '🚶', description: 'Umereno, prirodno' },
  { id: 'fast', name: 'Brzo', icon: '🐇', description: 'Energično, ritmično' }
];

const instruments = [
  { id: 'guitar', name: 'Gitara', icon: '🎸' },
  { id: 'piano', name: 'Klavir', icon: '🎹' },
  { id: 'accordion', name: 'Harmonika', icon: '🪗' },
  { id: 'violin', name: 'Violina', icon: '🻃' },
  { id: 'drums', name: 'Bubnjevi', icon: '🥁' },
  { id: 'sargija', name: 'Šargija', icon: '🪕' },
  { id: 'synth', name: 'Sintetizator', icon: '🎛️' }
];

export default function MusicDetailsForm({ data, onChange }: MusicDetailsFormProps) {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Muzički detalji
        </h2>
        <p className="text-gray-600">
          Odredi kako će pesma zvučati. Iako je volite, AI će malo da inovira!
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-8">
        {/* Voice Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Glas (vokal) <span className="text-rose-500">*</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {voiceTypes.map((voice) => {
              const isSelected = data.voiceType === voice.id;
              return (
                <button
                  key={voice.id}
                  type="button"
                  onClick={() => onChange({ ...data, voiceType: voice.id })}
                  className={`
                    p-4 rounded-xl border-2 transition-all text-left
                    ${isSelected 
                      ? 'border-rose-500 bg-rose-50 shadow-md' 
                      : 'border-gray-200 hover:border-rose-300 hover:bg-rose-50/50'
                    }
                  `}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{voice.icon}</span>
                    <span className={`font-semibold ${isSelected ? 'text-rose-600' : 'text-gray-800'}`}>
                      {voice.name}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{voice.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tempo */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Tempo <span className="text-rose-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-4">
            {tempoOptions.map((tempo) => {
              const isSelected = data.tempo === tempo.id;
              return (
                <button
                  key={tempo.id}
                  type="button"
                  onClick={() => onChange({ ...data, tempo: tempo.id })}
                  className={`
                    p-5 rounded-xl border-2 transition-all flex flex-col items-center gap-2
                    ${isSelected 
                      ? 'border-rose-500 bg-rose-50 shadow-md' 
                      : 'border-gray-200 hover:border-rose-300 hover:bg-rose-50/50'
                    }
                  `}
                >
                  <span className="text-3xl">{tempo.icon}</span>
                  <span className={`font-semibold ${isSelected ? 'text-rose-600' : 'text-gray-800'}`}>
                    {tempo.name}
                  </span>
                  <p className="text-xs text-gray-500 text-center">{tempo.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dominant Instrument */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Dominantni instrument <span className="text-gray-400">(opciono, AI će izabrati ako niste sigurni)</span>
          </label>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {instruments.map((instrument) => {
              const isSelected = data.instrument === instrument.id;
              return (
                <button
                  key={instrument.id}
                  type="button"
                  onClick={() => onChange({ ...data, instrument: instrument.id })}
                  className={`
                    p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1
                    ${isSelected 
                      ? 'border-rose-500 bg-rose-50' 
                      : 'border-gray-200 hover:border-rose-300 hover:bg-rose-50/50'
                    }
                  `}
                >
                  <span className="text-2xl">{instrument.icon}</span>
                  <span className={`text-xs font-medium ${isSelected ? 'text-rose-600' : 'text-gray-700'}`}>
                    {instrument.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* mood */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Raspoloženje <span className="text-rose-500">*</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { id: 'emotional', name: 'Emotivno', icon: '😢' },
              { id: 'happy', name: 'Srećno', icon: '😊' },
              { id: 'energetic', name: 'Energično', icon: '⚡' },
              { id: 'calm', name: 'Mirno', icon: '😌' },
              { id: 'romantic', name: 'Romantično', icon: '🥰' },
              { id: 'nostalgic', name: 'Nostalgično', icon: '🫥' },
              { id: 'epic', name: 'Epski', icon: '🏆' },
              { id: 'playful', name: 'Igraljivo', icon: '🎈' }
            ].map((mood) => {
              const isSelected = data.mood === mood.id;
              return (
                <button
                  key={mood.id}
                  type="button"
                  onClick={() => onChange({ ...data, mood: mood.id })}
                  className={`
                    p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2
                    ${isSelected 
                      ? 'border-rose-500 bg-rose-50' 
                      : 'border-gray-200 hover:border-rose-300 hover:bg-rose-50/50'
                    }
                  `}
                >
                  <span className="text-3xl">{mood.icon}</span>
                  <span className={`text-sm font-medium ${isSelected ? 'text-rose-600' : 'text-gray-700'}`}>
                    {mood.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Info box */}
        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
          <p className="text-sm text-amber-800">
            <strong>🎶 Napomena:</strong> Ovo su željene opcije. AI će ih koristiti kao Smernice, 
            ali će ponekad inovirati kako bi se dobio najbolji rezultat! To je deo magije! ✨
          </p>
        </div>
      </div>
    </div>
  );
}