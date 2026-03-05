export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  avatar: File | null;
  avatarPreview: string;
}

export interface ProfessionalInfo {
  company: string;
  jobTitle: string;
  department: string;
  experience: string;
  salary: number;
  skills: string[];
  bio: string;
}

export interface AccountSettings {
  username: string;
  password: string;
  confirmPassword: string;
  notifications: { email: boolean; sms: boolean; push: boolean };
  theme: string;
  agreeTerms: boolean;
}

export interface FormErrors {
  [key: string]: string | undefined;
}
