import { Outlet } from 'react-router-dom';
import { cn } from '@/utils';
import { useUI } from '@/hooks';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

export function AuthenticatedLayout() {
  const { isSidebarCollapsed } = useUI();

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div
        className={cn(
          'transition-all duration-300',
          isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64',
        )}
      >
        <Navbar />
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
