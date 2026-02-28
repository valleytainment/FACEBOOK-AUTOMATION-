/**
 * ============================================================================
 * ⚙️ SETTINGS VIEW (ELITE CONTROL PANEL)
 * ============================================================================
 * Description: Comprehensive configuration for the automation engine.
 * Features: AI Provider setup, Facebook integration, Automation logic, Safety.
 * Vibe: Mission Control, precise, secure.
 * ============================================================================
 */

import { useState } from "react";
import { BrainCircuit, Facebook, Zap, ShieldAlert, CheckCircle2, SlidersHorizontal, Key, Link2, RefreshCw } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useLocalStorage } from "@/src/hooks/useLocalStorage";
import { useToast } from "@/src/components/ui/ToastContext";

export function SettingsView() {
  const { showToast } = useToast();

  // 🎛️ STATE: Persisted Settings
  const [model, setModel] = useLocalStorage("vt_ai_model", "GPT-4o");
  const [temperature, setTemperature] = useLocalStorage("vt_ai_temp", 0.7);
  const [dailyLimit, setDailyLimit] = useLocalStorage("vt_daily_limit", "3");
  const [variance, setVariance] = useLocalStorage("vt_time_variance", 15);
  const [dupWindow, setDupWindow] = useLocalStorage("vt_dup_window", "30 Days");

  // 🚀 Handle Save Action
  const handleSave = () => {
    // In a real app, this might also trigger an API call to sync with a backend
    showToast("System configuration saved successfully.", "success");
  };

  return (
    // 🎬 Entrance Animation Container
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      
      {/* ==========================================
          🔝 HEADER SECTION
          ========================================== */}
      <div className="flex items-center justify-between border-b border-border pb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-3">
            <SlidersHorizontal className="w-6 h-6 text-accent" />
            System Configuration
          </h2>
          <p className="text-muted text-sm mt-1">Elite-level control over your automation engine.</p>
        </div>
        {/* Global Save Action */}
        <button 
          onClick={handleSave}
          className="px-6 py-2.5 rounded-xl bg-accent text-bg font-semibold text-sm hover:bg-accent-hover transition-all shadow-[0_0_15px_rgba(0,210,255,0.3)] hover:shadow-[0_0_25px_rgba(0,210,255,0.5)]"
        >
          Save Changes
        </button>
      </div>

      {/* ==========================================
          🎛️ CONFIGURATION GRID
          ========================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* 🧠 SECTION 1: AI Engine Configuration */}
        <Section title="AI Engine" icon={BrainCircuit} description="Configure your intelligence layer.">
          <div className="space-y-5">
            {/* Workspace ID (Replaced API Key to follow security guidelines) */}
            <InputRow label="Workspace ID" type="text" placeholder="wksp_9842..." icon={Key} />
            
            {/* Model Selection */}
            <SelectRow 
              label="Model Selection" 
              options={["GPT-4o", "Claude 3.5 Sonnet", "Gemini 1.5 Pro"]} 
              value={model}
              onChange={(e: any) => setModel(e.target.value)}
            />
            
            {/* Temperature Slider */}
            <div className="pt-2">
              <div className="flex justify-between text-xs font-medium text-muted uppercase tracking-wider mb-3">
                <span>Creativity (Temperature)</span>
                <span className="text-accent font-mono">{temperature}</span>
              </div>
              <input 
                type="range" min="0" max="1" step="0.1" 
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent" 
              />
              <div className="flex justify-between text-[10px] text-muted font-mono px-1 mt-2">
                <span>Precise</span>
                <span>Balanced</span>
                <span>Creative</span>
              </div>
            </div>
            
            {/* Connection Status */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <span className="text-sm text-muted">Connection Status</span>
              <div className="flex items-center gap-2 text-success text-xs font-mono bg-success/10 px-3 py-1.5 rounded-md border border-success/20">
                <CheckCircle2 className="w-3.5 h-3.5" /> Connected (12ms)
              </div>
            </div>
          </div>
        </Section>

        {/* 📘 SECTION 2: Facebook Integration */}
        <Section title="Facebook Integration" icon={Facebook} description="Manage page connections and permissions.">
          <div className="space-y-5">
            {/* Connected Page Card */}
            <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-sm font-bold shadow-inner">
                  VT
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">Valleytainment</div>
                  <div className="text-xs text-muted font-mono mt-0.5 flex items-center gap-1">
                    <Link2 className="w-3 h-3" /> Page ID: 1048291048
                  </div>
                </div>
              </div>
              <button className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors border border-white/10 flex items-center gap-2">
                <RefreshCw className="w-3 h-3" /> Reconnect
              </button>
            </div>
            
            {/* Permissions List */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-medium text-muted uppercase tracking-wider mb-2">Permissions Check</h4>
              <PermissionRow label="Publish Content" active />
              <PermissionRow label="Read Insights" active />
              <PermissionRow label="Manage Comments" active={false} />
            </div>
          </div>
        </Section>

        {/* ⚡ SECTION 3: Automation Logic */}
        <Section title="Automation Logic" icon={Zap} description="Control how and when content is generated.">
          <div className="space-y-5">
            {/* Daily Limits */}
            <SelectRow 
              label="Daily Maximum Posts" 
              options={["1", "2", "3", "5", "Unlimited"]} 
              value={dailyLimit}
              onChange={(e: any) => setDailyLimit(e.target.value)}
            />
            
            {/* Variance Slider */}
            <div className="pt-2">
              <div className="flex justify-between text-xs font-medium text-muted uppercase tracking-wider mb-3">
                <span>Time Randomness (+/- mins)</span>
                <span className="text-accent font-mono">{variance}m</span>
              </div>
              <input 
                type="range" min="0" max="60" step="5" 
                value={variance}
                onChange={(e) => setVariance(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent" 
              />
              <p className="text-[10px] text-muted mt-2">Adds natural variance to scheduled posting times to appear more human.</p>
            </div>
            
            {/* Logic Toggles */}
            <div className="pt-4 border-t border-border space-y-3">
              <ToggleRow label="Auto-rotate content topics" defaultChecked />
              <ToggleRow label="Recycle top-performing posts" defaultChecked={false} />
            </div>
          </div>
        </Section>

        {/* 🛡️ SECTION 4: Safety & Guardrails */}
        <Section title="Safety & Guardrails" icon={ShieldAlert} description="Protect your brand reputation.">
          <div className="space-y-5">
            {/* Duplicate Prevention */}
            <SelectRow 
              label="Duplicate Prevention Window" 
              options={["7 Days", "14 Days", "30 Days", "90 Days"]} 
              value={dupWindow}
              onChange={(e: any) => setDupWindow(e.target.value)}
            />
            
            {/* Safety Toggles */}
            <div className="pt-4 border-t border-border space-y-3">
              <ToggleRow label="Require manual review for controversial topics" defaultChecked />
              <ToggleRow label="Pause automation on high error rate" defaultChecked />
              <ToggleRow label="Strict profanity filter" defaultChecked />
            </div>
            
            {/* 🚨 Emergency Kill Switch */}
            <div className="mt-6 p-4 rounded-xl bg-error/10 border border-error/20 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-error shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-error">Emergency Kill Switch</h4>
                <p className="text-xs text-error/80 mt-1 mb-3">Instantly halt all scheduled posts and disconnect API access.</p>
                <button className="px-4 py-2 rounded-lg bg-error/20 hover:bg-error/30 text-error text-xs font-bold uppercase tracking-wider transition-colors border border-error/30">
                  Halt System
                </button>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}

/**
 * 📦 Section Wrapper Sub-Component
 * ----------------------------------------------------------------------------
 * Standardized container for settings categories.
 */
function Section({ title, icon: Icon, description, children }: any) {
  return (
    <div className="glass-panel rounded-2xl p-6 relative overflow-hidden group">
      {/* Ambient Hover Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[40px] pointer-events-none group-hover:bg-accent/5 transition-colors duration-500" />
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-2 relative z-10">
        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
          <Icon className="w-4 h-4 text-white/70" />
        </div>
        <h3 className="text-lg font-semibold tracking-tight text-white">{title}</h3>
      </div>
      <p className="text-sm text-muted mb-6 relative z-10">{description}</p>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

/**
 * ⌨️ Input Row Sub-Component
 * ----------------------------------------------------------------------------
 * Standardized text/password input field with icon.
 */
function InputRow({ label, type = "text", placeholder, icon: Icon }: any) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-muted uppercase tracking-wider">{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-4 w-4 text-muted" />
        </div>
        <input 
          type={type} 
          className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent transition-all font-mono"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

/**
 * 🔽 Select Row Sub-Component
 * ----------------------------------------------------------------------------
 * Standardized dropdown menu.
 */
function SelectRow({ label, options, value, onChange }: any) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-muted uppercase tracking-wider">{label}</label>
      <select 
        value={value}
        onChange={onChange}
        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-accent/50 appearance-none cursor-pointer font-medium"
      >
        {options.map((opt: string) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

/**
 * ✅ Permission Row Sub-Component
 * ----------------------------------------------------------------------------
 * Displays the status of a specific API permission.
 */
function PermissionRow({ label, active }: { label: string, active: boolean }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
      <span className="text-sm text-white/80">{label}</span>
      {active ? (
        <div className="flex items-center gap-1.5 text-success text-xs font-mono">
          <CheckCircle2 className="w-3.5 h-3.5" /> Granted
        </div>
      ) : (
        <div className="flex items-center gap-1.5 text-muted text-xs font-mono">
          <ShieldAlert className="w-3.5 h-3.5" /> Missing
        </div>
      )}
    </div>
  );
}

/**
 * 🎚️ Toggle Row Sub-Component
 * ----------------------------------------------------------------------------
 * Reusable toggle switch for boolean settings.
 */
function ToggleRow({ label, defaultChecked }: { label: string, defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked || false);
  
  return (
    <div className="flex items-center justify-between py-2 cursor-pointer group" onClick={() => setChecked(!checked)}>
      <span className="text-sm text-white/80 group-hover:text-white transition-colors">{label}</span>
      <div className={cn(
        "w-10 h-5 rounded-full relative transition-colors duration-300",
        checked ? "bg-accent" : "bg-white/10"
      )}>
        <div className={cn(
          "absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-300 shadow-sm",
          checked ? "left-[22px]" : "left-0.5"
        )} />
      </div>
    </div>
  );
}
