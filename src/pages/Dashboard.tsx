import { useAuth } from '@/hooks';
import { LayoutDashboard, Users, FileText, TrendingUp } from 'lucide-react';

const stats = [
  { label: 'Total Users', value: '—', icon: Users, color: 'text-blue-600 bg-blue-50' },
  { label: 'Documents', value: '—', icon: FileText, color: 'text-green-600 bg-green-50' },
  { label: 'Revenue', value: '—', icon: TrendingUp, color: 'text-purple-600 bg-purple-50' },
  { label: 'Active Projects', value: '—', icon: LayoutDashboard, color: 'text-orange-600 bg-orange-50' },
];

export function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          Welcome back, {user?.name ?? 'User'}. Here's an overview of your project.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`rounded-lg p-3 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder content */}
      <div className="mt-8 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
        <LayoutDashboard className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-4 text-lg font-semibold text-gray-900">Build your dashboard</h3>
        <p className="mt-2 text-sm text-gray-600">
          Replace this section with charts, tables, or any content specific to your project.
        </p>
      </div>
    </div>
  );
}
