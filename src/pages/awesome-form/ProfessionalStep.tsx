import { useState } from 'react';
import { X } from 'lucide-react';
import { Button, Input, Dropdown } from '@/components/common';
import type { ProfessionalInfo, FormErrors } from './types';
import { DEPARTMENT_OPTIONS, EXPERIENCE_OPTIONS, SKILL_SUGGESTIONS } from './constants';

interface Props {
  data: ProfessionalInfo;
  errors: FormErrors;
  onChange: (update: Partial<ProfessionalInfo>) => void;
  clearError: (field: string) => void;
}

export function ProfessionalStep({ data, errors, onChange, clearError }: Props) {
  const [skillInput, setSkillInput] = useState('');

  function addSkill(skill: string) {
    const trimmed = skill.trim();
    if (!trimmed || data.skills.includes(trimmed)) return;
    onChange({ skills: [...data.skills, trimmed] });
    setSkillInput('');
  }

  function removeSkill(skill: string) {
    onChange({ skills: data.skills.filter((s) => s !== skill) });
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          id="company" label="Company" placeholder="Acme Inc."
          value={data.company}
          onChange={(e) => { onChange({ company: e.target.value }); clearError('company'); }}
          error={errors.company} required
        />
        <Input
          id="jobTitle" label="Job Title" placeholder="Senior Developer"
          value={data.jobTitle}
          onChange={(e) => { onChange({ jobTitle: e.target.value }); clearError('jobTitle'); }}
          error={errors.jobTitle} required
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Department <span className="text-error">*</span></label>
          <Dropdown
            options={DEPARTMENT_OPTIONS}
            value={data.department}
            onChange={(v) => { onChange({ department: v }); clearError('department'); }}
            placeholder="Select Department"
          />
          {errors.department && <p className="mt-1 text-sm text-error">{errors.department}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Experience <span className="text-error">*</span></label>
          <Dropdown
            options={EXPERIENCE_OPTIONS}
            value={data.experience}
            onChange={(v) => { onChange({ experience: v }); clearError('experience'); }}
            placeholder="Select Experience"
          />
          {errors.experience && <p className="mt-1 text-sm text-error">{errors.experience}</p>}
        </div>
      </div>

      {/* Salary Range Slider */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Expected Salary: <span className="font-semibold text-primary">${data.salary.toLocaleString()}</span>
        </label>
        <input
          type="range" min={20000} max={300000} step={5000}
          value={data.salary}
          onChange={(e) => onChange({ salary: Number(e.target.value) })}
          className="mt-2 w-full accent-primary"
        />
        <div className="mt-1 flex justify-between text-xs text-gray-400">
          <span>$20,000</span>
          <span>$300,000</span>
        </div>
      </div>

      {/* Skills Tags */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Skills</label>
        <div className="flex gap-2">
          <input
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill(skillInput); } }}
            placeholder="Type a skill and press Enter"
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <Button type="button" size="sm" onClick={() => addSkill(skillInput)} disabled={!skillInput.trim()}>
            Add
          </Button>
        </div>
        {data.skills.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span key={skill} className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                {skill}
                <button type="button" onClick={() => removeSkill(skill)} className="rounded-full p-0.5 hover:bg-primary/20">
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
        <div className="mt-3">
          <p className="mb-1.5 text-xs text-gray-400">Quick add:</p>
          <div className="flex flex-wrap gap-1.5">
            {SKILL_SUGGESTIONS.filter((s) => !data.skills.includes(s)).slice(0, 8).map((s) => (
              <button
                key={s} type="button" onClick={() => addSkill(s)}
                className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs text-gray-600 transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary"
              >
                + {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bio */}
      <div>
        <label htmlFor="bio" className="mb-1 block text-sm font-medium text-gray-700">Bio</label>
        <textarea
          id="bio" rows={4} placeholder="Tell us about yourself..."
          value={data.bio}
          onChange={(e) => onChange({ bio: e.target.value })}
          maxLength={500}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <p className="mt-1 text-right text-xs text-gray-400">{data.bio.length}/500</p>
      </div>
    </div>
  );
}
