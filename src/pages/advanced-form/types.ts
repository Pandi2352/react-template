/* ── Step 1: Personal Details ── */
export interface PersonalDetails {
  prefix: string;
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  gender: string;
  dateOfBirth: string;
  nationality: string;
  maritalStatus: string;
  bloodGroup: string;
}

/* ── Step 2: Contact & Address ── */
export interface ContactAddress {
  email: string;
  secondaryEmail: string;
  phoneCode: string;
  phone: string;
  alternatePhone: string;
  website: string;
  street: string;
  apartment: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  sameAsMailing: boolean;
  billingStreet: string;
  billingCity: string;
  billingState: string;
  billingZip: string;
  billingCountry: string;
}

/* ── Step 3: Education & Work ── */
export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  fieldOfStudy: string;
  startYear: string;
  endYear: string;
  gpa: string;
}

export interface WorkEntry {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
}

export interface EducationWork {
  education: EducationEntry[];
  work: WorkEntry[];
  certifications: string[];
  languages: { name: string; proficiency: string }[];
}

/* ── Step 4: Financial & Documents ── */
export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  preview?: string;
}

export interface FinancialDocs {
  incomeRange: string;
  currency: string;
  taxId: string;
  panNumber: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  documents: UploadedFile[];
}

/* ── Step 5: Preferences & Settings ── */
export interface Preferences {
  favoriteColor: string;
  fontSize: number;
  brightness: number;
  volume: number;
  layoutMode: string;
  communicationChannels: string[];
  interests: string[];
  rating: number;
  priority: string;
  startTime: string;
  endTime: string;
  startDate: string;
  endDate: string;
  receiveNewsletter: boolean;
  enableAnalytics: boolean;
  darkMode: boolean;
  autoSave: boolean;
}

/* ── Step 6: Social & Rich Content ── */
export interface SocialContent {
  linkedin: string;
  github: string;
  twitter: string;
  portfolio: string;
  bio: string;
  coverLetter: string;
  tags: string[];
  referralSource: string;
  otherReferral: string;
}

/* ── Step 7: Agreements ── */
export interface Agreements {
  agreeTerms: boolean;
  agreePrivacy: boolean;
  agreeMarketing: boolean;
  signatureData: string;
  additionalNotes: string;
}

/* ── Shared ── */
export interface FormErrors {
  [key: string]: string | undefined;
}
