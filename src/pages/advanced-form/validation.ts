import type {
  PersonalDetails, ContactAddress, EducationWork,
  FinancialDocs, Preferences, SocialContent, Agreements, FormErrors,
} from './types';

export function validateStep(
  step: number,
  personal: PersonalDetails,
  contact: ContactAddress,
  eduWork: EducationWork,
  financial: FinancialDocs,
  _prefs: Preferences,
  social: SocialContent,
  agreements: Agreements,
): FormErrors {
  const e: FormErrors = {};

  if (step === 0) {
    if (!personal.prefix) e.prefix = 'Select a prefix';
    if (!personal.firstName.trim()) e.firstName = 'First name is required';
    if (!personal.lastName.trim()) e.lastName = 'Last name is required';
    if (!personal.gender) e.gender = 'Select gender';
    if (!personal.dateOfBirth) e.dateOfBirth = 'Date of birth is required';
    if (!personal.nationality) e.nationality = 'Select nationality';
  }

  if (step === 1) {
    if (!contact.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) e.email = 'Invalid email';
    if (contact.secondaryEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.secondaryEmail))
      e.secondaryEmail = 'Invalid email';
    if (!contact.phone.trim()) e.phone = 'Phone is required';
    if (!contact.street.trim()) e.street = 'Street address is required';
    if (!contact.city.trim()) e.city = 'City is required';
    if (!contact.state.trim()) e.state = 'State is required';
    if (!contact.zipCode.trim()) e.zipCode = 'ZIP code is required';
    if (!contact.country) e.country = 'Select a country';
    if (contact.website && !/^https?:\/\/.+\..+/.test(contact.website)) e.website = 'Invalid URL (include http/https)';
  }

  if (step === 2) {
    if (eduWork.education.length === 0) e.education = 'Add at least one education entry';
    eduWork.education.forEach((ed, i) => {
      if (!ed.degree) e[`edu_degree_${i}`] = 'Required';
      if (!ed.institution.trim()) e[`edu_inst_${i}`] = 'Required';
    });
  }

  if (step === 3) {
    if (!financial.incomeRange) e.incomeRange = 'Select income range';
    if (!financial.currency) e.currency = 'Select currency';
  }

  // Step 4 (preferences) - no required fields

  if (step === 5) {
    if (social.linkedin && !/^https?:\/\/.+/.test(social.linkedin)) e.linkedin = 'Invalid URL';
    if (social.github && !/^https?:\/\/.+/.test(social.github)) e.github = 'Invalid URL';
    if (social.twitter && !/^https?:\/\/.+/.test(social.twitter)) e.twitter = 'Invalid URL';
    if (social.portfolio && !/^https?:\/\/.+/.test(social.portfolio)) e.portfolio = 'Invalid URL';
  }

  if (step === 6) {
    if (!agreements.agreeTerms) e.agreeTerms = 'You must agree to the Terms';
    if (!agreements.agreePrivacy) e.agreePrivacy = 'You must agree to the Privacy Policy';
    if (!agreements.signatureData) e.signatureData = 'Signature is required';
  }

  return e;
}
