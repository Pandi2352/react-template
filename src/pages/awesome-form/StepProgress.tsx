import { Check } from 'lucide-react';
import { cn } from '@/utils';
import { STEPS } from './constants';

interface Props {
  currentStep: number;
}

export function StepProgress({ currentStep }: Props) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isActive = idx === currentStep;
          const isCompleted = idx < currentStep;
          return (
            <div key={step.key} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all',
                  isCompleted ? 'border-primary bg-primary text-white' :
                  isActive ? 'border-primary bg-white text-primary' :
                  'border-gray-300 bg-white text-gray-400',
                )}>
                  {isCompleted ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                </div>
                <span className={cn(
                  'mt-2 text-xs font-medium',
                  isActive || isCompleted ? 'text-primary' : 'text-gray-400',
                )}>
                  {step.label}
                </span>
              </div>
              {idx < STEPS.length - 1 && (
                <div className="mx-2 mb-6 h-0.5 flex-1">
                  <div className={cn('h-full rounded-full', isCompleted ? 'bg-primary' : 'bg-gray-200')} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
