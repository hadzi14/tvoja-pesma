import { useState } from 'react';
import { Check, Download, Share2, Music, FileText, Video, Heart, Gift, Copy, CheckCircle2, Mail } from 'lucide-react';
import AudioPlayer from './AudioPlayer';

interface ThankYouPageProps {
  orderData: {
    orderId: string;
    recipientName: string;
    occasion: string;
    packageType: 'basic' | 'pro' | 'premium';
    price: number;
  };
  songData: {
    audioUrl: string;
    pdfUrl: string;
    videoUrl?: string;
    lyrics: string;
    duration: number;
    coverArt: string;
  };
  userEmail: string;
}

export default function ThankYouPage({ orderData, songData, userEmail: _userEmail }: ThankYouPageProps) {
  const [copied, setCopied] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : 'https://pesmazatebe.com'}/pesma/${orderData.orderId}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const shareOnWhatsApp = () => {
    const text = `Slušaj pesmu koju sam napravio/la samo za ${orderData.recipientName}! 🎵 ${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const packageFeatures = {
    basic: { name: 'Basic', icon: '📦', color: 'from-gray-500 to-gray-600' },
    pro: { name: 'Pro', icon: '⭐', color: 'from-rose-500 to-amber-500' },
    premium: { name: 'Premium', icon: '💎', color: 'from-purple-500 to-amber-500' }
  };

  const pkg = packageFeatures[orderData.packageType];

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-amber-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 text-white py-6">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Check className="w-10 h-10 text-green-500" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Tvoja pesma je spremna! 🎉
          </h1>
          <p className="text-rose-100 text-lg">
            Pesma za <span className="font-bold text-white">{orderData.recipientName}</span> je kreirana sa ljubavlju
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Player */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Confirmation */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-sm text-gray-500">Narudžbina #{orderData.orderId}</p>
                  <p className="text-lg font-semibold text-gray-800 mt-1">
                    {orderData.occasion} za {orderData.recipientName}
                  </p>
                </div>
                <div className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${pkg.color} text-white rounded-full`}>
                  <span>{pkg.icon}</span>
                  <span className="font-semibold">{pkg.name} Paket</span>
                </div>
              </div>
            </div>

            {/* Audio Player */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Music className="w-6 h-6 text-rose-500" />
                Slušaj pesmu
              </h2>
              <AudioPlayer
                audioUrl={songData.audioUrl}
                title={`Pesma za ${orderData.recipientName}`}
                subtitle={orderData.occasion}
                coverArt={songData.coverArt}
                autoPlay
              />
            </div>

            {/* Download Buttons */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Download className="w-6 h-6 text-rose-500" />
                Preuzmi fajlove
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <a
                  href={songData.audioUrl}
                  download={`pesma-za-${orderData.recipientName}.mp3`}
                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-rose-50 to-rose-100 rounded-xl hover:from-rose-100 hover:to-rose-200 transition-all group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-rose-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Music className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">MP3 Pesma</p>
                    <p className="text-sm text-gray-500">{(songData.duration / 60).toFixed(1)} minuta</p>
                  </div>
                  <Download className="w-5 h-5 text-gray-400 group-hover:text-rose-500 transition-colors" />
                </a>

                <a
                  href={songData.pdfUrl}
                  download={`tekst-${orderData.recipientName}.pdf`}
                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl hover:from-amber-100 hover:to-amber-200 transition-all group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">Tekst (PDF)</p>
                    <p className="text-sm text-gray-500">Štampana verzija</p>
                  </div>
                  <Download className="w-5 h-5 text-gray-400 group-hover:text-amber-500 transition-colors" />
                </a>

                {orderData.packageType === 'premium' && songData.videoUrl && (
                  <>
                    <a
                      href={songData.videoUrl}
                      download={`video-${orderData.recipientName}.mp4`}
                      className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl hover:from-purple-100 hover:to-purple-200 transition-all group sm:col-span-2"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Video className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">Video sa lirikom</p>
                        <p className="text-sm text-gray-500">Premium - MP4 za gledanje</p>
                      </div>
                      <Download className="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors" />
                    </a>
                  </>
                )}
              </div>

              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <p className="text-sm text-blue-800 flex items-start gap-2">
                  <span className="text-lg">ℹ️</span>
                  <span>
                    <strong>Obaveštenje:</strong> Fajlovi su dostupni za preuzimanje narednih 30 dana. 
                    Preuzmi ih i sačuvaj kao uspomenu!
                  </span>
                </p>
              </div>
            </div>

            {/* Lyrics */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-rose-500" />
                Tekst pesme
              </h2>
              <div className="bg-gradient-to-br from-amber-50 to-rose-50 p-6 rounded-xl border-l-4 border-rose-500">
                <pre className="whitespace-pre-wrap font-sans text-gray-700 leading-relaxed">
                  {songData.lyrics}
                </pre>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Gift Direct */}
            <div className="bg-gradient-to-br from-rose-100 to-amber-100 rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Gift className="w-5 h-5 text-rose-500" />
                Pošalji kao poklon
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Pošalji pesmu direktno na email {orderData.recipientName}-a sa ličnom porukom.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder={`${orderData.recipientName.toLowerCase()}@email.com`}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all"
                />
                <textarea
                  placeholder="Dodaj poruku (opciono)..."
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all resize-none"
                />
                <button
                  onClick={() => setEmailSent(true)}
                  className="w-full py-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  Pošalji pesmu
                </button>
                {emailSent && (
                  <div className="flex items-center gap-2 text-green-600 bg-green-100 p-3 rounded-xl">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-sm">Poruka poslata! 🎉</span>
                  </div>
                )}
              </div>
            </div>

            {/* Share */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Share2 className="w-5 h-5 text-rose-500" />
                Podeli
              </h3>
              
              <div className="space-y-3">
                {/* Copy Link */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="flex-1 px-4 py-3 bg-gray-100 rounded-xl text-sm text-gray-600 outline-none"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all flex items-center gap-2"
                  >
                    {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-gray-500" />}
                  </button>
                </div>

                {/* Social Buttons */}
                <button
                  onClick={shareOnWhatsApp}
                  className="w-full py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-all flex items-center justify-center gap-2"
                >
                  <span className="text-lg">📱</span>
                  Podeli na WhatsApp
                </button>

                <button
                  onClick={shareOnFacebook}
                  className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                >
                  <span className="text-lg">📘</span>
                  Podeli na Facebook
                </button>
              </div>
            </div>

            {/* Upsell */}
            <div className="bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl shadow-lg p-6 relative overflow-hidden">
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                -20%
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Napravi još jednu pesmu!
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Rođendan blizu? Ili godišnjica? Zaboravio si nekoga?
              </p>
              <button className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all">
                Napravi novu pesmu
              </button>
            </div>

            {/* Feedback */}
            <div className="text-center p-6">
              <Heart className="w-12 h-12 text-rose-500 mx-auto mb-3" />
              <p className="text-gray-700 font-semibold mb-1">
                Zadovoljni ste?
              </p>
              <p className="text-sm text-gray-500 mb-3">
                Ostavite recenziju i podelite iskustvo!
              </p>
              <div className="flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className="text-2xl hover:scale-125 transition-transform"
                  >
                    ⭐
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 rounded-2xl shadow-xl p-8 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            "Svaka priča zaslužuje svoju melodiju"
          </h2>
          <p className="text-rose-100 mb-6 max-w-2xl mx-auto">
            Hvala što koristiš Pesma Za Tebe! Nadamo se da pesma za {orderData.recipientName} 
            doneće toliko sreće koliko smo je stvorili sa ljubavlju. ❤️
          </p>
          <button className="px-8 py-4 bg-white text-rose-600 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg">
            Vrati se na početnu stranu
          </button>
        </div>
      </div>
    </div>
  );
}