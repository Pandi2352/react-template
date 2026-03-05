import { useState, type FormEvent } from 'react';
import { Send, RotateCcw } from 'lucide-react';
import { Button, Input } from '@/components/common';
import { useUI } from '@/hooks';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const initialData: FormData = { name: '', email: '', subject: '', message: '' };

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = 'Name is required';
  if (!data.email.trim()) errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Invalid email address';
  if (!data.subject.trim()) errors.subject = 'Subject is required';
  if (!data.message.trim()) errors.message = 'Message is required';
  else if (data.message.trim().length < 10) errors.message = 'Message must be at least 10 characters';
  return errors;
}

export function SimpleForm() {
  const { addToast } = useUI();
  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<Set<string>>(new Set());

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched.has(field)) {
      const newErrors = validate({ ...formData, [field]: value });
      setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
    }
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched((prev) => new Set(prev).add(field));
    const newErrors = validate(formData);
    setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newErrors = validate(formData);
    setErrors(newErrors);
    setTouched(new Set(['name', 'email', 'subject', 'message']));

    if (Object.keys(newErrors).length > 0) {
      addToast({ type: 'error', message: 'Please fix the errors before submitting.' });
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);

    addToast({ type: 'success', message: 'Message sent successfully!' });
    setFormData(initialData);
    setErrors({});
    setTouched(new Set());
  };

  const handleReset = () => {
    setFormData(initialData);
    setErrors({});
    setTouched(new Set());
  };

  return (
    <div className="mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Contact Us</h1>
        <p className="mt-1 text-sm text-gray-500">Fill out the form below and we'll get back to you shortly.</p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="space-y-5">
          <Input
            id="name"
            label="Full Name"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            error={errors.name}
            required
          />

          <Input
            id="email"
            label="Email Address"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            error={errors.email}
            required
          />

          <Input
            id="subject"
            label="Subject"
            placeholder="What is this about?"
            value={formData.subject}
            onChange={(e) => handleChange('subject', e.target.value)}
            onBlur={() => handleBlur('subject')}
            error={errors.subject}
            required
          />

          <div className="w-full">
            <label htmlFor="message" className="mb-1 block text-sm font-medium text-gray-700">
              Message <span className="text-error">*</span>
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="Tell us more about your inquiry..."
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              onBlur={() => handleBlur('message')}
              className={`w-full rounded-lg border px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
                errors.message
                  ? 'border-error focus:border-error focus:ring-error/50'
                  : 'border-gray-300 focus:border-primary focus:ring-primary/50'
              }`}
            />
            <div className="mt-1 flex items-center justify-between">
              {errors.message && <p className="text-sm text-error">{errors.message}</p>}
              <p className="ml-auto text-xs text-gray-400">{formData.message.length} characters</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <Button type="submit" isLoading={isSubmitting}>
            <Send className="mr-2 h-4 w-4" />
            Send Message
          </Button>
          <Button type="button" variant="outline" onClick={handleReset} disabled={isSubmitting}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
}
