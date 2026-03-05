import { User, Briefcase, Shield, FileText } from 'lucide-react';
import type { DropdownOption } from '@/components/common';

export const STEPS = [
  { key: 'personal' as const, label: 'Personal', icon: User },
  { key: 'professional' as const, label: 'Professional', icon: Briefcase },
  { key: 'account' as const, label: 'Account', icon: Shield },
  { key: 'review' as const, label: 'Review', icon: FileText },
];

export const DEPARTMENT_OPTIONS: DropdownOption[] = [
  { value: 'engineering', label: 'Engineering' },
  { value: 'design', label: 'Design' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
  { value: 'hr', label: 'Human Resources' },
  { value: 'finance', label: 'Finance' },
  { value: 'operations', label: 'Operations' },
];

export const EXPERIENCE_OPTIONS: DropdownOption[] = [
  { value: '0-1', label: '0-1 years' },
  { value: '2-4', label: '2-4 years' },
  { value: '5-9', label: '5-9 years' },
  { value: '10+', label: '10+ years' },
];

export const THEME_OPTIONS: DropdownOption[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
];

export const SKILL_SUGGESTIONS = [
  'React', 'TypeScript', 'Node.js', 'Python', 'SQL', 'AWS',
  'Docker', 'Git', 'Figma', 'Tailwind CSS', 'GraphQL', 'REST API',
];
