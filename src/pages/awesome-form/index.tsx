import { useState, type FormEvent } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/common';
import { useUI } from '@/hooks';
import type { PersonalInfo, ProfessionalInfo, AccountSettings, FormErrors } from './types';
import { STEPS } from './constants';
import { validateStep } from './validation';
import { StepProgress } from './StepProgress';
import { PersonalStep } from './PersonalStep';
import { ProfessionalStep } from './ProfessionalStep';
import { AccountStep } from './AccountStep';
import { ReviewStep } from './ReviewStep';

export function AwesomeForm() {
  const { addToast } = useUI();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const [personal, setPersonal] = useState<PersonalInfo>({
    firstName: '', lastName: '', email: '', phone: '', dateOfBirth: '',
    avatar: null, avatarPreview: '',
  });

  const [professional, setProfessional] = useState<ProfessionalInfo>({
    company: '', jobTitle: '', department: '', experience: '', salary: 50000,
    skills: [], bio: '',
  });

  const [account, setAccount] = useState<AccountSettings>({
    username: '', password: '', confirmPassword: '',
    notifications: { email: true, sms: false, push: true },
    theme: 'system', agreeTerms: false,
  });

  function clearError(field: string) {
    if (errors[field]) {
      setErrors((prev) => { const next = { ...prev }; delete next[field]; return next; });
    }
  }

  function handleNext() {
    const errs = validateStep(currentStep, personal, professional, account);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      addToast({ type: 'error', message: 'Please fix the errors before proceeding.' });
      return;
    }
    setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function handleBack() {
    setErrors({});
    setCurrentStep((s) => Math.max(s - 1, 0));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 2000));
    setIsSubmitting(false);
    addToast({ type: 'success', message: 'Account created successfully! Welcome aboard.' });
  }

  return (
    <div className="mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
        <p className="mt-1 text-sm text-gray-500">Complete all steps to set up your profile.</p>
      </div>

      <StepProgress currentStep={currentStep} />

      <form onSubmit={handleSubmit} noValidate>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-lg font-semibold text-gray-900">
            {STEPS[currentStep].label} {currentStep < 3 ? 'Information' : '& Submit'}
          </h2>

          {currentStep === 0 && (
            <PersonalStep
              data={personal} errors={errors} clearError={clearError}
              onChange={(u) => setPersonal((p) => ({ ...p, ...u }))}
            />
          )}
          {currentStep === 1 && (
            <ProfessionalStep
              data={professional} errors={errors} clearError={clearError}
              onChange={(u) => setProfessional((p) => ({ ...p, ...u }))}
            />
          )}
          {currentStep === 2 && (
            <AccountStep
              data={account} errors={errors} clearError={clearError}
              onChange={(u) => setAccount((a) => ({ ...a, ...u }))}
            />
          )}
          {currentStep === 3 && (
            <ReviewStep personal={personal} professional={professional} account={account} />
          )}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <Button
            type="button" variant="outline" onClick={handleBack}
            disabled={currentStep === 0}
            className={currentStep === 0 ? 'invisible' : ''}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>

          {currentStep < STEPS.length - 1 ? (
            <Button type="button" onClick={handleNext}>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" isLoading={isSubmitting}>
              <Check className="mr-2 h-4 w-4" /> Create Account
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
