import { User, Phone, GraduationCap, Landmark, SlidersHorizontal, Share2 } from 'lucide-react';
import type {
  PersonalDetails, ContactAddress, EducationWork,
  FinancialDocs, Preferences, SocialContent, Agreements, FormErrors,
} from './types';
import {
  PREFIX_OPTIONS, NATIONALITY_OPTIONS, COUNTRY_OPTIONS,
  DEGREE_OPTIONS, INCOME_OPTIONS, CURRENCY_OPTIONS,
} from './constants';
import { SignaturePad } from './SignaturePad';

interface Props {
  personal: PersonalDetails;
  contact: ContactAddress;
  eduWork: EducationWork;
  financial: FinancialDocs;
  preferences: Preferences;
  social: SocialContent;
  agreements: Agreements;
  errors: FormErrors;
  onAgreementsChange: (u: Partial<Agreements>) => void;
  clearError: (f: string) => void;
}

function ReviewSection({ title, icon: Icon, items }: {
  title: string;
  icon: typeof User;
  items: { label: string; value: string }[];
}) {
  return (
    <div className="rounded-lg border border-gray-200">
      <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50/50 px-4 py-3">
        <Icon className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="divide-y divide-gray-50 px-4">
        {items.filter((i) => i.value).map((item) => (
          <div key={item.label} className="flex items-start justify-between gap-4 py-2.5">
            <span className="shrink-0 text-sm text-gray-500">{item.label}</span>
            <span className="text-right text-sm font-medium text-gray-800">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function findLabel(options: { value: string; label: string }[], val: string) {
  return options.find((o) => o.value === val)?.label || val;
}

export function ReviewSubmitStep({
  personal, contact, eduWork, financial, preferences, social,
  agreements, errors, onAgreementsChange, clearError,
}: Props) {
  const fullName = [
    findLabel(PREFIX_OPTIONS, personal.prefix),
    personal.firstName, personal.middleName, personal.lastName, personal.suffix,
  ].filter(Boolean).join(' ');

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-blue-50 p-4">
        <p className="text-sm font-medium text-blue-800">
          Review all your information carefully. You can go back to any step to make changes.
        </p>
      </div>

      {/* Personal */}
      <ReviewSection title="Personal Details" icon={User} items={[
        { label: 'Full Name', value: fullName },
        { label: 'Gender', value: personal.gender },
        { label: 'Date of Birth', value: personal.dateOfBirth },
        { label: 'Nationality', value: findLabel(NATIONALITY_OPTIONS, personal.nationality) },
        { label: 'Marital Status', value: personal.maritalStatus },
        { label: 'Blood Group', value: personal.bloodGroup.toUpperCase() },
      ]} />

      {/* Contact */}
      <ReviewSection title="Contact & Address" icon={Phone} items={[
        { label: 'Email', value: contact.email },
        { label: 'Secondary Email', value: contact.secondaryEmail },
        { label: 'Phone', value: `${contact.phoneCode} ${contact.phone}` },
        { label: 'Website', value: contact.website },
        { label: 'Address', value: [contact.street, contact.apartment, contact.city, contact.state, contact.zipCode].filter(Boolean).join(', ') },
        { label: 'Country', value: findLabel(COUNTRY_OPTIONS, contact.country) },
      ]} />

      {/* Education */}
      <div className="rounded-lg border border-gray-200">
        <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50/50 px-4 py-3">
          <GraduationCap className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold text-gray-800">Education & Work</h3>
        </div>
        <div className="space-y-3 p-4">
          {eduWork.education.map((ed) => (
            <div key={ed.id} className="rounded-md bg-gray-50 px-3 py-2">
              <p className="text-sm font-medium text-gray-800">
                {findLabel(DEGREE_OPTIONS, ed.degree)} — {ed.institution}
              </p>
              <p className="text-xs text-gray-500">
                {ed.fieldOfStudy} {ed.startYear && ed.endYear ? `(${ed.startYear}–${ed.endYear})` : ''}
                {ed.gpa ? ` • GPA: ${ed.gpa}` : ''}
              </p>
            </div>
          ))}
          {eduWork.work.map((w) => (
            <div key={w.id} className="rounded-md bg-gray-50 px-3 py-2">
              <p className="text-sm font-medium text-gray-800">{w.position} at {w.company}</p>
              <p className="text-xs text-gray-500">
                {w.startDate} — {w.isCurrent ? 'Present' : w.endDate}
              </p>
            </div>
          ))}
          {eduWork.certifications.length > 0 && (
            <p className="text-sm text-gray-600">
              <span className="font-medium">Certifications:</span> {eduWork.certifications.join(', ')}
            </p>
          )}
          {eduWork.languages.length > 0 && (
            <p className="text-sm text-gray-600">
              <span className="font-medium">Languages:</span>{' '}
              {eduWork.languages.map((l) => `${l.name} (${l.proficiency})`).join(', ')}
            </p>
          )}
        </div>
      </div>

      {/* Financial */}
      <ReviewSection title="Financial" icon={Landmark} items={[
        { label: 'Income Range', value: findLabel(INCOME_OPTIONS, financial.incomeRange) },
        { label: 'Currency', value: findLabel(CURRENCY_OPTIONS, financial.currency) },
        { label: 'Bank', value: financial.bankName },
        { label: 'Documents', value: `${financial.documents.length} file(s) uploaded` },
      ]} />

      {/* Preferences */}
      <ReviewSection title="Preferences" icon={SlidersHorizontal} items={[
        { label: 'Layout', value: preferences.layoutMode },
        { label: 'Priority', value: preferences.priority },
        { label: 'Rating', value: preferences.rating ? `${preferences.rating}/5` : '' },
        { label: 'Communication', value: preferences.communicationChannels.join(', ') },
        { label: 'Interests', value: preferences.interests.join(', ') },
      ]} />

      {/* Social */}
      <ReviewSection title="Social & Content" icon={Share2} items={[
        { label: 'LinkedIn', value: social.linkedin },
        { label: 'GitHub', value: social.github },
        { label: 'Twitter', value: social.twitter },
        { label: 'Portfolio', value: social.portfolio },
        { label: 'Tags', value: social.tags.map((t) => `#${t}`).join(', ') },
      ]} />

      {/* ═══ Agreements ═══ */}
      <div className="rounded-lg border border-gray-200 p-4">
        <h3 className="mb-4 text-sm font-semibold text-gray-800">Agreements</h3>
        <div className="space-y-3">
          <label className="flex items-start gap-3">
            <input type="checkbox" checked={agreements.agreeTerms}
              onChange={(e) => { onAgreementsChange({ agreeTerms: e.target.checked }); clearError('agreeTerms'); }}
              className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-primary" />
            <div>
              <span className="text-sm text-gray-700">
                I agree to the <span className="font-medium text-primary">Terms of Service</span> <span className="text-error">*</span>
              </span>
              {errors.agreeTerms && <p className="text-xs text-error">{errors.agreeTerms}</p>}
            </div>
          </label>
          <label className="flex items-start gap-3">
            <input type="checkbox" checked={agreements.agreePrivacy}
              onChange={(e) => { onAgreementsChange({ agreePrivacy: e.target.checked }); clearError('agreePrivacy'); }}
              className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-primary" />
            <div>
              <span className="text-sm text-gray-700">
                I agree to the <span className="font-medium text-primary">Privacy Policy</span> <span className="text-error">*</span>
              </span>
              {errors.agreePrivacy && <p className="text-xs text-error">{errors.agreePrivacy}</p>}
            </div>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" checked={agreements.agreeMarketing}
              onChange={(e) => onAgreementsChange({ agreeMarketing: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300 accent-primary" />
            <span className="text-sm text-gray-700">I'd like to receive marketing communications (optional)</span>
          </label>
        </div>
      </div>

      {/* ═══ Signature ═══ */}
      <SignaturePad
        value={agreements.signatureData}
        onChange={(v) => { onAgreementsChange({ signatureData: v }); clearError('signatureData'); }}
        error={errors.signatureData}
      />

      {/* ═══ Additional Notes ═══ */}
      <div>
        <label htmlFor="notes" className="mb-1 block text-sm font-semibold text-gray-800">Additional Notes</label>
        <textarea id="notes" rows={3} placeholder="Anything else you'd like us to know..."
          value={agreements.additionalNotes}
          onChange={(e) => onAgreementsChange({ additionalNotes: e.target.value })}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>
    </div>
  );
}
