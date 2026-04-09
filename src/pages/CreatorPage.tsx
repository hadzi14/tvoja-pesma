import { useState } from 'react';
import SongWizard from '../components/SongWizard/SongWizard';

export default function CreatorPage() {
  const [wizardComplete, setWizardComplete] = useState(false);

  const handleWizardComplete = (data: Record<string, any>) => {
    setWizardComplete(true);
    
    // Simulacija slanja na backend - u stvarnosti bi ovo bilo API call
    console.log('Song data ready for processing:', data);
    
    // Ovdje bi pozvali API /api/generate-song
    // Nakon toga bi se redirectovalo na Thank You page
    
    window.location.href = `/hvala?data=${encodeURIComponent(JSON.stringify(data))}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-rose-50/30 to-amber-50/30">
      {!wizardComplete && <SongWizard onComplete={handleWizardComplete} />}
    </div>
  );
}