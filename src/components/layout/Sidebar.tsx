import { useEffect, useMemo, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  ChevronDown,
  ChevronRight,
  Circle,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';
import { cn } from '@/utils';
import { useUI } from '@/hooks';
import { env } from '@/config/env';
import { sidebarMenuItems, type SidebarItem } from '@/config/sidebar-menu';

export function Sidebar() {
  const location = useLocation();
  const { isSidebarOpen, closeSidebar, isSidebarCollapsed, toggleSidebarCollapsed } = useUI();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      sidebarMenuItems
        .filter((item) => item.children?.length && item.defaultOpen)
        .map((item) => [item.id, true]),
    ),
  );

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

  const activePath = useMemo(() => location.pathname, [location.pathname]);

  const isRouteActive = (to: string) => activePath === to || activePath.startsWith(`${to}/`);

  const hasActiveChild = (item: SidebarItem) =>
    item.children?.some((child) => isRouteActive(child.to)) ?? false;

  const collapsedTileClass =
    'lg:mx-auto lg:h-10 lg:w-10 lg:justify-center lg:rounded-md lg:border lg:px-0 lg:shadow-sm';

  const sidebarContent = (
    <div className="flex h-full flex-col bg-[#f8f9fc]">
      <div
        className={cn(
          'flex h-16 shrink-0 items-center gap-2 border-b border-slate-200 bg-white px-4',
          isSidebarCollapsed && 'lg:justify-center lg:px-2',
        )}
      >
        <div
          className={cn(
            'flex h-6 w-6 items-center justify-center rounded-full border-2 border-blue-500',
            isSidebarCollapsed && 'lg:hidden',
          )}
        >
          <div className="h-2 w-2 rounded-full bg-blue-500" />
        </div>
        <span
          className={cn(
            'truncate text-xl font-semibold text-blue-600',
            isSidebarCollapsed && 'lg:hidden',
          )}
        >
          {env.APP_NAME}
        </span>
        <button
          type="button"
          onClick={toggleSidebarCollapsed}
          className={cn(
            'hidden rounded-lg border border-slate-200 bg-white p-1.5 text-slate-600 shadow-sm transition-colors hover:bg-slate-100 lg:inline-flex',
            isSidebarCollapsed ? 'lg:mx-auto' : 'ml-auto',
          )}
          aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isSidebarCollapsed ? (
            <PanelLeftOpen className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </button>
      </div>

      <nav className={cn('flex-1 overflow-y-auto px-3 py-4', isSidebarCollapsed && 'lg:px-1.5')}>
        <ul className={cn('space-y-1', isSidebarCollapsed && 'lg:space-y-2')}>
          {sidebarMenuItems.map((item) => {
            const isParentActive = !!(item.to && isRouteActive(item.to)) || hasActiveChild(item);
            const isOpen = openGroups[item.id] ?? false;

            if (item.children?.length) {
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    title={isSidebarCollapsed ? item.label : undefined}
                    onClick={() =>
                      setOpenGroups((prev) => ({
                        ...prev,
                        [item.id]: !isOpen,
                      }))
                    }
                    className={cn(
                      'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      isParentActive
                        ? 'text-blue-700'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900',
                      isSidebarCollapsed &&
                        cn(
                          collapsedTileClass,
                          isParentActive
                            ? 'lg:border-blue-600 lg:bg-blue-600 lg:text-white'
                            : 'lg:border-slate-200 lg:bg-white lg:text-slate-700',
                        ),
                    )}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    <span className={cn('flex-1 text-left', isSidebarCollapsed && 'lg:hidden')}>
                      {item.label}
                    </span>
                    {isOpen ? (
                      <ChevronDown
                        className={cn(
                          'h-4 w-4 shrink-0 text-slate-400',
                          isSidebarCollapsed && 'lg:hidden',
                        )}
                      />
                    ) : (
                      <ChevronRight
                        className={cn(
                          'h-4 w-4 shrink-0 text-slate-400',
                          isSidebarCollapsed && 'lg:hidden',
                        )}
                      />
                    )}
                  </button>

                  {isOpen && (
                    <ul className={cn('mt-1 space-y-1 pl-5', isSidebarCollapsed && 'lg:hidden')}>
                      {item.children.map((subItem) => (
                        <li key={subItem.id}>
                          <NavLink
                            to={subItem.to}
                            className={({ isActive }) =>
                              cn(
                                'flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors',
                                isActive
                                  ? 'bg-blue-600 text-white'
                                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                              )
                            }
                          >
                            <Circle className="h-2 w-2 fill-current" />
                            <span>{subItem.label}</span>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            }

            if (item.to) {
              return (
                <li key={item.id}>
                  <NavLink
                    to={item.to}
                    title={isSidebarCollapsed ? item.label : undefined}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900',
                        isSidebarCollapsed &&
                          cn(
                            collapsedTileClass,
                            isActive
                              ? 'lg:border-blue-600 lg:bg-blue-600 lg:text-white'
                              : 'lg:border-slate-200 lg:bg-white lg:text-slate-700',
                          ),
                      )
                    }
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    <span className={cn('flex-1', isSidebarCollapsed && 'lg:hidden')}>
                      {item.label}
                    </span>
                  </NavLink>
                </li>
              );
            }

            return (
              <li key={item.id}>
                <span
                  title={isSidebarCollapsed ? item.label : undefined}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900',
                    isSidebarCollapsed &&
                      cn(
                        collapsedTileClass,
                        'lg:border-slate-200 lg:bg-white lg:text-slate-700',
                      ),
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span className={cn('flex-1', isSidebarCollapsed && 'lg:hidden')}>
                    {item.label}
                  </span>
                  <ChevronRight
                    className={cn(
                      'h-4 w-4 shrink-0 text-slate-400',
                      isSidebarCollapsed && 'lg:hidden',
                    )}
                  />
                </span>
              </li>
            );
          })}
        </ul>
      </nav>

      <div
        className={cn(
          'shrink-0 border-t border-slate-200 px-4 py-3 text-xs text-slate-500',
          isSidebarCollapsed && 'lg:px-2 lg:text-center',
        )}
      >
        <span className={cn(isSidebarCollapsed && 'lg:hidden')}>(c) 2026 {env.APP_NAME}</span>
        <span className={cn('hidden', isSidebarCollapsed && 'lg:inline')}>2026</span>
      </div>
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
          'fixed inset-y-0 left-0 z-50 w-64 border-r border-slate-200 bg-[#f8f9fc] shadow-xl transition-transform duration-300 lg:hidden',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 hidden border-r border-slate-200 bg-[#f8f9fc] transition-all duration-300 lg:block',
          isSidebarCollapsed ? 'w-16' : 'w-64',
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
