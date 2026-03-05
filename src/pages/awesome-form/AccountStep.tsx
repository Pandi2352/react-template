import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input, Dropdown } from '@/components/common';
import { cn } from '@/utils';
import type { AccountSettings, FormErrors } from './types';
import { THEME_OPTIONS } from './constants';
import { getPasswordStrength } from './validation';

interface Props {
  data: AccountSettings;
  errors: FormErrors;
  onChange: (update: Partial<AccountSettings>) => void;
  clearError: (field: string) => void;
}

export function AccountStep({ data, errors, onChange, clearError }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const passwordStrength = getPasswordStrength(data.password);

  return (
    <div className="space-y-5">
      <Input
        id="username" label="Username" placeholder="johndoe"
        value={data.username}
        onChange={(e) => { onChange({ username: e.target.value }); clearError('username'); }}
        error={errors.username} required
      />

      {/* Password with strength meter */}
      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
          Password <span className="text-error">*</span>
        </label>
        <div className="relative">
          <input
            id="password" type={showPassword ? 'text' : 'password'} placeholder="Min 8 characters"
            value={data.password}
            onChange={(e) => { onChange({ password: e.target.value }); clearError('password'); }}
            className={cn(
              'w-full rounded-lg border px-3 py-2 pr-10 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2',
              errors.password ? 'border-error focus:border-error focus:ring-error/50' : 'border-gray-300 focus:border-primary focus:ring-primary/50',
            )}
          />
          <button
            type="button" onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {data.password && (
          <div className="mt-2">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
              <div className={cn('h-full rounded-full transition-all', passwordStrength.color, passwordStrength.width)} />
            </div>
            <p className="mt-1 text-xs text-gray-500">Strength: {passwordStrength.label}</p>
          </div>
        )}
        {errors.password && <p className="mt-1 text-sm text-error">{errors.password}</p>}
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium text-gray-700">
          Confirm Password <span className="text-error">*</span>
        </label>
        <div className="relative">
          <input
            id="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} placeholder="Re-enter password"
            value={data.confirmPassword}
            onChange={(e) => { onChange({ confirmPassword: e.target.value }); clearError('confirmPassword'); }}
            className={cn(
              'w-full rounded-lg border px-3 py-2 pr-10 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2',
              errors.confirmPassword ? 'border-error focus:border-error focus:ring-error/50' : 'border-gray-300 focus:border-primary focus:ring-primary/50',
            )}
          />
          <button
            type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.confirmPassword && <p className="mt-1 text-sm text-error">{errors.confirmPassword}</p>}
      </div>

      {/* Notification Toggles */}
      <div>
        <label className="mb-3 block text-sm font-medium text-gray-700">Notifications</label>
        <div className="space-y-3">
          {(['email', 'sms', 'push'] as const).map((type) => (
            <label key={type} className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 p-3">
              <span className="text-sm capitalize text-gray-700">{type} Notifications</span>
              <button
                type="button"
                role="switch"
                aria-checked={data.notifications[type]}
                onClick={() => onChange({
                  notifications: { ...data.notifications, [type]: !data.notifications[type] },
                })}
                className={cn(
                  'relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors',
                  data.notifications[type] ? 'bg-primary' : 'bg-gray-300',
                )}
              >
                <span className={cn(
                  'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transition-transform',
                  data.notifications[type] ? 'translate-x-5' : 'translate-x-0',
                )} />
              </button>
            </label>
          ))}
        </div>
      </div>

      {/* Theme Selection */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Theme Preference</label>
        <Dropdown
          options={THEME_OPTIONS}
          value={data.theme}
          onChange={(v) => onChange({ theme: v })}
        />
      </div>

      {/* Terms Checkbox */}
      <label className="flex items-start gap-3 rounded-lg border border-gray-200 p-3">
        <input
          type="checkbox" checked={data.agreeTerms}
          onChange={(e) => { onChange({ agreeTerms: e.target.checked }); clearError('agreeTerms'); }}
          className="mt-0.5 h-4 w-4 rounded border-gray-300 text-primary accent-primary"
        />
        <span className="text-sm text-gray-700">
          I agree to the <span className="font-medium text-primary">Terms of Service</span> and{' '}
          <span className="font-medium text-primary">Privacy Policy</span>
        </span>
      </label>
      {errors.agreeTerms && <p className="text-sm text-error">{errors.agreeTerms}</p>}
    </div>
  );
}
