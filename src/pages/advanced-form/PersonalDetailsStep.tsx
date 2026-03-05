import { Input, Dropdown } from '@/components/common';
import { cn } from '@/utils';
import type { PersonalDetails, FormErrors } from './types';
import {
  PREFIX_OPTIONS, SUFFIX_OPTIONS, GENDER_OPTIONS,
  MARITAL_OPTIONS, BLOOD_GROUP_OPTIONS, NATIONALITY_OPTIONS,
} from './constants';

interface Props {
  data: PersonalDetails;
  errors: FormErrors;
  onChange: (u: Partial<PersonalDetails>) => void;
  clearError: (f: string) => void;
}

export function PersonalDetailsStep({ data, errors, onChange, clearError }: Props) {
  const age = data.dateOfBirth
    ? Math.floor((Date.now() - new Date(data.dateOfBirth).getTime()) / (365.25 * 24 * 60 * 60 * 1000))
    : null;

  return (
    <div className="space-y-6">
      {/* Prefix / Name / Suffix */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-6">
        <div className="col-span-2 sm:col-span-1">
          <label className="mb-1 block text-sm font-medium text-gray-700">Prefix <span className="text-error">*</span></label>
          <Dropdown
            options={PREFIX_OPTIONS} value={data.prefix} placeholder="Title"
            onChange={(v) => { onChange({ prefix: v }); clearError('prefix'); }}
          />
          {errors.prefix && <p className="mt-1 text-xs text-error">{errors.prefix}</p>}
        </div>
        <div className="col-span-2 sm:col-span-2">
          <Input
            id="firstName" label="First Name" placeholder="John" required
            value={data.firstName} error={errors.firstName}
            onChange={(e) => { onChange({ firstName: e.target.value }); clearError('firstName'); }}
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <Input
            id="middleName" label="Middle" placeholder="M."
            value={data.middleName}
            onChange={(e) => onChange({ middleName: e.target.value })}
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <Input
            id="lastName" label="Last Name" placeholder="Doe" required
            value={data.lastName} error={errors.lastName}
            onChange={(e) => { onChange({ lastName: e.target.value }); clearError('lastName'); }}
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="mb-1 block text-sm font-medium text-gray-700">Suffix</label>
          <Dropdown
            options={SUFFIX_OPTIONS} value={data.suffix} placeholder="—"
            onChange={(v) => onChange({ suffix: v })}
          />
        </div>
      </div>

      {/* Gender - Radio Group */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Gender <span className="text-error">*</span></label>
        <div className="flex flex-wrap gap-3">
          {GENDER_OPTIONS.map((g) => (
            <label
              key={g}
              className={cn(
                'flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2.5 text-sm transition-colors',
                data.gender === g
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300',
              )}
            >
              <input
                type="radio" name="gender" value={g} checked={data.gender === g}
                onChange={() => { onChange({ gender: g }); clearError('gender'); }}
                className="sr-only"
              />
              <span className={cn(
                'flex h-4 w-4 items-center justify-center rounded-full border-2',
                data.gender === g ? 'border-primary' : 'border-gray-300',
              )}>
                {data.gender === g && <span className="h-2 w-2 rounded-full bg-primary" />}
              </span>
              {g}
            </label>
          ))}
        </div>
        {errors.gender && <p className="mt-1 text-sm text-error">{errors.gender}</p>}
      </div>

      {/* DOB + Auto Age + Nationality */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <Input
            id="dob" label="Date of Birth" type="date" required
            value={data.dateOfBirth} error={errors.dateOfBirth}
            onChange={(e) => { onChange({ dateOfBirth: e.target.value }); clearError('dateOfBirth'); }}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Age</label>
          <div className="flex h-[42px] items-center rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-600">
            {age !== null && age >= 0 ? `${age} years old` : '—'}
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Nationality <span className="text-error">*</span></label>
          <Dropdown
            options={NATIONALITY_OPTIONS} value={data.nationality} placeholder="Select..."
            onChange={(v) => { onChange({ nationality: v }); clearError('nationality'); }}
          />
          {errors.nationality && <p className="mt-1 text-xs text-error">{errors.nationality}</p>}
        </div>
      </div>

      {/* Marital Status + Blood Group */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Marital Status</label>
          <Dropdown
            options={MARITAL_OPTIONS} value={data.maritalStatus} placeholder="Select..."
            onChange={(v) => onChange({ maritalStatus: v })}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Blood Group</label>
          <Dropdown
            options={BLOOD_GROUP_OPTIONS} value={data.bloodGroup} placeholder="Select..."
            onChange={(v) => onChange({ bloodGroup: v })}
          />
        </div>
      </div>
    </div>
  );
}
