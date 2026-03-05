import { Check } from 'lucide-react';
import { cn } from '@/utils';
import { STEPS } from './constants';

interface Props {
  currentStep: number;
  onStepClick: (step: number) => void;
  completedSteps: Set<number>;
}

export function StepIndicator({ currentStep, onStepClick, completedSteps }: Props) {
  return (
    <div className="mb-8 overflow-x-auto">
      <div className="flex min-w-[700px] items-center justify-between">
        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isActive = idx === currentStep;
          const isCompleted = completedSteps.has(idx);
          const isClickable = isCompleted || idx <= currentStep;

          return (
            <div key={step.key} className="flex flex-1 items-center">
              <button
                type="button"
                onClick={() => isClickable && onStepClick(idx)}
                disabled={!isClickable}
                className={cn(
                  'flex flex-col items-center transition-all',
                  isClickable ? 'cursor-pointer' : 'cursor-not-allowed',
                )}
              >
                <div className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all',
                  isCompleted ? 'border-green-500 bg-green-500 text-white' :
                  isActive ? 'border-primary bg-white text-primary shadow-md shadow-primary/20' :
                  'border-gray-300 bg-white text-gray-400',
                )}>
                  {isCompleted ? <Check className="h-5 w-5" /> : <Icon className="h-4 w-4" />}
                </div>
                <span className={cn(
                  'mt-2 whitespace-nowrap text-[11px] font-medium',
                  isActive ? 'text-primary' : isCompleted ? 'text-green-600' : 'text-gray-400',
                )}>
                  {step.label}
                </span>
              </button>
              {idx < STEPS.length - 1 && (
                <div className="mx-1 mb-6 h-0.5 flex-1">
                  <div className={cn(
                    'h-full rounded-full transition-colors',
                    isCompleted ? 'bg-green-400' : 'bg-gray-200',
                  )} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
