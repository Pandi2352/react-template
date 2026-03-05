import { useState, type FormEvent } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/common';
import { useUI } from '@/hooks';
import type {
  PersonalDetails, ContactAddress, EducationWork,
  FinancialDocs, Preferences, SocialContent, Agreements, FormErrors,
} from './types';
import { STEPS } from './constants';
import { validateStep } from './validation';
import { StepIndicator } from './StepIndicator';
import { PersonalDetailsStep } from './PersonalDetailsStep';
import { ContactAddressStep } from './ContactAddressStep';
import { EducationWorkStep } from './EducationWorkStep';
import { FinancialDocsStep } from './FinancialDocsStep';
import { PreferencesStep } from './PreferencesStep';
import { SocialContentStep } from './SocialContentStep';
import { ReviewSubmitStep } from './ReviewSubmitStep';

/* ── Initial State ── */

const initPersonal: PersonalDetails = {
  prefix: '', firstName: '', middleName: '', lastName: '', suffix: '',
  gender: '', dateOfBirth: '', nationality: '', maritalStatus: '', bloodGroup: '',
};

const initContact: ContactAddress = {
  email: '', secondaryEmail: '', phoneCode: '+1', phone: '', alternatePhone: '',
  website: '', street: '', apartment: '', city: '', state: '', zipCode: '', country: '',
  sameAsMailing: true, billingStreet: '', billingCity: '', billingState: '', billingZip: '', billingCountry: '',
};

const initEduWork: EducationWork = {
  education: [], work: [], certifications: [], languages: [],
};

const initFinancial: FinancialDocs = {
  incomeRange: '', currency: '', taxId: '', panNumber: '',
  bankName: '', accountNumber: '', ifscCode: '', documents: [],
};

const initPreferences: Preferences = {
  favoriteColor: '#3b82f6', fontSize: 16, brightness: 75, volume: 50,
  layoutMode: 'Comfortable', communicationChannels: [], interests: [],
  rating: 0, priority: '', startTime: '', endTime: '', startDate: '', endDate: '',
  receiveNewsletter: true, enableAnalytics: false, darkMode: false, autoSave: true,
};

const initSocial: SocialContent = {
  linkedin: '', github: '', twitter: '', portfolio: '',
  bio: '', coverLetter: '', tags: [], referralSource: '', otherReferral: '',
};

const initAgreements: Agreements = {
  agreeTerms: false, agreePrivacy: false, agreeMarketing: false,
  signatureData: '', additionalNotes: '',
};

/* ── Component ── */

export function AdvancedForm() {
  const { addToast } = useUI();
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [completed, setCompleted] = useState<Set<number>>(new Set());

  const [personal, setPersonal] = useState(initPersonal);
  const [contact, setContact] = useState(initContact);
  const [eduWork, setEduWork] = useState(initEduWork);
  const [financial, setFinancial] = useState(initFinancial);
  const [preferences, setPreferences] = useState(initPreferences);
  const [social, setSocial] = useState(initSocial);
  const [agreements, setAgreements] = useState(initAgreements);

  function clearError(field: string) {
    if (errors[field]) {
      setErrors((prev) => { const next = { ...prev }; delete next[field]; return next; });
    }
  }

  function validate(s: number) {
    return validateStep(s, personal, contact, eduWork, financial, preferences, social, agreements);
  }

  function handleNext() {
    const errs = validate(step);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      addToast({ type: 'error', message: 'Please fix the errors before proceeding.' });
      return;
    }
    setCompleted((prev) => new Set(prev).add(step));
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function handleBack() {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
  }

  function handleStepClick(idx: number) {
    setErrors({});
    setStep(idx);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate(step);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      addToast({ type: 'error', message: 'Please fix the errors before submitting.' });
      return;
    }
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 2500));
    setIsSubmitting(false);
    addToast({ type: 'success', message: 'Application submitted successfully!' });
  }

  const progressPercent = Math.round((completed.size / STEPS.length) * 100);

  return (
    <div className="mx-auto">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Advanced Application Form</h1>
          <p className="mt-1 text-sm text-gray-500">
            Complete all 7 steps — every field type for learning.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs text-gray-400">Progress</p>
            <p className="text-sm font-semibold text-primary">{progressPercent}%</p>
          </div>
          <div className="h-2 w-32 overflow-hidden rounded-full bg-gray-200">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </div>

      <StepIndicator currentStep={step} onStepClick={handleStepClick} completedSteps={completed} />

      <form onSubmit={handleSubmit} noValidate>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Step {step + 1}: {STEPS[step].label}
            </h2>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
              {step + 1} of {STEPS.length}
            </span>
          </div>

          {step === 0 && (
            <PersonalDetailsStep data={personal} errors={errors} clearError={clearError}
              onChange={(u) => setPersonal((p) => ({ ...p, ...u }))} />
          )}
          {step === 1 && (
            <ContactAddressStep data={contact} errors={errors} clearError={clearError}
              onChange={(u) => setContact((p) => ({ ...p, ...u }))} />
          )}
          {step === 2 && (
            <EducationWorkStep data={eduWork} errors={errors} clearError={clearError}
              onChange={(u) => setEduWork((p) => ({ ...p, ...u }))} />
          )}
          {step === 3 && (
            <FinancialDocsStep data={financial} errors={errors} clearError={clearError}
              onChange={(u) => setFinancial((p) => ({ ...p, ...u }))} />
          )}
          {step === 4 && (
            <PreferencesStep data={preferences} errors={errors}
              onChange={(u) => setPreferences((p) => ({ ...p, ...u }))} />
          )}
          {step === 5 && (
            <SocialContentStep data={social} errors={errors} clearError={clearError}
              onChange={(u) => setSocial((p) => ({ ...p, ...u }))} />
          )}
          {step === 6 && (
            <ReviewSubmitStep
              personal={personal} contact={contact} eduWork={eduWork}
              financial={financial} preferences={preferences} social={social}
              agreements={agreements} errors={errors} clearError={clearError}
              onAgreementsChange={(u) => setAgreements((a) => ({ ...a, ...u }))}
            />
          )}
        </div>

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between">
          <Button type="button" variant="outline" onClick={handleBack}
            disabled={step === 0} className={step === 0 ? 'invisible' : ''}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>

          <div className="flex gap-3">
            {step === STEPS.length - 1 ? (
              <Button type="submit" isLoading={isSubmitting}>
                <Check className="mr-2 h-4 w-4" /> Submit Application
              </Button>
            ) : (
              <Button type="button" onClick={handleNext}>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
