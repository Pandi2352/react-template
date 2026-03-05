import { Star } from 'lucide-react';
import { cn } from '@/utils';
import { Input } from '@/components/common';
import type { Preferences, FormErrors } from './types';
import { LAYOUT_OPTIONS, COMMUNICATION_OPTIONS, INTEREST_OPTIONS, PRIORITY_OPTIONS } from './constants';

interface Props {
  data: Preferences;
  errors: FormErrors;
  onChange: (u: Partial<Preferences>) => void;
}

export function PreferencesStep({ data, errors, onChange }: Props) {
  function toggleArrayItem(arr: string[], item: string) {
    return arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];
  }

  return (
    <div className="space-y-8">
      {/* ═══ Color Picker ═══ */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-800">Favorite Color</label>
        <div className="flex items-center gap-4">
          <input
            type="color" value={data.favoriteColor}
            onChange={(e) => onChange({ favoriteColor: e.target.value })}
            className="h-10 w-14 cursor-pointer rounded-lg border border-gray-300 p-1"
          />
          <span className="rounded-md bg-gray-100 px-3 py-1.5 font-mono text-sm text-gray-600">
            {data.favoriteColor}
          </span>
          <div className="h-8 w-8 rounded-full border border-gray-200 shadow-inner"
            style={{ backgroundColor: data.favoriteColor }} />
        </div>
      </div>

      {/* ═══ Range Sliders ═══ */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {[
          { label: 'Font Size', key: 'fontSize' as const, min: 10, max: 32, unit: 'px', value: data.fontSize },
          { label: 'Brightness', key: 'brightness' as const, min: 0, max: 100, unit: '%', value: data.brightness },
          { label: 'Volume', key: 'volume' as const, min: 0, max: 100, unit: '%', value: data.volume },
        ].map((slider) => (
          <div key={slider.key}>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">{slider.label}</label>
              <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                {slider.value}{slider.unit}
              </span>
            </div>
            <input
              type="range" min={slider.min} max={slider.max}
              value={slider.value}
              onChange={(e) => onChange({ [slider.key]: Number(e.target.value) })}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-[10px] text-gray-400">
              <span>{slider.min}{slider.unit}</span>
              <span>{slider.max}{slider.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ═══ Layout Mode - Radio Cards ═══ */}
      <div>
        <label className="mb-3 block text-sm font-semibold text-gray-800">Layout Mode</label>
        <div className="grid grid-cols-3 gap-3">
          {LAYOUT_OPTIONS.map((opt) => (
            <label key={opt} className={cn(
              'flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all',
              data.layoutMode === opt
                ? 'border-primary bg-primary/5 shadow-sm'
                : 'border-gray-200 hover:border-gray-300',
            )}>
              <input type="radio" name="layout" value={opt} checked={data.layoutMode === opt}
                onChange={() => onChange({ layoutMode: opt })} className="sr-only" />
              <div className={cn(
                'flex gap-0.5',
                opt === 'Compact' ? 'gap-0.5' : opt === 'Comfortable' ? 'gap-1' : 'gap-2',
              )}>
                {[1, 2, 3].map((n) => (
                  <div key={n} className={cn(
                    'rounded bg-gray-300',
                    opt === 'Compact' ? 'h-4 w-3' : opt === 'Comfortable' ? 'h-5 w-4' : 'h-6 w-5',
                    data.layoutMode === opt && 'bg-primary/40',
                  )} />
                ))}
              </div>
              <span className="text-xs font-medium text-gray-600">{opt}</span>
            </label>
          ))}
        </div>
      </div>

      {/* ═══ Communication Channels - Checkbox Group ═══ */}
      <div>
        <label className="mb-3 block text-sm font-semibold text-gray-800">Preferred Communication</label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {COMMUNICATION_OPTIONS.map((ch) => (
            <label key={ch} className={cn(
              'flex cursor-pointer items-center gap-2.5 rounded-lg border p-3 text-sm transition-colors',
              data.communicationChannels.includes(ch)
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-gray-200 text-gray-600 hover:border-gray-300',
            )}>
              <input type="checkbox" checked={data.communicationChannels.includes(ch)}
                onChange={() => onChange({ communicationChannels: toggleArrayItem(data.communicationChannels, ch) })}
                className="h-4 w-4 rounded border-gray-300 accent-primary" />
              {ch}
            </label>
          ))}
        </div>
      </div>

      {/* ═══ Interests - Chip Toggle Group ═══ */}
      <div>
        <label className="mb-3 block text-sm font-semibold text-gray-800">Interests</label>
        <div className="flex flex-wrap gap-2">
          {INTEREST_OPTIONS.map((interest) => {
            const selected = data.interests.includes(interest);
            return (
              <button key={interest} type="button"
                onClick={() => onChange({ interests: toggleArrayItem(data.interests, interest) })}
                className={cn(
                  'rounded-full border px-4 py-2 text-sm font-medium transition-all',
                  selected
                    ? 'border-primary bg-primary text-white shadow-sm'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300',
                )}>
                {interest}
              </button>
            );
          })}
        </div>
      </div>

      {/* ═══ Star Rating ═══ */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-800">
          Rate your experience <span className="text-xs font-normal text-gray-400">(1-5 stars)</span>
        </label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} type="button" onClick={() => onChange({ rating: star })}
              className="rounded p-0.5 transition-transform hover:scale-110">
              <Star className={cn(
                'h-7 w-7 transition-colors',
                star <= data.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300',
              )} />
            </button>
          ))}
          {data.rating > 0 && (
            <span className="ml-3 text-sm text-gray-500">{data.rating}/5</span>
          )}
        </div>
      </div>

      {/* ═══ Priority Selector ═══ */}
      <div>
        <label className="mb-3 block text-sm font-semibold text-gray-800">Priority Level</label>
        <div className="flex gap-2">
          {PRIORITY_OPTIONS.map((p) => {
            const colors: Record<string, string> = {
              Low: 'border-green-300 bg-green-50 text-green-700',
              Medium: 'border-yellow-300 bg-yellow-50 text-yellow-700',
              High: 'border-orange-300 bg-orange-50 text-orange-700',
              Critical: 'border-red-300 bg-red-50 text-red-700',
            };
            return (
              <button key={p} type="button"
                onClick={() => onChange({ priority: p })}
                className={cn(
                  'rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all',
                  data.priority === p ? colors[p] : 'border-gray-200 text-gray-400 hover:border-gray-300',
                )}>
                {p}
              </button>
            );
          })}
        </div>
      </div>

      {/* ═══ Time & Date Range ═══ */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="grid grid-cols-2 gap-3">
          <Input id="startTime" label="Start Time" type="time" value={data.startTime}
            onChange={(e) => onChange({ startTime: e.target.value })} />
          <Input id="endTime" label="End Time" type="time" value={data.endTime}
            onChange={(e) => onChange({ endTime: e.target.value })} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input id="startDate" label="Start Date" type="date" value={data.startDate}
            onChange={(e) => onChange({ startDate: e.target.value })} />
          <Input id="endDate" label="End Date" type="date" value={data.endDate}
            onChange={(e) => onChange({ endDate: e.target.value })} />
        </div>
      </div>

      {/* ═══ Toggle Switches ═══ */}
      <div>
        <label className="mb-3 block text-sm font-semibold text-gray-800">Settings</label>
        <div className="space-y-3">
          {([
            { key: 'receiveNewsletter' as const, label: 'Receive Newsletter', desc: 'Get weekly updates in your inbox' },
            { key: 'enableAnalytics' as const, label: 'Enable Analytics', desc: 'Help us improve with usage data' },
            { key: 'darkMode' as const, label: 'Dark Mode', desc: 'Use dark theme across the app' },
            { key: 'autoSave' as const, label: 'Auto Save', desc: 'Automatically save your progress' },
          ]).map((toggle) => (
            <label key={toggle.key}
              className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 p-4">
              <div>
                <p className="text-sm font-medium text-gray-800">{toggle.label}</p>
                <p className="text-xs text-gray-400">{toggle.desc}</p>
              </div>
              <button type="button" role="switch" aria-checked={data[toggle.key]}
                onClick={() => onChange({ [toggle.key]: !data[toggle.key] })}
                className={cn(
                  'relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors',
                  data[toggle.key] ? 'bg-primary' : 'bg-gray-300',
                )}>
                <span className={cn(
                  'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transition-transform',
                  data[toggle.key] ? 'translate-x-5' : 'translate-x-0',
                )} />
              </button>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
