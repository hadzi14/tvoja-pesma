import { useEffect, useState } from 'react';
import MainPage from './components/MainPage';
import ThankYouPage from './components/ThankYouPage';
import AdminDashboard from './components/AdminDashboard';
import CreatorPage from './pages/CreatorPage';

// Simuliramo routing based on URL hash
type PageType = 'home' | 'thankyou' | 'admin' | 'wizard';

// Simuliramo routing
function getCurrentPage(): PageType {
  const path = window.location.hash || window.location.pathname;
  if (path.includes('thankyou') || path.includes('hvala')) return 'thankyou';
  if (path.includes('admin')) return 'admin';
  if (path.includes('wizard')) return 'wizard';
  return 'home';
}

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>(() => getCurrentPage());

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(getCurrentPage());
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  // Simulirani podaci za ThankYou stranicu
  const mockOrderData = currentPage === 'thankyou' ? {
    orderId: 'ORD-2024-12345',
    recipientName: 'Marija',
    occasion: 'rođendan',
    packageType: 'pro' as const,
    price: 7.99
  } : null;

  const mockSongData = currentPage === 'thankyou' ? {
    audioUrl: '/demo-audio.mp3',
    pdfUrl: '/demo-lyrics.pdf',
    videoUrl: '/demo-video.mp4',
    lyrics: `[Strofa 1]
Marija, prošlo je trideset godina
Od kad si stigla na ovaj svet
Sa osmehom koji sve menja
Ti si moj najbolji prijatelj

[Refren]
Srećan ti rođendan, draga moja
Neka ti život bude pun ljubavi
Marija, ti si svetlost
Koja sija u mojoj duši

[Strofa 2]
Sećam se mature, one noći
Kada smo se zajedno smejale i plakale
Ti si bila tu, uvek pored mene
I zato te danas slavim

[Refren]
Srećan ti rođendan, draga moja
Neka ti život bude pun ljubavi
Marija, ti si svetlost
Koja sija u mojoj duši

[Most]
Trideset godina, a tek počinjaš
Život je tvoj, uzmi ga u ruke
Marija, ti si jača nego misliš
I zaslužuješ sve najbolje

[Refren - Outro]
Srećan ti rođendan, draga moja
Marija, volim te! ❤️`,
    duration: 184,
    coverArt: '/images/cover-marija.jpg'
  } : null;

  switch (currentPage) {
    case 'thankyou':
      return (
        <ThankYouPage 
          orderData={mockOrderData!} 
          songData={mockSongData!}
          userEmail="user@example.com"
        />
      );
    case 'admin':
      return <AdminDashboard />;
    case 'wizard':
      return <CreatorPage />;
    default:
      return <MainPage />;
  }
}

export default App