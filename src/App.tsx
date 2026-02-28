/**
 * ============================================================================
 * 🚀 MAIN APPLICATION ENTRY (App.tsx)
 * ============================================================================
 * Description: The root component of the Personal AI Facebook Auto-Scheduler.
 *              Handles global state (active tab) and view routing.
 * Architecture: Single Page Application (SPA) with conditional rendering.
 * ============================================================================
 */

import { useState } from "react";

// 🍞 Global Providers
import { ToastProvider } from "./components/ui/ToastContext";

// 📦 Layout Components
import { Layout } from "./components/layout/Layout";

// 🖼️ View Components
import { DashboardView } from "./components/views/DashboardView";
import { PlannerView } from "./components/views/PlannerView";
import { ScheduleView } from "./components/views/ScheduleView";
import { InsightsView } from "./components/views/InsightsView";
import { SettingsView } from "./components/views/SettingsView";
import { LogsView } from "./components/views/LogsView";

export default function App() {
  // 🎛️ STATE: Tracks the currently active navigation tab
  const [activeTab, setActiveTab] = useState("dashboard");

  /**
   * 🔄 View Router
   * Renders the appropriate component based on the `activeTab` state.
   * This keeps the App component clean and modular.
   */
  const renderView = () => {
    switch (activeTab) {
      case "dashboard": return <DashboardView />;
      case "planner":   return <PlannerView />;
      case "schedule":  return <ScheduleView />;
      case "insights":  return <InsightsView />;
      case "settings":  return <SettingsView />;
      case "logs":      return <LogsView />;
      default:          return <DashboardView />; // Fallback safety
    }
  };

  // 🎨 RENDER: Wraps the selected view inside the main Layout shell
  return (
    <ToastProvider>
      <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
        {renderView()}
      </Layout>
    </ToastProvider>
  );
}
