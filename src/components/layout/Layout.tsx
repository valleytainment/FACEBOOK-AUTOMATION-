/**
 * ============================================================================
 * 🏗️ LAYOUT COMPONENT
 * ============================================================================
 * Description: The master structural shell of the application.
 *              Combines the Sidebar, TopBar, and Main Content Area.
 * Features: Responsive flexbox grid, subtle background glows, overflow mgmt.
 * ============================================================================
 */

import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

/**
 * 📝 Props Interface
 * @param children - The dynamic view content to render in the main area.
 * @param activeTab - Current active navigation tab (passed to Sidebar).
 * @param setActiveTab - Function to update the active tab.
 */
interface LayoutProps {
  children: ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Layout({ children, activeTab, setActiveTab }: LayoutProps) {
  return (
    // 🌐 Root Container: Full screen, dark background, prevents body scroll
    <div className="flex h-screen w-full bg-bg overflow-hidden text-text">
      
      {/* 🧭 Left Navigation Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* 🖥️ Main Content Column */}
      <div className="flex flex-col flex-1 min-w-0">
        
        {/* 🎯 Top Status Bar */}
        <TopBar />
        
        {/* 📜 Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 relative">
          
          {/* ✨ Ambient Background Glow (Elite touch) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
          
          {/* 📦 Content Wrapper: Limits max width for ultra-wide screens */}
          <div className="relative z-10 h-full max-w-7xl mx-auto">
            {children}
          </div>
          
        </main>
      </div>
    </div>
  );
}
