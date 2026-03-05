import {
  User, Phone, GraduationCap, Landmark, SlidersHorizontal,
  Share2, FileCheck, type LucideIcon,
} from 'lucide-react';
import type { DropdownOption } from '@/components/common';

/* ── Steps ── */
export interface StepDef {
  key: string;
  label: string;
  icon: LucideIcon;
}

export const STEPS: StepDef[] = [
  { key: 'personal', label: 'Personal', icon: User },
  { key: 'contact', label: 'Contact & Address', icon: Phone },
  { key: 'education', label: 'Education & Work', icon: GraduationCap },
  { key: 'financial', label: 'Financial & Docs', icon: Landmark },
  { key: 'preferences', label: 'Preferences', icon: SlidersHorizontal },
  { key: 'social', label: 'Social & Content', icon: Share2 },
  { key: 'agreements', label: 'Review & Submit', icon: FileCheck },
];

/* ── Options ── */
export const PREFIX_OPTIONS: DropdownOption[] = [
  { value: 'mr', label: 'Mr.' },
  { value: 'mrs', label: 'Mrs.' },
  { value: 'ms', label: 'Ms.' },
  { value: 'dr', label: 'Dr.' },
  { value: 'prof', label: 'Prof.' },
];

export const SUFFIX_OPTIONS: DropdownOption[] = [
  { value: '', label: 'None' },
  { value: 'jr', label: 'Jr.' },
  { value: 'sr', label: 'Sr.' },
  { value: 'ii', label: 'II' },
  { value: 'iii', label: 'III' },
];

export const GENDER_OPTIONS = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];

export const MARITAL_OPTIONS: DropdownOption[] = [
  { value: 'single', label: 'Single' },
  { value: 'married', label: 'Married' },
  { value: 'divorced', label: 'Divorced' },
  { value: 'widowed', label: 'Widowed' },
];

export const BLOOD_GROUP_OPTIONS: DropdownOption[] = [
  { value: 'a+', label: 'A+' }, { value: 'a-', label: 'A-' },
  { value: 'b+', label: 'B+' }, { value: 'b-', label: 'B-' },
  { value: 'ab+', label: 'AB+' }, { value: 'ab-', label: 'AB-' },
  { value: 'o+', label: 'O+' }, { value: 'o-', label: 'O-' },
];

export const NATIONALITY_OPTIONS: DropdownOption[] = [
  { value: 'us', label: 'United States' }, { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' }, { value: 'au', label: 'Australia' },
  { value: 'in', label: 'India' }, { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' }, { value: 'jp', label: 'Japan' },
  { value: 'br', label: 'Brazil' }, { value: 'sg', label: 'Singapore' },
];

export const COUNTRY_OPTIONS: DropdownOption[] = NATIONALITY_OPTIONS;

export const PHONE_CODE_OPTIONS: DropdownOption[] = [
  { value: '+1', label: '+1 (US/CA)' }, { value: '+44', label: '+44 (UK)' },
  { value: '+91', label: '+91 (IN)' }, { value: '+61', label: '+61 (AU)' },
  { value: '+49', label: '+49 (DE)' }, { value: '+33', label: '+33 (FR)' },
  { value: '+81', label: '+81 (JP)' }, { value: '+55', label: '+55 (BR)' },
  { value: '+65', label: '+65 (SG)' }, { value: '+86', label: '+86 (CN)' },
];

export const DEGREE_OPTIONS: DropdownOption[] = [
  { value: 'highschool', label: 'High School' },
  { value: 'associate', label: 'Associate Degree' },
  { value: 'bachelor', label: "Bachelor's Degree" },
  { value: 'master', label: "Master's Degree" },
  { value: 'phd', label: 'Ph.D.' },
  { value: 'diploma', label: 'Diploma' },
  { value: 'certificate', label: 'Certificate' },
];

export const PROFICIENCY_OPTIONS: DropdownOption[] = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'native', label: 'Native' },
];

export const INCOME_OPTIONS: DropdownOption[] = [
  { value: 'below-25k', label: 'Below $25,000' },
  { value: '25k-50k', label: '$25,000 - $50,000' },
  { value: '50k-100k', label: '$50,000 - $100,000' },
  { value: '100k-200k', label: '$100,000 - $200,000' },
  { value: 'above-200k', label: 'Above $200,000' },
];

export const CURRENCY_OPTIONS: DropdownOption[] = [
  { value: 'usd', label: 'USD ($)' }, { value: 'eur', label: 'EUR' },
  { value: 'gbp', label: 'GBP' }, { value: 'inr', label: 'INR' },
  { value: 'aud', label: 'AUD' }, { value: 'jpy', label: 'JPY' },
];

export const LAYOUT_OPTIONS = ['Compact', 'Comfortable', 'Spacious'];

export const COMMUNICATION_OPTIONS = [
  'Email', 'Phone', 'SMS', 'WhatsApp', 'Slack', 'Teams',
];

export const INTEREST_OPTIONS = [
  'Technology', 'Design', 'Business', 'Science', 'Art', 'Music',
  'Sports', 'Travel', 'Photography', 'Gaming', 'Reading', 'Cooking',
];

export const PRIORITY_OPTIONS = ['Low', 'Medium', 'High', 'Critical'];

export const REFERRAL_OPTIONS: DropdownOption[] = [
  { value: 'google', label: 'Google Search' },
  { value: 'social', label: 'Social Media' },
  { value: 'friend', label: 'Friend / Colleague' },
  { value: 'blog', label: 'Blog / Article' },
  { value: 'event', label: 'Conference / Event' },
  { value: 'other', label: 'Other' },
];

export const LANGUAGE_SUGGESTIONS = [
  'English', 'Spanish', 'French', 'German', 'Hindi',
  'Mandarin', 'Japanese', 'Arabic', 'Portuguese', 'Korean',
];

export const CERTIFICATION_SUGGESTIONS = [
  'AWS Solutions Architect', 'Google Cloud Professional', 'PMP',
  'Scrum Master', 'CPA', 'CISSP', 'CompTIA A+', 'CCNA',
];
