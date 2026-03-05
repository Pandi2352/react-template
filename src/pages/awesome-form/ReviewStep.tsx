import { User, Briefcase, Shield } from 'lucide-react';
import type { PersonalInfo, ProfessionalInfo, AccountSettings } from './types';
import { DEPARTMENT_OPTIONS, EXPERIENCE_OPTIONS, THEME_OPTIONS } from './constants';

interface Props {
  personal: PersonalInfo;
  professional: ProfessionalInfo;
  account: AccountSettings;
}

export function ReviewStep({ personal, professional, account }: Props) {
  const sections = [
    {
      title: 'Personal Information',
      icon: User,
      items: [
        { label: 'Name', value: `${personal.firstName} ${personal.lastName}` },
        { label: 'Email', value: personal.email },
        { label: 'Phone', value: personal.phone || 'Not provided' },
        { label: 'Date of Birth', value: personal.dateOfBirth || 'Not provided' },
      ],
    },
    {
      title: 'Professional Information',
      icon: Briefcase,
      items: [
        { label: 'Company', value: professional.company },
        { label: 'Job Title', value: professional.jobTitle },
        { label: 'Department', value: DEPARTMENT_OPTIONS.find((o) => o.value === professional.department)?.label || '' },
        { label: 'Experience', value: EXPERIENCE_OPTIONS.find((o) => o.value === professional.experience)?.label || '' },
        { label: 'Expected Salary', value: `$${professional.salary.toLocaleString()}` },
        { label: 'Skills', value: professional.skills.join(', ') || 'None' },
      ],
    },
    {
      title: 'Account Settings',
      icon: Shield,
      items: [
        { label: 'Username', value: account.username },
        { label: 'Theme', value: THEME_OPTIONS.find((o) => o.value === account.theme)?.label || '' },
        { label: 'Email Notifications', value: account.notifications.email ? 'Enabled' : 'Disabled' },
        { label: 'SMS Notifications', value: account.notifications.sms ? 'Enabled' : 'Disabled' },
        { label: 'Push Notifications', value: account.notifications.push ? 'Enabled' : 'Disabled' },
      ],
    },
  ];

  return (
    <div className="space-y-5">
      <div className="rounded-lg bg-green-50 p-4">
        <p className="text-sm font-medium text-green-800">Almost done! Review your information below and submit.</p>
      </div>

      {sections.map((section) => {
        const Icon = section.icon;
        return (
          <div key={section.title} className="rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-3">
              <Icon className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-gray-800">{section.title}</h3>
            </div>
            <div className="divide-y divide-gray-50 px-4">
              {section.items.map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2.5">
                  <span className="text-sm text-gray-500">{item.label}</span>
                  <span className="text-sm font-medium text-gray-800">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {personal.avatarPreview && (
        <div className="flex items-center gap-3 rounded-lg border border-gray-200 p-4">
          <img src={personal.avatarPreview} alt="Avatar" className="h-12 w-12 rounded-full object-cover" />
          <div>
            <p className="text-sm font-medium text-gray-800">Profile Photo</p>
            <p className="text-xs text-gray-500">{personal.avatar?.name}</p>
          </div>
        </div>
      )}
    </div>
  );
}
