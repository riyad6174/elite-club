"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

type ToastType = "success" | "error" | "info";

interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastCtx {
  toast: (type: ToastType, message: string) => void;
}

const ToastContext = createContext<ToastCtx | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback((type: ToastType, message: string) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4500);
  }, []);

  const dismiss = (id: string) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));

  const icons: Record<ToastType, string> = {
    success: "check_circle",
    error: "error",
    info: "info",
  };

  const colors: Record<ToastType, string> = {
    success: "border-l-tertiary text-tertiary",
    error: "border-l-error text-error",
    info: "border-l-primary text-primary",
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      {/* Toast stack — bottom-right */}
      <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`toast-enter flex items-start gap-3 bg-surface-container border border-outline-variant/20 border-l-4 ${colors[t.type]} rounded-sm px-4 py-3.5 shadow-2xl pointer-events-auto w-80 max-w-[90vw]`}
          >
            <span className={`material-symbols-outlined text-lg flex-shrink-0 mt-px ${colors[t.type].split(" ")[1]}`}>
              {icons[t.type]}
            </span>
            <p className="text-white text-xs font-medium leading-relaxed flex-1">{t.message}</p>
            <button
              onClick={() => dismiss(t.id)}
              className="text-white/30 hover:text-white transition-colors cursor-pointer flex-shrink-0 -mt-0.5"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx.toast;
}
