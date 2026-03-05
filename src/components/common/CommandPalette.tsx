import { useEffect } from 'react';
import { Command } from 'cmdk';
import { useNavigate } from 'react-router-dom';
import { Search, LayoutDashboard, FileText, Settings, LogOut, Sun, Maximize2, Minimize2 } from 'lucide-react';
import { ROUTES } from '@/constants';
import { useAuth, useUI } from '@/hooks';

export function CommandPalette() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { addToast, isCommandOpen, setCommandOpen, isFocusMode, setFocusMode } = useUI();

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [setCommandOpen]);

  const runCommand = (command: () => void) => {
    setCommandOpen(false);
    command();
  };

  return (
    <Command.Dialog 
      open={isCommandOpen} 
      onOpenChange={setCommandOpen} 
      label="Global Command Menu"
      className="fixed inset-0 z-[100] flex justify-center p-4 pt-[15vh] bg-gray-900/50 backdrop-blur-sm shadow-2xl transition-opacity animate-in fade-in"
    >
      <div className="w-full max-w-xl overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/5 flex flex-col h-[min(450px,calc(100vh-8rem))] animate-in zoom-in-95 duration-200">
        <div className="flex items-center border-b px-3 text-gray-500">
          <Search className="mr-2 h-5 w-5 shrink-0" />
          <Command.Input 
            placeholder="Type a command or search..." 
            className="flex h-14 w-full rounded-md bg-transparent py-3 text-base outline-none placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        
        <Command.List className="overflow-y-auto p-2 scrollbar-hide text-sm">
          <Command.Empty className="py-6 text-center text-sm text-gray-500">
            No results found.
          </Command.Empty>

          <Command.Group heading="Navigation" className="px-2 pb-2 text-xs font-semibold text-gray-500 [&_[cmdk-item]]:mt-1 [&_[cmdk-item]]:flex [&_[cmdk-item]]:cursor-pointer [&_[cmdk-item]]:select-none [&_[cmdk-item]]:items-center [&_[cmdk-item]]:rounded-md [&_[cmdk-item]]:px-3 [&_[cmdk-item]]:py-2.5 [&_[cmdk-item]]:text-sm [&_[cmdk-item]]:text-gray-800 data-[selected=true]:bg-gray-100 data-[selected=true]:text-primary">
            <Command.Item onSelect={() => runCommand(() => navigate(ROUTES.DASHBOARD))} className="aria-selected:bg-primary/10 aria-selected:text-primary transition-colors">
              <LayoutDashboard className="mr-3 h-4 w-4" />
              <span>Dashboard</span>
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => navigate(ROUTES.LEAD_MANAGEMENT))} className="aria-selected:bg-primary/10 aria-selected:text-primary transition-colors">
              <FileText className="mr-3 h-4 w-4" />
              <span>Lead Management</span>
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => navigate(ROUTES.ALL_DEALS))} className="aria-selected:bg-primary/10 aria-selected:text-primary transition-colors">
              <FileText className="mr-3 h-4 w-4" />
              <span>All Deals</span>
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Forms & Tools" className="px-2 pb-2 pt-2 text-xs font-semibold text-gray-500 [&_[cmdk-item]]:mt-1 [&_[cmdk-item]]:flex [&_[cmdk-item]]:cursor-pointer [&_[cmdk-item]]:select-none [&_[cmdk-item]]:items-center [&_[cmdk-item]]:rounded-md [&_[cmdk-item]]:px-3 [&_[cmdk-item]]:py-2.5 [&_[cmdk-item]]:text-sm [&_[cmdk-item]]:text-gray-800">
            <Command.Item onSelect={() => runCommand(() => navigate(ROUTES.SIMPLE_FORM))} className="aria-selected:bg-primary/10 aria-selected:text-primary transition-colors">
              <FileText className="mr-3 h-4 w-4" />
              <span>Simple Form</span>
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => navigate(ROUTES.AWESOME_FORM))} className="aria-selected:bg-primary/10 aria-selected:text-primary transition-colors">
              <FileText className="mr-3 h-4 w-4" />
              <span>Awesome Form</span>
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => navigate(ROUTES.ADVANCED_FORM))} className="aria-selected:bg-primary/10 aria-selected:text-primary transition-colors">
              <FileText className="mr-3 h-4 w-4" />
              <span>Advanced Form</span>
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Settings & Actions" className="px-2 pb-2 pt-2 text-xs font-semibold text-gray-500 [&_[cmdk-item]]:mt-1 [&_[cmdk-item]]:flex [&_[cmdk-item]]:cursor-pointer [&_[cmdk-item]]:select-none [&_[cmdk-item]]:items-center [&_[cmdk-item]]:rounded-md [&_[cmdk-item]]:px-3 [&_[cmdk-item]]:py-2.5 [&_[cmdk-item]]:text-sm [&_[cmdk-item]]:text-gray-800">
            <Command.Item onSelect={() => runCommand(() => setFocusMode(!isFocusMode))} className="aria-selected:bg-primary/10 aria-selected:text-primary transition-colors">
              <span className="mr-3 flex h-4 w-4 items-center justify-center">
                {isFocusMode ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </span>
              <span>{isFocusMode ? "Exit Focus Mode" : "Enter Focus Mode"}</span>
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => navigate(ROUTES.SETTINGS))} className="aria-selected:bg-primary/10 aria-selected:text-primary transition-colors">
              <Settings className="mr-3 h-4 w-4" />
              <span>Project Settings</span>
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => {
              addToast({ type: 'info', message: 'Theme switched to Dark mode! (demo)' });
            })} className="aria-selected:bg-primary/10 aria-selected:text-primary transition-colors">
              <Sun className="mr-3 h-4 w-4" />
              <span>Toggle Theme</span>
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => logout())} className="aria-selected:bg-red-50 text-red-600 transition-colors mt-2">
              <LogOut className="mr-3 h-4 w-4" />
              <span>Log out</span>
            </Command.Item>
          </Command.Group>
        </Command.List>
      </div>
    </Command.Dialog>
  );
}
