import { Check, Star } from 'lucide-react';

interface Package {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  popular?: boolean;
}

const packages: Package[] = [
  {
    id: 'basic',
    name: 'BASIC',
    price: 4.99,
    duration: 'do 2 minuta',
    features: [
      'Pesma sa AI generisanim tekstom',
      'Jedan muzički stil',
      'MP3 download',
      'Tekst pesme u PDF formatu',
      'Standardni kvalitet'
    ],
    popular: false
  },
  {
    id: 'pro',
    name: 'PRO',
    price: 7.99,
    duration: 'do 3 minuta',
    features: [
      'Sve iz Basic paketa',
      'Duža pesma (do 3 minuta)',
      'Bilo koji muzički stil',
      'Cover art ( personalizovana slika)',
      'Dedikacija na početku pesme',
      'Visoki audio kvalitet'
    ],
    popular: true
  },
  {
    id: 'premium',
    name: 'PREMIUM',
    price: 9.99,
    duration: 'do 4 minuta',
    features: [
      'Sve iz Pro paketa',
      'Maksimalna dužina (do 4 minuta)',
      'Miksani muzički stilovi',
      'Video sa lirikom (MP4)',
      'Profesionalni remaster',
      '1 besplatna revizija (ako nisi zadovoljan)'
    ],
    popular: false
  }
];

interface PackageSelectorProps {
  selectedPackage: string;
  onSelect: (pkgId: string) => void;
}

export default function PackageSelector({ selectedPackage, onSelect }: PackageSelectorProps) {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Odaberi svoj paket
        </h2>
        <p className="text-gray-600">
          Svaki paket uključuje AI generisani tekst, melodiju i vokale
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {packages.map((pkg) => {
          const isSelected = selectedPackage === pkg.id;
          
          return (
            <div
              key={pkg.id}
              onClick={() => onSelect(pkg.id)}
              className={`
                relative rounded-2xl p-6 cursor-pointer transition-all duration-300
                ${isSelected 
                  ? 'bg-gradient-to-br from-rose-500 to-amber-500 text-white shadow-2xl shadow-rose-200 scale-105' 
                  : 'bg-white border-2 hover:border-rose-300 hover:shadow-xl'
                }
              `}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className={`
                    flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold
                    ${isSelected ? 'bg-white text-rose-500' : 'bg-gradient-to-r from-rose-500 to-amber-500 text-white'}
                  `}>
                    <Star className="w-3 h-3 fill-current" />
                    NAJPOPULARNIJI
                  </div>
                </div>
              )}
              
              <div className="text-center mb-4 pt-2">
                <h3 className="text-xl font-bold mb-1">{pkg.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className={isSelected ? 'text-3xl font-bold' : 'text-3xl font-bold text-gray-900'}>
                    €{pkg.price}
                  </span>
                </div>
                <p className={`text-sm ${isSelected ? 'text-white/90' : 'text-gray-500'}`}>
                  {pkg.duration}
                </p>
              </div>
              
              <ul className="space-y-3 mb-6">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className={`
                      flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5
                      ${isSelected ? 'bg-white/20' : 'bg-rose-100'}
                    `}>
                      <Check className={`w-3 h-3 ${isSelected ? 'text-white' : 'text-rose-500'}`} />
                    </div>
                    <span className={`text-sm ${isSelected ? 'text-white/95' : 'text-gray-700'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              
              <button
                className={`
                  w-full py-3 rounded-xl font-semibold transition-all
                  ${isSelected 
                    ? 'bg-white text-rose-500 hover:bg-gray-100' 
                    : 'bg-gradient-to-r from-rose-500 to-amber-500 text-white hover:shadow-lg'
                  }
                `}
              >
                {isSelected ? 'ODABRAN' : 'ODABERI'}
              </button>
            </div>
          );
        })}
      </div>
      
      {/* Additional upsells */}
      <div className="max-w-3xl mx-auto mt-8 p-6 bg-gradient-to-r from-amber-50 to-rose-50 rounded-2xl border border-amber-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
          ✨ Dodatni ekstra opcije (dostupne u sledećem koraku)
        </h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🖼️</span>
            <span className="text-gray-700">
              <strong>+€2.99</strong> - Tvoja slika u cover art
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">⏱️</span>
            <span className="text-gray-700">
              <strong>+€1.99</strong> - Produžena verzija (5+ min)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎙️</span>
            <span className="text-gray-700">
              <strong>+€3.99</strong> - Studio mastering
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}