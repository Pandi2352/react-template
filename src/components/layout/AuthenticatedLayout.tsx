import { Outlet } from "react-router-dom";
import { cn } from "@/utils";
import { useUI } from "@/hooks";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { CommandPalette } from "@/components/common";

export function AuthenticatedLayout() {
  const { isSidebarCollapsed, isFocusMode } = useUI();

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div
        className={cn(
          "transition-all duration-300",
          isFocusMode ? "lg:ml-0" : isSidebarCollapsed ? "lg:ml-16" : "lg:ml-64",
        )}
      >
        <Navbar />
        <main className={cn(
          "transition-all duration-300",
          isFocusMode ? "p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto" : "p-4 sm:p-4 lg:p-4"
        )}>
          <Outlet />
        </main>
      </div>
      <CommandPalette />
    </div>
  );
}
