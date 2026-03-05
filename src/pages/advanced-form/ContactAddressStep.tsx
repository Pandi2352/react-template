import { MapPin } from 'lucide-react';
import { Input, Dropdown } from '@/components/common';
import { cn } from '@/utils';
import type { ContactAddress, FormErrors } from './types';
import { PHONE_CODE_OPTIONS, COUNTRY_OPTIONS } from './constants';

interface Props {
  data: ContactAddress;
  errors: FormErrors;
  onChange: (u: Partial<ContactAddress>) => void;
  clearError: (f: string) => void;
}

export function ContactAddressStep({ data, errors, onChange, clearError }: Props) {
  return (
    <div className="space-y-6">
      {/* Emails */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          id="email" label="Primary Email" type="email" placeholder="john@example.com" required
          value={data.email} error={errors.email}
          onChange={(e) => { onChange({ email: e.target.value }); clearError('email'); }}
        />
        <Input
          id="secondaryEmail" label="Secondary Email" type="email" placeholder="john.backup@example.com"
          value={data.secondaryEmail} error={errors.secondaryEmail}
          onChange={(e) => { onChange({ secondaryEmail: e.target.value }); clearError('secondaryEmail'); }}
        />
      </div>

      {/* Phone with country code */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Code</label>
          <Dropdown
            options={PHONE_CODE_OPTIONS} value={data.phoneCode} placeholder="+1"
            onChange={(v) => onChange({ phoneCode: v })}
          />
        </div>
        <Input
          id="phone" label="Phone Number" type="tel" placeholder="(555) 000-0000" required
          value={data.phone} error={errors.phone}
          onChange={(e) => { onChange({ phone: e.target.value }); clearError('phone'); }}
        />
        <Input
          id="altPhone" label="Alternate Phone" type="tel" placeholder="(555) 111-1111"
          value={data.alternatePhone}
          onChange={(e) => onChange({ alternatePhone: e.target.value })}
        />
      </div>

      {/* Website */}
      <Input
        id="website" label="Website" type="url" placeholder="https://mysite.com"
        value={data.website} error={errors.website}
        onChange={(e) => { onChange({ website: e.target.value }); clearError('website'); }}
      />

      {/* Mailing Address */}
      <div className="rounded-lg border border-gray-200 p-4">
        <div className="mb-4 flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold text-gray-800">Mailing Address</h3>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <Input
                id="street" label="Street Address" placeholder="123 Main St" required
                value={data.street} error={errors.street}
                onChange={(e) => { onChange({ street: e.target.value }); clearError('street'); }}
              />
            </div>
            <Input
              id="apartment" label="Apt / Suite / Unit" placeholder="Apt 4B"
              value={data.apartment}
              onChange={(e) => onChange({ apartment: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Input
              id="city" label="City" placeholder="New York" required
              value={data.city} error={errors.city}
              onChange={(e) => { onChange({ city: e.target.value }); clearError('city'); }}
            />
            <Input
              id="state" label="State / Province" placeholder="NY" required
              value={data.state} error={errors.state}
              onChange={(e) => { onChange({ state: e.target.value }); clearError('state'); }}
            />
            <Input
              id="zip" label="ZIP / Postal" placeholder="10001" required
              value={data.zipCode} error={errors.zipCode}
              onChange={(e) => { onChange({ zipCode: e.target.value }); clearError('zipCode'); }}
            />
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Country <span className="text-error">*</span></label>
              <Dropdown
                options={COUNTRY_OPTIONS} value={data.country} placeholder="Select..."
                onChange={(v) => { onChange({ country: v }); clearError('country'); }}
              />
              {errors.country && <p className="mt-1 text-xs text-error">{errors.country}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Same as mailing toggle */}
      <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-3">
        <input
          type="checkbox" checked={data.sameAsMailing}
          onChange={(e) => onChange({
            sameAsMailing: e.target.checked,
            ...(e.target.checked ? {
              billingStreet: data.street, billingCity: data.city,
              billingState: data.state, billingZip: data.zipCode, billingCountry: data.country,
            } : {}),
          })}
          className="h-4 w-4 rounded border-gray-300 accent-primary"
        />
        <span className="text-sm text-gray-700">Billing address same as mailing address</span>
      </label>

      {/* Billing Address (conditional) */}
      {!data.sameAsMailing && (
        <div className="rounded-lg border border-gray-200 p-4">
          <div className="mb-4 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-orange-500" />
            <h3 className="text-sm font-semibold text-gray-800">Billing Address</h3>
          </div>
          <div className="space-y-4">
            <Input
              id="billingStreet" label="Street Address" placeholder="456 Billing Ave"
              value={data.billingStreet}
              onChange={(e) => onChange({ billingStreet: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Input
                id="billingCity" label="City" placeholder="City"
                value={data.billingCity}
                onChange={(e) => onChange({ billingCity: e.target.value })}
              />
              <Input
                id="billingState" label="State" placeholder="State"
                value={data.billingState}
                onChange={(e) => onChange({ billingState: e.target.value })}
              />
              <Input
                id="billingZip" label="ZIP" placeholder="ZIP"
                value={data.billingZip}
                onChange={(e) => onChange({ billingZip: e.target.value })}
              />
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Country</label>
                <Dropdown
                  options={COUNTRY_OPTIONS} value={data.billingCountry} placeholder="Select..."
                  onChange={(v) => onChange({ billingCountry: v })}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
