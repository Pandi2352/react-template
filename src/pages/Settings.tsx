import { useAuth } from '@/hooks';
import { Settings as SettingsIcon } from 'lucide-react';

export function Settings() {
  const { user } = useAuth();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-600">Manage your account and preferences.</p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Profile Section */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
          <div className="mt-4 space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-500">Name</span>
              <p className="text-gray-900">{user?.name ?? '—'}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Email</span>
              <p className="text-gray-900">{user?.email ?? '—'}</p>
            </div>
          </div>
        </div>

        {/* Placeholder */}
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
          <SettingsIcon className="mx-auto h-10 w-10 text-gray-400" />
          <h3 className="mt-3 text-sm font-semibold text-gray-900">More settings</h3>
          <p className="mt-1 text-sm text-gray-600">
            Add theme toggles, notification preferences, API keys, etc.
          </p>
        </div>
      </div>
    </div>
  );
}
