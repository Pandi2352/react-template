import type { PersonalInfo, ProfessionalInfo, AccountSettings, FormErrors } from './types';

export function validateStep(
  step: number,
  personal: PersonalInfo,
  professional: ProfessionalInfo,
  account: AccountSettings,
): FormErrors {
  const errs: FormErrors = {};

  if (step === 0) {
    if (!personal.firstName.trim()) errs.firstName = 'First name is required';
    if (!personal.lastName.trim()) errs.lastName = 'Last name is required';
    if (!personal.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personal.email)) errs.email = 'Invalid email';
    if (personal.phone && !/^[+]?[\d\s()-]{7,15}$/.test(personal.phone)) errs.phone = 'Invalid phone number';
  } else if (step === 1) {
    if (!professional.company.trim()) errs.company = 'Company is required';
    if (!professional.jobTitle.trim()) errs.jobTitle = 'Job title is required';
    if (!professional.department) errs.department = 'Select a department';
    if (!professional.experience) errs.experience = 'Select experience level';
  } else if (step === 2) {
    if (!account.username.trim()) errs.username = 'Username is required';
    else if (account.username.length < 3) errs.username = 'Username must be at least 3 characters';
    if (!account.password) errs.password = 'Password is required';
    else if (account.password.length < 8) errs.password = 'Password must be at least 8 characters';
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(account.password))
      errs.password = 'Must contain uppercase, lowercase, and a number';
    if (account.password !== account.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    if (!account.agreeTerms) errs.agreeTerms = 'You must agree to the terms';
  }

  return errs;
}

export function getPasswordStrength(password: string) {
  if (!password) return { label: '', color: '', width: 'w-0' };
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 2) return { label: 'Weak', color: 'bg-red-500', width: 'w-1/4' };
  if (score <= 3) return { label: 'Fair', color: 'bg-orange-500', width: 'w-1/2' };
  if (score <= 4) return { label: 'Good', color: 'bg-yellow-500', width: 'w-3/4' };
  return { label: 'Strong', color: 'bg-green-500', width: 'w-full' };
}
