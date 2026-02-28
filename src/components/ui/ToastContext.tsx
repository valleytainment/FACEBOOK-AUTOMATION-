/**
 * ============================================================================
 * 🍞 TOAST NOTIFICATION SYSTEM
 * ============================================================================
 * Description: Elite, animated, global notification system.
 * Features: Framer Motion animations, auto-dismiss, color-coded variants.
 * Vibe: Unobtrusive, surgical feedback.
 * ============================================================================
 */

import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/src/lib/utils";

// 📝 Types & Interfaces
type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

// 🌐 Global Context
const ToastContext = createContext<ToastContextType | undefined>(undefined);

/**
 * 🎣 useToast Hook
 * ----------------------------------------------------------------------------
 * Exposes the `showToast` function to any component.
 */
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

/**
 * 🍞 Toast Provider Component
 * ----------------------------------------------------------------------------
 * Wraps the app and renders active toasts in a fixed overlay.
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  // 🎛️ STATE: Array of active toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  /**
   * 🚀 Show Toast Action
   * Adds a new toast to the queue and sets a timeout to remove it.
   */
  const showToast = useCallback((message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    // ⏳ Auto-dismiss after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  /**
   * 🗑️ Dismiss Toast Action
   * Manually removes a toast by ID.
   */
  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* 🖼️ Toast Container (Fixed Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} onDismiss={() => dismissToast(toast.id)} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

/**
 * 🍞 Single Toast Item Component
 * ----------------------------------------------------------------------------
 * Renders the actual notification card with animations.
 */
function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) {
  // 🎨 Visual Mapping based on Type
  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-success drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />,
    error: <AlertCircle className="w-5 h-5 text-error drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" />,
    info: <Info className="w-5 h-5 text-accent drop-shadow-[0_0_8px_rgba(0,210,255,0.5)]" />
  };

  const borders = {
    success: "border-success/30 bg-success/5",
    error: "border-error/30 bg-error/5",
    info: "border-accent/30 bg-accent/5"
  };

  return (
    // 🎬 Framer Motion Animation
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-xl shadow-2xl min-w-[300px] max-w-md",
        "bg-card/90", // Base glassmorphism
        borders[toast.type] // Dynamic border/tint
      )}
    >
      {/* Icon */}
      <div className="shrink-0">{icons[toast.type]}</div>
      
      {/* Message */}
      <p className="flex-1 text-sm font-medium text-white">{toast.message}</p>
      
      {/* Close Button */}
      <button 
        onClick={onDismiss}
        className="shrink-0 p-1 rounded-md hover:bg-white/10 text-muted hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
