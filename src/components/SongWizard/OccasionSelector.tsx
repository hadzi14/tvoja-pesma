import { 
  Cake, 
  Heart, 
  HelpingHand, 
  GraduationCap, 
  Baby, 
  Sparkles, 
  Smile,
  Split,
  Music
} from 'lucide-react';

interface Occasion {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  example: string;
}

const occasions: Occasion[] = [
  {
    id: 'birthday',
    name: 'Rođendan',
    icon: <Cake className="w-6 h-6" />,
    description: 'Za rođendan voljene osobe',
    example: 'Primer: "Mamina 60., prijateljev 30., dečiji rođendan"'
  },
  {
    id: 'anniversary',
    name: 'Godišnjica / Veridba',
    icon: <Heart className="w-6 h-6" />,
    description: 'Za ljubavne partnere',
    example: 'Primer: "1. godišnjica braka, veridba, zajednički dan"'
  },
  {
    id: 'love',
    name: 'Ljubavna poruka',
    icon: <Heart className="w-6 h-6" />,
    description: 'Izjava ljubavi',
    example: 'Primer: "Volim te, hvala za sve, ti si moja sve"'
  },
  {
    id: 'apology',
    name: 'Izvinjenje',
    icon: <HelpingHand className="w-6 h-6" />,
    description: 'Izvini se kroz pesmu',
    example: 'Primer: "Neka ti se opravdaš preko pesme"'
  },
  {
    id: 'graduation',
    name: 'Diplomiranje / Uspeh',
    icon: <GraduationCap className="w-6 h-6" />,
    description: 'Proslava uspeha',
    example: 'Primer: "Fakultet, nova poslovna uloga, nagrada"'
  },
  {
    id: 'parents',
    name: 'Majčin / Očev dan',
    icon: <Music className="w-6 h-6" />,
    description: 'Za roditelje',
    example: 'Primer: "Hvala mama, tata si najbolji"'
  },
  {
    id: 'wedding',
    name: 'Venčanje',
    icon: <Sparkles className="w-6 h-6" />,
    description: 'Za mladence',
    example: 'Primer: "Prvi ples, matičar, za mladence"'
  },
  {
    id: 'baby',
    name: 'Rođenje deteta',
    icon: <Baby className="w-6 h-6" />,
    description: 'Proslava novog člana',
    example: 'Primer: "Dobrodošla beba, za roditelje"'
  },
  {
    id: 'breakup',
    name: 'Raskid / Tužna pesma',
    icon: <Split className="w-6 h-6" />,
    description: 'Emotivna tužna pesma',
    example: 'Primer: "Kraj veze, sećanja, oproštaj"'
  },
  {
    id: 'funny',
    name: 'Šaljiva pesma (Roast)',
    icon: <Smile className="w-6 h-6" />,
    description: 'Za smijeh i zajebanciju',
    example: 'Primer: "Zajebi prijatelja, dadilja, kolega"'
  }
];

interface OccasionSelectorProps {
  selectedOccasion: string;
  onSelect: (occasionId: string) => void;
}

export default function OccasionSelector({ selectedOccasion, onSelect }: OccasionSelectorProps) {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Za koju priliku je pesma?
        </h2>
        <p className="text-gray-600">
          Odaberi priliku i pesma će biti prilagođena tom momentu
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
        {occasions.map((occasion) => {
          const isSelected = selectedOccasion === occasion.id;
          
          return (
            <button
              key={occasion.id}
              onClick={() => onSelect(occasion.id)}
              className={`
                group relative p-4 rounded-xl border-2 transition-all duration-300
                ${isSelected 
                  ? 'border-gradient-to-br from-rose-500 to-amber-500 bg-gradient-to-br from-rose-50 to-amber-50 shadow-lg shadow-rose-200' 
                  : 'border-gray-200 hover:border-rose-300 hover:bg-rose-50/50'
                }
              `}
            >
              <div className={`flex flex-col items-center gap-2 ${isSelected ? 'text-rose-600' : ''}`}>
                <div className={`
                  w-14 h-14 rounded-full flex items-center justify-center transition-all
                  ${isSelected 
                    ? 'bg-gradient-to-br from-rose-500 to-amber-500 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-500 group-hover:bg-rose-100 group-hover:text-rose-500'
                  }
                `}>
                  {occasion.icon}
                </div>
                <span className={`text-sm font-semibold text-center ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                  {occasion.name}
                </span>
              </div>
              
              {/* Tooltip on hover */}
              <div className="absolute inset-x-0 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                <div className="bg-gray-900 text-white text-xs p-3 rounded-lg shadow-xl">
                  <p className="font-semibold mb-1">{occasion.description}</p>
                  <p className="text-gray-300">{occasion.example}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      
      {/* Selected occasion info */}
      {selectedOccasion && (
        <div className="max-w-2xl mx-auto mt-6 p-4 bg-gradient-to-r from-rose-50 to-amber-50 rounded-xl border border-rose-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center text-white">
              {occasions.find(o => o.id === selectedOccasion)?.icon}
            </div>
            <div>
              <p className="font-semibold text-gray-900">
                Izabrano: {occasions.find(o => o.id === selectedOccasion)?.name}
              </p>
              <p className="text-sm text-gray-600">
                {occasions.find(o => o.id === selectedOccasion)?.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}