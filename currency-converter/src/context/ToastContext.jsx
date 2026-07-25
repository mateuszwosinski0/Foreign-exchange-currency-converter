import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  function showToast(message, type) {
    const toast = {
      id: crypto.randomUUID(),
      message,
      type,
    };
    setTimeout(() => {
  removeToast(toast.id);
}, 3000);

    setToasts((previous) => [...previous, toast]);
  }
 function removeToast(id) {
    setToasts((previous) =>
      previous.filter((toast) => toast.id !== id)
    );
  }
  return (
    <ToastContext.Provider
      value={{
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}

