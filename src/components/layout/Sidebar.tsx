import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { cn } from '@/utils';
import { useAuth, useUI } from '@/hooks';
import { sidebarNavigation } from '@/config/navigation';
import { Tooltip } from '@/components/common/Tooltip';
import { env } from '@/config/env';

export function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();
  const { isSidebarOpen, closeSidebar, isSidebarCollapsed, toggleSidebarCollapsed } = useUI();

  // Auto-close mobile drawer on route change
  useEffect(() => {
    closeSidebar();
  }, [location.pathname, closeSidebar]);

  // Escape key closes mobile drawer
  useEffect(() => {
    if (!isSidebarOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSidebar();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isSidebarOpen, closeSidebar]);

  // Body scroll lock when mobile drawer is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSidebarOpen]);

  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center border-b border-gray-200 px-4">
        <span
          className={cn(
            'truncate text-lg font-bold text-primary transition-all duration-300',
            isSidebarCollapsed ? 'lg:hidden' : '',
          )}
        >
          {env.APP_NAME}
        </span>
        {isSidebarCollapsed && (
          <span className="hidden text-lg font-bold text-primary lg:block">
            {env.APP_NAME.charAt(0)}
          </span>
        )}
      </div>

      {/* Nav groups */}
      <nav className={cn('flex-1 px-3 py-4', !isSidebarCollapsed && 'overflow-y-auto')}>
        {sidebarNavigation.map((group) => (
          <div key={group.title} className="mb-6">
            {!isSidebarCollapsed && (
              <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                {group.title}
              </p>
            )}
            <ul className="space-y-1">
              {group.items.map((item) => {
                const linkContent = (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
                        isSidebarCollapsed && 'lg:justify-center lg:px-2',
                      )
                    }
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    <span className={cn(isSidebarCollapsed && 'lg:hidden')}>{item.label}</span>
                  </NavLink>
                );

                if (isSidebarCollapsed) {
                  return (
                    <li key={item.to} className="hidden lg:block">
                      <Tooltip content={item.label} side="right" variant="primary">
                        {linkContent}
                      </Tooltip>
                    </li>
                  );
                }

                return <li key={item.to}>{linkContent}</li>;
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User profile at bottom */}
      {user && (
        <div className="shrink-0 border-t border-gray-200 p-4">
          <div
            className={cn('flex items-center gap-3', isSidebarCollapsed && 'lg:justify-center')}
          >
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-8 w-8 shrink-0 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                {initials}
              </div>
            )}
            <div className={cn('min-w-0', isSidebarCollapsed && 'lg:hidden')}>
              <p className="truncate text-sm font-medium text-gray-900">{user.name}</p>
              <p className="truncate text-xs text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transition-transform duration-300 lg:hidden',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 hidden border-r border-gray-200 bg-white transition-all duration-300 lg:block',
          isSidebarCollapsed ? 'w-16 overflow-visible' : 'w-64',
        )}
      >
        {sidebarContent}

        {/* Collapse toggle pill */}
        <button
          onClick={toggleSidebarCollapsed}
          className="absolute -right-3 top-20 z-50 flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-colors hover:bg-gray-50"
          aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isSidebarCollapsed ? (
            <PanelLeftOpen className="h-3.5 w-3.5 text-gray-600" />
          ) : (
            <PanelLeftClose className="h-3.5 w-3.5 text-gray-600" />
          )}
        </button>
      </aside>
    </>
  );
}
