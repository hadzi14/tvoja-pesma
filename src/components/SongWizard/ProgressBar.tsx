import { Check } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export default function ProgressBar({ currentStep, totalSteps, steps }: ProgressBarProps) {
  return (
    <div className="mb-8">
      {/* Progress bar line */}
      <div className="relative mb-4">
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 rounded-full">
          <div 
            className="h-1 bg-gradient-to-r from-rose-500 to-amber-500 rounded-full transition-all duration-500"
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          />
        </div>
        
        {/* Step indicators */}
        <div className="flex justify-between relative">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;
            
            return (
              <div 
                key={step} 
                className="flex flex-col items-center"
                style={{ marginLeft: index === 0 ? '0' : index === steps.length - 1 ? '0' : '-8px' }}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCompleted 
                      ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-lg shadow-rose-200' 
                      : isCurrent 
                        ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-lg shadow-rose-200 ring-4 ring-rose-100'
                        : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-semibold">{stepNumber}</span>
                  )}
                </div>
                
                <span 
                  className={`text-xs font-medium mt-2 hidden sm:block transition-colors ${
                    isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}