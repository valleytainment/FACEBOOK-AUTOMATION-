/**
 * ============================================================================
 * 📝 CONTENT PLANNER VIEW
 * ============================================================================
 * Description: Interface for generating and previewing AI content.
 * Features: Split layout (Controls | Live Preview), real-time parameter tuning.
 * Vibe: Surgical, precise, no-nonsense content creation.
 * ============================================================================
 */

import { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, RefreshCw, CheckCircle, SlidersHorizontal, Image as ImageIcon } from "lucide-react";
import { cn } from "@/src/lib/utils";

export function PlannerView() {
  // 🎛️ STATE: Generation status and preview content
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewContent, setPreviewContent] = useState<string | null>(null);

  /**
   * 🚀 Handle Generate Action
   * Simulates an API call to generate content based on parameters.
   */
  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate network delay
    setTimeout(() => {
      setPreviewContent("🚀 Just hit a massive milestone! Consistency is the key to unlocking your potential. Keep pushing, keep grinding, and never settle for average. What's your biggest goal this week? Let me know below! 👇 #Motivation #Grind #Success");
      setIsGenerating(false);
    }, 1500);
  };

  return (
    // 🎬 Entrance Animation Container
    <div className="h-[calc(100vh-8rem)] flex flex-col lg:flex-row gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* ==========================================
          🎛️ LEFT PANEL: CONTENT PARAMETERS
          ========================================== */}
      <div className="w-full lg:w-[400px] flex flex-col gap-6 shrink-0">
        <div className="glass-panel rounded-2xl p-6 flex-1 flex flex-col">
          
          {/* Header */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
            <SlidersHorizontal className="w-5 h-5 text-accent" />
            <h2 className="text-lg font-semibold tracking-tight">Content Parameters</h2>
          </div>

          {/* Scrollable Controls Area */}
          <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            
            {/* 📝 Topic Input */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted uppercase tracking-wider">Topic / Core Idea</label>
              <textarea 
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent resize-none h-28 transition-all"
                placeholder="e.g., The importance of consistency in business..."
              />
            </div>

            {/* 🎭 Tone Dropdown */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted uppercase tracking-wider">Tone of Voice</label>
              <select className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-accent/50 appearance-none cursor-pointer">
                <option value="motivational">Motivational & High Energy</option>
                <option value="professional">Professional & Analytical</option>
                <option value="casual">Casual & Relatable</option>
                <option value="provocative">Provocative & Contrarian</option>
              </select>
            </div>

            {/* 📏 Length Slider */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-muted uppercase tracking-wider">Post Length</label>
                <span className="text-xs font-mono text-accent">Medium</span>
              </div>
              <input 
                type="range" 
                min="1" max="3" defaultValue="2"
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
              />
              <div className="flex justify-between text-[10px] text-muted font-mono px-1">
                <span>Short</span>
                <span>Medium</span>
                <span>Long</span>
              </div>
            </div>

            {/* 🎚️ Feature Toggles */}
            <div className="space-y-3 pt-4 border-t border-border">
              <ToggleRow label="Include Call to Action (CTA)" defaultChecked />
              <ToggleRow label="Suggest Image Prompt" defaultChecked />
              <ToggleRow label="Use Emojis" defaultChecked />
            </div>
          </div>

          {/* 🚀 Generate Action Button */}
          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className={cn(
              "mt-6 w-full py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300",
              isGenerating 
                ? "bg-white/10 text-muted cursor-not-allowed" 
                : "bg-accent text-bg hover:bg-accent-hover shadow-[0_0_20px_rgba(0,210,255,0.3)] hover:shadow-[0_0_30px_rgba(0,210,255,0.5)]"
            )}
          >
            {isGenerating ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            {isGenerating ? "Generating..." : "Generate Content"}
          </button>
        </div>
      </div>

      {/* ==========================================
          📱 RIGHT PANEL: LIVE PREVIEW
          ========================================== */}
      <div className="flex-1 glass-panel rounded-2xl p-6 flex flex-col relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[60px] pointer-events-none" />
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-border relative z-10">
          <h2 className="text-lg font-semibold tracking-tight">Live Preview</h2>
          {previewContent && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-success bg-success/10 px-2 py-1 rounded border border-success/20">
                92% Confidence Score
              </span>
            </div>
          )}
        </div>

        {/* Preview Area */}
        <div className="flex-1 flex flex-col items-center justify-center relative z-10">
          {!previewContent ? (
            // Empty State
            <div className="text-center space-y-4 text-muted">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white/20" />
              </div>
              <p className="text-sm">Configure parameters and generate to see preview.</p>
            </div>
          ) : (
            // Active Preview (Facebook Style Card)
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-md bg-[#242526] rounded-xl overflow-hidden shadow-2xl border border-white/5"
            >
              {/* Fake FB Header */}
              <div className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-blue-600 flex items-center justify-center text-sm font-bold shadow-inner">
                  VT
                </div>
                <div>
                  <div className="font-semibold text-[15px] text-[#E4E6EB]">Valleytainment</div>
                  <div className="text-[13px] text-[#B0B3B8] flex items-center gap-1">
                    Just now · <span className="w-3 h-3 rounded-full bg-[#B0B3B8] inline-block scale-50" />
                  </div>
                </div>
              </div>
              
              {/* Generated Text Content */}
              <div className="px-4 pb-4 text-[15px] text-[#E4E6EB] whitespace-pre-wrap leading-relaxed">
                {previewContent}
              </div>

              {/* Fake Image Placeholder */}
              <div className="w-full aspect-video bg-[#18191A] border-t border-white/5 flex flex-col items-center justify-center text-[#B0B3B8] gap-2">
                <ImageIcon className="w-8 h-8 opacity-50" />
                <span className="text-xs font-mono">AI Image Suggestion: "Person climbing mountain at sunrise"</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* 🛠️ Action Bar (Appears after generation) */}
        {previewContent && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 pt-6 border-t border-border flex items-center justify-end gap-4 relative z-10"
          >
            <button className="px-6 py-2.5 rounded-xl font-medium text-sm text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Regenerate
            </button>
            <button className="px-6 py-2.5 rounded-xl font-medium text-sm text-bg bg-success hover:bg-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Approve & Schedule
            </button>
          </motion.div>
        )}
      </div>
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
