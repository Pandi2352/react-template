import { useRef, useState, type DragEvent } from 'react';
import { Upload, X } from 'lucide-react';
import { Input } from '@/components/common';
import { useUI } from '@/hooks';
import { cn } from '@/utils';
import type { PersonalInfo, FormErrors } from './types';

interface Props {
  data: PersonalInfo;
  errors: FormErrors;
  onChange: (update: Partial<PersonalInfo>) => void;
  clearError: (field: string) => void;
}

export function PersonalStep({ data, errors, onChange, clearError }: Props) {
  const { addToast } = useUI();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  function handleFileSelect(file: File | undefined) {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      addToast({ type: 'error', message: 'Please select an image file.' });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      addToast({ type: 'error', message: 'Image must be less than 5MB.' });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      onChange({ avatar: file, avatarPreview: reader.result as string });
    };
    reader.readAsDataURL(file);
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files[0]);
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          id="firstName" label="First Name" placeholder="John"
          value={data.firstName}
          onChange={(e) => { onChange({ firstName: e.target.value }); clearError('firstName'); }}
          error={errors.firstName} required
        />
        <Input
          id="lastName" label="Last Name" placeholder="Doe"
          value={data.lastName}
          onChange={(e) => { onChange({ lastName: e.target.value }); clearError('lastName'); }}
          error={errors.lastName} required
        />
      </div>

      <Input
        id="email" label="Email Address" type="email" placeholder="john@example.com"
        value={data.email}
        onChange={(e) => { onChange({ email: e.target.value }); clearError('email'); }}
        error={errors.email} required
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          id="phone" label="Phone Number" type="tel" placeholder="+1 (555) 000-0000"
          value={data.phone}
          onChange={(e) => { onChange({ phone: e.target.value }); clearError('phone'); }}
          error={errors.phone}
        />
        <Input
          id="dob" label="Date of Birth" type="date"
          value={data.dateOfBirth}
          onChange={(e) => onChange({ dateOfBirth: e.target.value })}
        />
      </div>

      {/* Avatar Upload */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Profile Photo</label>
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            'flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-colors',
            isDragging ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-gray-400',
          )}
        >
          {data.avatarPreview ? (
            <div className="relative">
              <img src={data.avatarPreview} alt="Avatar" className="h-24 w-24 rounded-full object-cover" />
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onChange({ avatar: null, avatarPreview: '' }); }}
                className="absolute -right-1 -top-1 rounded-full bg-error p-1 text-white shadow-md hover:bg-error/90"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ) : (
            <>
              <Upload className="mb-2 h-8 w-8 text-gray-400" />
              <p className="text-sm text-gray-600">Drag & drop or click to upload</p>
              <p className="mt-1 text-xs text-gray-400">PNG, JPG up to 5MB</p>
            </>
          )}
        </div>
        <input
          ref={fileInputRef} type="file" accept="image/*" className="hidden"
          onChange={(e) => handleFileSelect(e.target.files?.[0])}
        />
      </div>
    </div>
  );
}
