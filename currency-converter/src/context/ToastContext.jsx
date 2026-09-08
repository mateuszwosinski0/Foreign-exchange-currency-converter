import { useEffect, useRef, useState } from "react";
import { ToastContext } from "@/context/toast";

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());

  useEffect(() => {
    const pending = timers.current;
    return () => {
      pending.forEach(clearTimeout);
      pending.clear();
    };
  }, []);

  function removeToast(id) {
    clearTimeout(timers.current.get(id));
    timers.current.delete(id);
    setToasts((previous) => previous.filter((toast) => toast.id !== id));
  }

  function showToast(message, type) {
    const toast = { id: crypto.randomUUID(), message, type };
    timers.current.set(toast.id, setTimeout(() => removeToast(toast.id), 3000));
    setToasts((previous) => [...previous, toast]);
  }

  return <ToastContext.Provider value={{ toasts, showToast, removeToast }}>{children}</ToastContext.Provider>;
}
