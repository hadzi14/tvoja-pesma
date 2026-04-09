import { ArrowRight, Play, Check, Star, Heart, Globe } from 'lucide-react';
import AudioPlayer from './AudioPlayer';

export default function MainPage() {
  const navigateToCreator = () => {
    window.location.hash = 'wizard';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const demoSongs = [
    {
      id: 1,
      title: 'Mamin rođendan',
      subtitle: 'Sevdalinka stil',
      recipient: 'Majka Dragana',
      audioUrl: 'https://example.com/audio/demo1.mp3',
      coverArt: '/images/demo-sevdalinka.jpg',
      duration: 148
    },
    {
      id: 2,
      title: 'Izvinjenje',
      subtitle: 'Pop balada',
      recipient: 'Ana Jovanović',
      audioUrl: 'https://example.com/audio/demo2.mp3',
      coverArt: '/images/demo-pop.jpg',
      duration: 172
    },
    {
      id: 3,
      title: 'Prijateljev 30.',
      subtitle: 'Humoristična',
      recipient: 'Nikola Stojanović',
      audioUrl: 'https://example.com/audio/demo3.mp3',
      coverArt: '/images/demo-funny.jpg',
      duration: 186
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Jelena Marković',
      location: 'Beograd',
      rating: 5,
      text: 'Poslao sam pesmu devojci za godišnjicu. PLAKALA! Nikad nije dobila tako lep poklon! ❤️',
      avatar: '/images/avatar1.jpg'
    },
    {
      id: 2,
      name: 'Marko Petrović',
      location: 'Novi Sad',
      rating: 5,
      text: 'Mami za 60ti rođendan - sevdalinka. cela porodica je plakala od sreće. Vredi svakog centa!',
      avatar: '/images/avatar2.jpg'
    },
    {
      id: 3,
      name: 'Ana Đorđević',
      location: 'Niš',
      rating: 5,
      text: 'Napravio pesmu da se izvinim devojci posle svađe. Sve je zaboravila :)) AI mi je spasio vezu!',
      avatar: '/images/avatar3.jpg'
    },
    {
      id: 4,
      name: 'Stefan Ilić',
      location: 'Kragujevac',
      rating: 5,
      text: 'Roast pesma za prijatelja - NEKONTROLISANO SMEJANJE! Najbolji poklon ikad!',
      avatar: '/images/avatar4.jpg'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-b from-rose-50 via-white to-amber-50 flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100 text-rose-700 rounded-full text-sm font-medium">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                </span>
                387 pesama kreirano ove nedelje
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                <span className="bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 bg-clip-text text-transparent">
                  PESMA ZA TEBE
                </span>
                <br />
                <span className="text-gray-800">Personalizovana pesma za svaku priliku</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                AI komponuje, piše i peva pesmu samo za tebe ili voljenu osobu. Gotovo za 3 minuta. 
                Od rođendana do izvinjenja - svaka priča zaslužuje svoju melodiju.
              </p>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-gray-700 font-medium">4.9/5 (218 recenzija)</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={navigateToCreator}
                  className="group px-8 py-4 bg-gradient-to-r from-rose-600 to-rose-700 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  NAPRAVI SVOJU PESMU
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 bg-white text-gray-700 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2 border border-gray-200">
                  <Play className="w-5 h-5" />
                  Slušaj primere
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-rose-100 to-amber-100 rounded-3xl p-8 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-amber-500 rounded-xl overflow-hidden">
                      <img src="/images/cover-preview.jpg" alt="Cover" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">Pesma za Mariju</h3>
                      <p className="text-sm text-gray-500">Srećan 30. rođendan! 🎉</p>
                    </div>
                  </div>
                  <div className="bg-gray-100 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <Play className="w-4 h-4" />
                      <span>Slušaj primer:</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center hover:bg-rose-600 transition-colors">
                        <Play className="w-5 h-5 text-white ml-1" fill="currentColor" />
                      </button>
                      <div className="flex-1 h-2 bg-gray-300 rounded-full overflow-hidden">
                        <div className="h-full bg-rose-500 rounded-full w-1/3" />
                      </div>
                      <span className="text-sm text-gray-500">1:24</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Kako funkcioniše?
            </h2>
            <p className="text-xl text-gray-600">Samo 3 koraka, 3 minuta, i tvoja pesma je gotova</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: 1,
                icon: '🎯',
                title: 'Odaberi priliku',
                description: 'Rođendan, godišnjica, izvinjenje, ljubavna poruka, ili bilo šta drugo - mi imamo pesmu za svaku priliku!'
              },
              {
                step: 2,
                icon: '✍️',
                title: 'Ispričaj priču',
                description: 'Unesi detalje o osobi, odnosu, favorite uspomene. AI će napisati tekst ili ti možeš uneti svoj.'
              },
              {
                step: 3,
                icon: '🎵',
                title: 'Preuzmi pesmu',
                description: 'Za samo 3 minuta dobijaš MP3 + tekst pesme. Poseban, jedinstven poklon koji će zapamtiti zauvek.'
              }
            ].map((item) => (
              <div key={item.step} className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-rose-500 to-amber-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity blur-xl" />
                <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all group-hover:-translate-y-2 duration-300">
                  <div className="w-20 h-20 bg-gradient-to-br from-rose-100 to-amber-100 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-amber-500 rounded-full flex items-center justify-center text-white font-bold">
                      {item.step}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">{item.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Occasions */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Za svaku priliku
            </h2>
            <p className="text-xl text-gray-600">Nema ideje za poklon? Nema problema!</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { icon: '🎂', name: 'Rođendan', count: '567 pesama' },
              { icon: '💍', name: 'Godišnjica', count: '124 pesme' },
              { icon: '❤️', name: 'Ljubavna poruka', count: '234 pesme' },
              { icon: '😢', name: 'Izvinjenje', count: '187 pesama' },
              { icon: '🎓', name: 'Diplomiranje', count: '89 pesama' },
              { icon: '👵', name: 'Majčin/Očev dan', count: '78 pesama' },
              { icon: '🎉', name: 'Venčanje', count: '45 pesama' },
              { icon: '🍼', name: 'Rođenje deteta', count: '67 pesama' },
              { icon: '💔', name: 'Raskid', count: '34 pesme' },
              { icon: '😂', name: 'Šaljiva pesma', count: '57 pesama' }
            ].map((occasion) => (
              <div
                key={occasion.name}
                className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer text-center"
              >
                <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-300">
                  {occasion.icon}
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{occasion.name}</h3>
                <p className="text-xs text-gray-500">{occasion.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Songs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Slušaj kako zvuči
            </h2>
            <p className="text-xl text-gray-600">Primere pesama koje smo napravili</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {demoSongs.map((song) => (
              <div key={song.id} className="bg-gradient-to-br from-rose-50 to-amber-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-amber-500 rounded-xl overflow-hidden shadow-lg">
                    <img src={song.coverArt} alt={song.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{song.title}</h3>
                    <p className="text-sm text-gray-500">{song.subtitle}</p>
                  </div>
                </div>
                <AudioPlayer
                  audioUrl={song.audioUrl}
                  title={song.title}
                  subtitle={`Za ${song.recipient}`}
                  coverArt={song.coverArt}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Izaberi paket
            </h2>
            <p className="text-xl text-gray-600">Svaki paket je ispunjen ljubavlju i pažnjom</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all group">
              <div className="text-center mb-8">
                <span className="inline-block px-4 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                  BASIC
                </span>
                <div className="mt-4">
                  <span className="text-5xl font-bold text-gray-900">€4.99</span>
                </div>
                <p className="text-gray-500 mt-2">Jednostavna i prefinjena</p>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  'Pesma do 2 minute',
                  '1 muzički stil',
                  'MP3 download',
                  'Tekst u PDF formatu',
                  'Email delivery'
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-gray-600">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors group-hover:scale-105 duration-300">
                Odaberi Basic
              </button>
            </div>

            {/* Pro - Popular */}
            <div className="bg-gradient-to-b from-rose-500 to-rose-600 rounded-2xl shadow-2xl p-8 transform md:-translate-y-4 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-amber-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                POPULAR
              </div>
              <div className="text-center mb-8">
                <span className="inline-block px-4 py-1 bg-white/20 text-white rounded-full text-sm font-medium">
                  PRO ⭐
                </span>
                <div className="mt-4">
                  <span className="text-5xl font-bold text-white">€7.99</span>
                </div>
                <p className="text-rose-200 mt-2">Najbolja vrednost</p>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  'Pesma do 3 minute',
                  'Bilo koji muzički stil',
                  'Cover Art (slika)',
                  'Dedikacija na početku',
                  'MP3 + PDF',
                  'VIP Email delivery'
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-white">
                    <Check className="w-5 h-5 text-amber-300 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 bg-white text-rose-600 rounded-xl font-bold hover:bg-rose-50 transition-colors hover:scale-105 duration-300">
                Odaberi Pro
              </button>
            </div>

            {/* Premium */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all group">
              <div className="text-center mb-8">
                <span className="inline-block px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  PREMIUM 💎
                </span>
                <div className="mt-4">
                  <span className="text-5xl font-bold text-gray-900">€9.99</span>
                </div>
                <p className="text-gray-500 mt-2">Kompletno iskustvo</p>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  'Pesma do 4 minute',
                  'Miksani stilovi',
                  'Video sa lirikom (MP4)',
                  'Profesionalni remaster',
                  '1 revizija ako nisi zadovoljan',
                  'Cover Art + Dedikacija',
                  'MP3 + PDF + Video'
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-gray-600">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors group-hover:scale-105 duration-300">
                Odaberi Premium
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Šta kažu korisnici
            </h2>
            <p className="text-xl text-gray-600">Više od 1,200 zadovoljnih poklona</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gradient-to-br from-rose-50 to-amber-50 rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-lg mb-6 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Globe className="w-4 h-4" />
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            "Svaka priča zaslužuje svoju melodiju"
          </h2>
          <p className="text-xl text-rose-100 mb-8">
            Neka tvoj poklon bude jedinstven. Neka bude pesma koja će biti zapamćena zauvek.
          </p>
          <button
            onClick={navigateToCreator}
            className="px-10 py-5 bg-white text-rose-600 rounded-xl font-bold text-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all inline-flex items-center gap-3"
          >
            NAPRAVI PESMU ODMAH - IZ €4.99
            <ArrowRight className="w-6 h-6" />
          </button>
          <p className="text-rose-200 mt-6 text-sm">
            Gotovo za 3 minuta • 100% garancija zadovoljstva • Sigurno plaćanje preko Paddle
          </p>
        </div>
      </section>
    </div>
  );
}