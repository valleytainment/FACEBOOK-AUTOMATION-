/**
 * ============================================================================
 * 🧭 SIDEBAR NAVIGATION
 * ============================================================================
 * Description: Left-hand navigation menu.
 * Features: Active state highlighting, user profile summary, elite branding.
 * ============================================================================
 */

import { 
  LayoutDashboard, 
  PenTool, 
  CalendarDays, 
  BarChart3, 
  Settings, 
  TerminalSquare 
} from "lucide-react";
import { cn } from "@/src/lib/utils";

/**
 * 📝 Props Interface
 */
interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

/**
 * 🗺️ Navigation Configuration
 * Centralized array to easily add/remove/reorder menu items.
 */
const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard",       icon: LayoutDashboard },
  { id: "planner",   label: "Content Planner", icon: PenTool },
  { id: "schedule",  label: "Schedule",        icon: CalendarDays },
  { id: "insights",  label: "Insights",        icon: BarChart3 },
  { id: "settings",  label: "Settings",        icon: Settings },
  { id: "logs",      label: "Logs",            icon: TerminalSquare },
];

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    // 🛡️ Sidebar Container: Glassmorphism, fixed width, hidden on mobile
    <aside className="w-64 border-r border-border bg-card/50 backdrop-blur-xl flex flex-col hidden md:flex z-20">
      
      {/* 👑 Brand Header */}
      <div className="h-14 flex items-center px-6 border-b border-border">
        <div className="flex items-center gap-3">
          {/* Glowing Logo Mark */}
          <div className="w-6 h-6 rounded bg-accent flex items-center justify-center shadow-[0_0_15px_rgba(0,210,255,0.4)]">
            <div className="w-2 h-2 bg-bg rounded-sm" />
          </div>
          {/* Brand Name */}
          <span className="font-semibold text-sm tracking-wide">
            AUTO<span className="text-accent">SCHED</span>
          </span>
        </div>
      </div>
      
      {/* 🧭 Navigation Links */}
      <nav className="flex-1 py-6 px-3 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative",
                isActive 
                  ? "text-white bg-white/5" // Active state styling
                  : "text-muted hover:text-white hover:bg-white/5" // Inactive state styling
              )}
            >
              {/* Active Indicator Bar (Left edge) */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-accent rounded-r-full shadow-[0_0_10px_rgba(0,210,255,0.8)]" />
              )}
              
              {/* Icon */}
              <Icon className={cn("w-4 h-4", isActive ? "text-accent" : "text-muted group-hover:text-white")} />
              
              {/* Label */}
              {item.label}
            </button>
          );
        })}
      </nav>
      
      {/* 👤 User Profile Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-blue-600 flex items-center justify-center text-xs font-bold shadow-inner">
            VT
          </div>
          {/* User Info */}
          <div className="flex flex-col text-left">
            <span className="text-xs font-medium text-white">Valleytainment</span>
            <span className="text-[10px] text-muted">Pro Plan</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
