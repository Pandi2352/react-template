import { useState } from 'react';
import { Plus, Trash2, X, GraduationCap, Briefcase } from 'lucide-react';
import { Button, Input, Dropdown } from '@/components/common';
import { cn } from '@/utils';
import type { EducationWork, EducationEntry, WorkEntry, FormErrors } from './types';
import {
  DEGREE_OPTIONS, PROFICIENCY_OPTIONS,
  LANGUAGE_SUGGESTIONS, CERTIFICATION_SUGGESTIONS,
} from './constants';

interface Props {
  data: EducationWork;
  errors: FormErrors;
  onChange: (u: Partial<EducationWork>) => void;
  clearError: (f: string) => void;
}

let idCounter = 0;
const uid = () => `entry-${++idCounter}`;

export function EducationWorkStep({ data, errors, onChange, clearError }: Props) {
  const [certInput, setCertInput] = useState('');
  const [langInput, setLangInput] = useState('');
  const [langProficiency, setLangProficiency] = useState('intermediate');

  /* ── Education ── */
  function addEducation() {
    const entry: EducationEntry = {
      id: uid(), degree: '', institution: '', fieldOfStudy: '',
      startYear: '', endYear: '', gpa: '',
    };
    onChange({ education: [...data.education, entry] });
    clearError('education');
  }

  function updateEducation(id: string, update: Partial<EducationEntry>) {
    onChange({ education: data.education.map((e) => e.id === id ? { ...e, ...update } : e) });
  }

  function removeEducation(id: string) {
    onChange({ education: data.education.filter((e) => e.id !== id) });
  }

  /* ── Work ── */
  function addWork() {
    const entry: WorkEntry = {
      id: uid(), company: '', position: '', startDate: '', endDate: '',
      isCurrent: false, description: '',
    };
    onChange({ work: [...data.work, entry] });
  }

  function updateWork(id: string, update: Partial<WorkEntry>) {
    onChange({ work: data.work.map((w) => w.id === id ? { ...w, ...update } : w) });
  }

  function removeWork(id: string) {
    onChange({ work: data.work.filter((w) => w.id !== id) });
  }

  /* ── Certifications ── */
  function addCert(cert: string) {
    const trimmed = cert.trim();
    if (!trimmed || data.certifications.includes(trimmed)) return;
    onChange({ certifications: [...data.certifications, trimmed] });
    setCertInput('');
  }

  /* ── Languages ── */
  function addLanguage(name: string) {
    const trimmed = name.trim();
    if (!trimmed || data.languages.some((l) => l.name === trimmed)) return;
    onChange({ languages: [...data.languages, { name: trimmed, proficiency: langProficiency }] });
    setLangInput('');
  }

  function removeLanguage(name: string) {
    onChange({ languages: data.languages.filter((l) => l.name !== name) });
  }

  return (
    <div className="space-y-8">
      {/* ═══ Education ═══ */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-gray-800">Education <span className="text-error">*</span></h3>
          </div>
          <Button type="button" size="sm" variant="outline" onClick={addEducation}>
            <Plus className="mr-1 h-3.5 w-3.5" /> Add
          </Button>
        </div>
        {errors.education && <p className="mb-3 text-sm text-error">{errors.education}</p>}

        <div className="space-y-4">
          {data.education.map((ed, i) => (
            <div key={ed.id} className="rounded-lg border border-gray-200 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Entry #{i + 1}</span>
                <button type="button" onClick={() => removeEducation(ed.id)}
                  className="rounded p-1 text-gray-400 hover:bg-red-50 hover:text-error">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600">Degree <span className="text-error">*</span></label>
                  <Dropdown
                    options={DEGREE_OPTIONS} value={ed.degree} placeholder="Select..."
                    onChange={(v) => { updateEducation(ed.id, { degree: v }); clearError(`edu_degree_${i}`); }}
                  />
                  {errors[`edu_degree_${i}`] && <p className="mt-1 text-xs text-error">{errors[`edu_degree_${i}`]}</p>}
                </div>
                <div>
                  <Input
                    id={`inst-${ed.id}`} label="Institution" placeholder="MIT" required
                    value={ed.institution} error={errors[`edu_inst_${i}`]}
                    onChange={(e) => { updateEducation(ed.id, { institution: e.target.value }); clearError(`edu_inst_${i}`); }}
                  />
                </div>
                <Input
                  id={`field-${ed.id}`} label="Field of Study" placeholder="Computer Science"
                  value={ed.fieldOfStudy}
                  onChange={(e) => updateEducation(ed.id, { fieldOfStudy: e.target.value })}
                />
                <Input
                  id={`gpa-${ed.id}`} label="GPA" placeholder="3.8"
                  value={ed.gpa}
                  onChange={(e) => updateEducation(ed.id, { gpa: e.target.value })}
                />
                <Input
                  id={`sy-${ed.id}`} label="Start Year" type="number" placeholder="2018"
                  value={ed.startYear}
                  onChange={(e) => updateEducation(ed.id, { startYear: e.target.value })}
                />
                <Input
                  id={`ey-${ed.id}`} label="End Year" type="number" placeholder="2022"
                  value={ed.endYear}
                  onChange={(e) => updateEducation(ed.id, { endYear: e.target.value })}
                />
              </div>
            </div>
          ))}
          {data.education.length === 0 && (
            <div className="rounded-lg border-2 border-dashed border-gray-200 py-8 text-center">
              <GraduationCap className="mx-auto mb-2 h-8 w-8 text-gray-300" />
              <p className="text-sm text-gray-400">No education entries yet. Click "Add" above.</p>
            </div>
          )}
        </div>
      </section>

      {/* ═══ Work Experience ═══ */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-gray-800">Work Experience</h3>
          </div>
          <Button type="button" size="sm" variant="outline" onClick={addWork}>
            <Plus className="mr-1 h-3.5 w-3.5" /> Add
          </Button>
        </div>

        <div className="space-y-4">
          {data.work.map((w, i) => (
            <div key={w.id} className="rounded-lg border border-gray-200 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Position #{i + 1}</span>
                <button type="button" onClick={() => removeWork(w.id)}
                  className="rounded p-1 text-gray-400 hover:bg-red-50 hover:text-error">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Input id={`co-${w.id}`} label="Company" placeholder="Google" value={w.company}
                  onChange={(e) => updateWork(w.id, { company: e.target.value })} />
                <Input id={`pos-${w.id}`} label="Position" placeholder="Software Engineer" value={w.position}
                  onChange={(e) => updateWork(w.id, { position: e.target.value })} />
                <Input id={`sd-${w.id}`} label="Start Date" type="date" value={w.startDate}
                  onChange={(e) => updateWork(w.id, { startDate: e.target.value })} />
                <div>
                  <Input id={`ed-${w.id}`} label="End Date" type="date" value={w.endDate}
                    disabled={w.isCurrent}
                    onChange={(e) => updateWork(w.id, { endDate: e.target.value })} />
                  <label className="mt-1 flex items-center gap-2">
                    <input type="checkbox" checked={w.isCurrent}
                      onChange={(e) => updateWork(w.id, { isCurrent: e.target.checked, endDate: '' })}
                      className="h-3.5 w-3.5 rounded border-gray-300 accent-primary" />
                    <span className="text-xs text-gray-500">Currently working here</span>
                  </label>
                </div>
              </div>
              <div className="mt-3">
                <label className="mb-1 block text-xs font-medium text-gray-600">Description</label>
                <textarea rows={2} placeholder="Key responsibilities..."
                  value={w.description}
                  onChange={(e) => updateWork(w.id, { description: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>
          ))}
          {data.work.length === 0 && (
            <div className="rounded-lg border-2 border-dashed border-gray-200 py-8 text-center">
              <Briefcase className="mx-auto mb-2 h-8 w-8 text-gray-300" />
              <p className="text-sm text-gray-400">No work entries yet. Click "Add" above.</p>
            </div>
          )}
        </div>
      </section>

      {/* ═══ Certifications ═══ */}
      <section>
        <label className="mb-2 block text-sm font-semibold text-gray-800">Certifications</label>
        <div className="flex gap-2">
          <input value={certInput} onChange={(e) => setCertInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCert(certInput); } }}
            placeholder="Type and press Enter"
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <Button type="button" size="sm" onClick={() => addCert(certInput)} disabled={!certInput.trim()}>Add</Button>
        </div>
        {data.certifications.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {data.certifications.map((c) => (
              <span key={c} className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                {c}
                <button type="button" onClick={() => onChange({ certifications: data.certifications.filter((x) => x !== c) })}
                  className="rounded-full p-0.5 hover:bg-blue-100"><X className="h-3 w-3" /></button>
              </span>
            ))}
          </div>
        )}
        <div className="mt-2 flex flex-wrap gap-1.5">
          {CERTIFICATION_SUGGESTIONS.filter((s) => !data.certifications.includes(s)).slice(0, 6).map((s) => (
            <button key={s} type="button" onClick={() => addCert(s)}
              className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs text-gray-500 hover:border-primary hover:text-primary">
              + {s}
            </button>
          ))}
        </div>
      </section>

      {/* ═══ Languages ═══ */}
      <section>
        <label className="mb-2 block text-sm font-semibold text-gray-800">Languages</label>
        <div className="flex flex-wrap gap-2">
          <input value={langInput} onChange={(e) => setLangInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addLanguage(langInput); } }}
            placeholder="Language name"
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <Dropdown
            options={PROFICIENCY_OPTIONS} value={langProficiency} className="w-40"
            onChange={(v) => setLangProficiency(v)}
          />
          <Button type="button" size="sm" onClick={() => addLanguage(langInput)} disabled={!langInput.trim()}>Add</Button>
        </div>
        {data.languages.length > 0 && (
          <div className="mt-3 space-y-2">
            {data.languages.map((l) => (
              <div key={l.name} className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-3 py-2">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-800">{l.name}</span>
                  <span className={cn(
                    'rounded-full px-2 py-0.5 text-xs font-medium',
                    l.proficiency === 'native' ? 'bg-green-100 text-green-700' :
                    l.proficiency === 'advanced' ? 'bg-blue-100 text-blue-700' :
                    l.proficiency === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-600',
                  )}>
                    {l.proficiency}
                  </span>
                </div>
                <button type="button" onClick={() => removeLanguage(l.name)}
                  className="rounded p-1 text-gray-400 hover:text-error"><X className="h-3.5 w-3.5" /></button>
              </div>
            ))}
          </div>
        )}
        <div className="mt-2 flex flex-wrap gap-1.5">
          {LANGUAGE_SUGGESTIONS.filter((s) => !data.languages.some((l) => l.name === s)).slice(0, 6).map((s) => (
            <button key={s} type="button" onClick={() => addLanguage(s)}
              className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs text-gray-500 hover:border-primary hover:text-primary">
              + {s}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
