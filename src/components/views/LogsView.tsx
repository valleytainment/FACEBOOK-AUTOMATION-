/**
 * ============================================================================
 * 📜 LOGS VIEW
 * ============================================================================
 * Description: Real-time execution history and debugging interface.
 * Features: Chronological list, color-coded event types, detailed payloads.
 * Vibe: Technical, precise, terminal-like.
 * ============================================================================
 */

import { TerminalSquare, AlertCircle, CheckCircle2, Info, Clock } from "lucide-react";
import { cn } from "@/src/lib/utils";

// 📝 Mock Data: System Logs
const LOGS = [
  { id: 1, time: "Today 6:00 PM", type: "success", message: "Successfully published post: 'Motivation Post'", details: "Post ID: 1048291048_992831" },
  { id: 2, time: "Today 5:58 PM", type: "info", message: "Generated content for 6:00 PM slot", details: "Model: GPT-4o, Tokens: 142" },
  { id: 3, time: "Today 5:55 PM", type: "info", message: "Automation engine triggered for 6:00 PM slot", details: "" },
  { id: 4, time: "Yesterday 9:00 PM", type: "error", message: "Failed to publish post: API Rate Limit", details: "Facebook Graph API returned 429 Too Many Requests. Retrying in 15m." },
  { id: 5, time: "Yesterday 6:00 PM", type: "success", message: "Successfully published post: 'Evening Thoughts'", details: "Post ID: 1048291048_992830" },
  { id: 6, time: "Yesterday 5:58 PM", type: "info", message: "Generated content for 6:00 PM slot", details: "Model: GPT-4o, Tokens: 185" },
];

export function LogsView() {
  return (
    // 🎬 Entrance Animation Container
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 h-[calc(100vh-8rem)] flex flex-col">
      
      {/* ==========================================
          🔝 HEADER SECTION
          ========================================== */}
      <div className="flex items-center justify-between border-b border-border pb-6 shrink-0">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-3">
            <TerminalSquare className="w-6 h-6 text-accent" />
            System Logs
          </h2>
          <p className="text-muted text-sm mt-1">Real-time execution history and debugging.</p>
        </div>
        
        {/* Actions */}
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-xl bg-white/5 text-white text-sm font-medium hover:bg-white/10 transition-colors border border-white/10">
            Export CSV
          </button>
          <button className="px-4 py-2 rounded-xl bg-white/5 text-white text-sm font-medium hover:bg-white/10 transition-colors border border-white/10">
            Clear Logs
          </button>
        </div>
      </div>

      {/* ==========================================
          📜 LOGS TERMINAL
          ========================================== */}
      <div className="glass-panel rounded-2xl overflow-hidden flex-1 flex flex-col">
        
        {/* Table Header */}
        <div className="flex items-center gap-4 p-4 border-b border-border bg-white/[0.02]">
          <div className="flex items-center gap-2 text-xs font-medium text-muted uppercase tracking-wider w-32">
            <Clock className="w-4 h-4" /> Time
          </div>
          <div className="flex-1 text-xs font-medium text-muted uppercase tracking-wider">Event</div>
        </div>
        
        {/* Scrollable Logs Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
          <div className="space-y-1">
            {LOGS.map((log) => (
              <LogEntry key={log.id} log={log} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 📝 Log Entry Sub-Component
 * ----------------------------------------------------------------------------
 * Renders a single log line with color-coding based on event type.
 */
function LogEntry({ log }: { log: any }) {
  // Map log types to specific icons
  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-success" />,
    error: <AlertCircle className="w-4 h-4 text-error" />,
    info: <Info className="w-4 h-4 text-accent" />
  };

  // Map log types to specific background hover colors
  const bgColors = {
    success: "hover:bg-success/5",
    error: "bg-error/5 hover:bg-error/10 border-error/20",
    info: "hover:bg-white/5"
  };

  return (
    <div className={cn(
      "flex items-start gap-4 p-3 rounded-xl transition-colors border border-transparent cursor-pointer group",
      bgColors[log.type as keyof typeof bgColors]
    )}>
      {/* Timestamp */}
      <div className="w-32 shrink-0 pt-0.5">
        <span className="text-xs font-mono text-muted group-hover:text-white/70 transition-colors">{log.time}</span>
      </div>
      
      {/* Message & Details */}
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          {icons[log.type as keyof typeof icons]}
          <span className={cn(
            "text-sm font-medium",
            log.type === 'error' ? "text-error" : "text-white" // Highlight errors in red
          )}>
            {log.message}
          </span>
        </div>
        
        {/* Optional Technical Details Payload */}
        {log.details && (
          <div className="text-xs font-mono text-muted pl-6">
            {log.details}
          </div>
        )}
      </div>
    </div>
  );
}
