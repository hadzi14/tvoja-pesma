import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import ProgressBar from './ProgressBar';
import PackageSelector from './PackageSelector';
import OccasionSelector from './OccasionSelector';
import DetailsForm from './DetailsForm';
import MusicDetailsForm from './MusicDetailsForm';
import DedicationForm from './DedicationForm';
import ReviewStep from './ReviewStep';

interface SongWizardProps {
  onComplete: (data: Record<string, any>) => void;
}

const steps = [
  'Paket',
  'Prilika',
  'Detalji',
  'Muzika',
  'Dedikacija',
  'Pregled'
];

export default function SongWizard({ onComplete }: SongWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<Record<string, any>>({
    packageType: 'pro',
    occasion: '',
    aiHelp: false,
    musicStyle: '',
    voiceType: '',
    tempo: 'medium',
    mood: 'emotional',
    skipDedication: false
  });

  const updateData = (newData: Record<string, any>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAIGenerate = () => {
    updateData({ aiHelp: true });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return !!data.packageType;
      case 2:
        return !!data.occasion;
      case 3:
        return !!data.recipientName && !!data.musicStyle && (
          !data.aiHelp || (
            data.aiHelp && 
            data.recipientName && 
            data.musicStyle
          )
        );
      case 4:
        return !!data.voiceType && !!data.tempo && !!data.mood;
      case 5:
        return true; // Dedikacija je opciono
      case 6:
        return true;
      default:
        return false;
    }
  };

  const handlePay = () => {
    onComplete({
      ...data,
      packagePrice: data.packageType === 'basic' ? 4.99 : data.packageType === 'pro' ? 7.99 : 9.99
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PackageSelector selectedPackage={data.packageType} onSelect={(id) => updateData({ packageType: id })} />;
      case 2:
        return <OccasionSelector selectedOccasion={data.occasion} onSelect={(id) => updateData({ occasion: id })} />;
      case 3:
        return <DetailsForm occasion={data.occasion} data={data} onChange={updateData} onAIGenerate={handleAIGenerate} />;
      case 4:
        return <MusicDetailsForm data={data} onChange={updateData} />;
      case 5:
        return <DedicationForm packageType={data.packageType} data={data} onChange={updateData} />;
      case 6:
        return <ReviewStep data={data} packageType={data.packageType} onBack={handleBack} onPay={handlePay} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-rose-50/30 to-amber-50/30 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent mb-2">
            Kreatori pesme
          </h1>
          <p className="text-gray-600">
            Korak po korak ka tvojoj personalizovanoj pesmi
          </p>
        </div>

        {/* Progress Bar */}
        <ProgressBar 
          currentStep={currentStep} 
          totalSteps={steps.length} 
          steps={steps} 
        />

        {/* Current Step */}
        <div className="bg-white rounded-3xl shadow-xl shadow-rose-100/50 p-8">
          {renderStep()}
        </div>

        {/* Navigation Buttons (hidden for step 6 as it has its own) */}
        {currentStep !== 6 && (
          <div className="flex justify-between mt-6 max-w-5xl mx-auto">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all
                ${currentStep === 1 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-rose-300 hover:bg-rose-50'
                }
              `}
            >
              <ArrowLeft className="w-5 h-5" />
              Nazad
            </button>

            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`
                flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all
                ${canProceed() 
                  ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white hover:shadow-lg hover:shadow-rose-200' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              {currentStep === steps.length ? 'Gotovo' : 'Dalje'}
              {currentStep !== steps.length && <ArrowRight className="w-5 h-5" />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}