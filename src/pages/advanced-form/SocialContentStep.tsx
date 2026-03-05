import { useState } from 'react';
import { Linkedin, Github, Twitter, Globe, X } from 'lucide-react';
import { Input, Dropdown } from '@/components/common';
import type { SocialContent, FormErrors } from './types';
import { REFERRAL_OPTIONS } from './constants';

interface Props {
  data: SocialContent;
  errors: FormErrors;
  onChange: (u: Partial<SocialContent>) => void;
  clearError: (f: string) => void;
}

export function SocialContentStep({ data, errors, onChange, clearError }: Props) {
  const [tagInput, setTagInput] = useState('');

  function addTag(tag: string) {
    const trimmed = tag.trim().toLowerCase();
    if (!trimmed || data.tags.includes(trimmed)) return;
    onChange({ tags: [...data.tags, trimmed] });
    setTagInput('');
  }

  return (
    <div className="space-y-6">
      {/* ═══ Social Links ═══ */}
      <div>
        <h3 className="mb-4 text-sm font-semibold text-gray-800">Social Profiles</h3>
        <div className="space-y-3">
          <div className="flex items-end gap-3">
            <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-gray-50">
              <Linkedin className="h-5 w-5 text-[#0A66C2]" />
            </div>
            <div className="flex-1">
              <Input id="linkedin" label="LinkedIn" placeholder="https://linkedin.com/in/johndoe"
                value={data.linkedin} error={errors.linkedin}
                onChange={(e) => { onChange({ linkedin: e.target.value }); clearError('linkedin'); }} />
            </div>
          </div>
          <div className="flex items-end gap-3">
            <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-gray-50">
              <Github className="h-5 w-5 text-gray-800" />
            </div>
            <div className="flex-1">
              <Input id="github" label="GitHub" placeholder="https://github.com/johndoe"
                value={data.github} error={errors.github}
                onChange={(e) => { onChange({ github: e.target.value }); clearError('github'); }} />
            </div>
          </div>
          <div className="flex items-end gap-3">
            <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-gray-50">
              <Twitter className="h-5 w-5 text-[#1DA1F2]" />
            </div>
            <div className="flex-1">
              <Input id="twitter" label="Twitter / X" placeholder="https://twitter.com/johndoe"
                value={data.twitter} error={errors.twitter}
                onChange={(e) => { onChange({ twitter: e.target.value }); clearError('twitter'); }} />
            </div>
          </div>
          <div className="flex items-end gap-3">
            <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-gray-50">
              <Globe className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <Input id="portfolio" label="Portfolio" placeholder="https://johndoe.dev"
                value={data.portfolio} error={errors.portfolio}
                onChange={(e) => { onChange({ portfolio: e.target.value }); clearError('portfolio'); }} />
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Bio / About ═══ */}
      <div>
        <label htmlFor="bio" className="mb-1 block text-sm font-semibold text-gray-800">Short Bio</label>
        <textarea id="bio" rows={3} placeholder="Tell us about yourself in a few sentences..."
          value={data.bio} maxLength={300}
          onChange={(e) => onChange({ bio: e.target.value })}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <p className="mt-1 text-right text-xs text-gray-400">{data.bio.length}/300</p>
      </div>

      {/* ═══ Cover Letter / Long Text ═══ */}
      <div>
        <label htmlFor="coverLetter" className="mb-1 block text-sm font-semibold text-gray-800">Cover Letter</label>
        <p className="mb-2 text-xs text-gray-400">Supports basic Markdown: **bold**, *italic*, - lists</p>
        <textarea id="coverLetter" rows={6}
          placeholder={"Dear Hiring Manager,\n\nI am writing to express my interest in...\n\n**Key highlights:**\n- Achievement 1\n- Achievement 2"}
          value={data.coverLetter} maxLength={2000}
          onChange={(e) => onChange({ coverLetter: e.target.value })}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <p className="mt-1 text-right text-xs text-gray-400">{data.coverLetter.length}/2000</p>
      </div>

      {/* ═══ Tags Input ═══ */}
      <div>
        <label className="mb-1 block text-sm font-semibold text-gray-800">Tags / Keywords</label>
        <div className="flex gap-2">
          <input value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(tagInput); } }}
            placeholder="Type a tag and press Enter"
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        {data.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {data.tags.map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                #{tag}
                <button type="button" onClick={() => onChange({ tags: data.tags.filter((t) => t !== tag) })}
                  className="rounded p-0.5 hover:bg-gray-200"><X className="h-3 w-3" /></button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ═══ Referral Source - Conditional Field ═══ */}
      <div className="space-y-3">
        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-800">How did you hear about us?</label>
          <Dropdown
            options={REFERRAL_OPTIONS} value={data.referralSource} placeholder="Select..."
            onChange={(v) => onChange({ referralSource: v, otherReferral: v !== 'other' ? '' : data.otherReferral })}
          />
        </div>
        {data.referralSource === 'other' && (
          <Input
            id="otherReferral" label="Please specify" placeholder="How did you find us?"
            value={data.otherReferral}
            onChange={(e) => onChange({ otherReferral: e.target.value })}
          />
        )}
      </div>
    </div>
  );
}
