import { useToast } from "@/hooks/useToast";
import { useEffect, useState } from "react";
import check from "@/assets/images/check.png"
import error from "@/assets/images/error.png"
import warning from "@/assets/images/warning.png"
import information from "@/assets/images/information.png"
const toastStyles = {
  success: {
    icon: check,
    bg: "bg-green-500/10",
    text: "text-green-300",
    border: "border border-green-500/30",
  },

  error: {
    icon: error,
    bg: "bg-red-500/10",
    text: "text-red-300",
    border: "border border-red-500/30",
  },

  warning: {
    icon: warning,
    bg: "bg-yellow-500/10",
    text: "text-yellow-300",
    border: "border border-yellow-500/30",
  },

  info: {
    icon: information,
    bg: "bg-blue-500/10",
    text: "text-blue-300",
    border: "border border-blue-500/30",
  },
};

function Toast({ id, message, type }) {
  const currentToast = toastStyles[type];
const { removeToast } = useToast();
const [isVisible, setIsVisible] = useState(false);
 
useEffect(() => {
    const showTimer = setTimeout(() => {
        setIsVisible(true);
    }, 10);

    const hideTimer = setTimeout(() =>{
        setIsVisible(false);
    }, 2700)
    const removeTimer =  setTimeout(() => {
        removeToast(id);
    }, 3000);
    return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
        clearTimeout(removeTimer);
    };
}, [id, removeToast]);
  return (
    <div
      className={`
        flex items-center gap-3 rounded-xl p-4 shadow-lg transition-all duration-300 
        ${isVisible
            ? "translate-x-0 opacity-100 "
            : "translate-x-full opacity-0"
        }
        ${currentToast.bg}
        ${currentToast.text}
        ${currentToast.border}
      `}
    >
     <img
  src={currentToast.icon}
  alt=""
  className="h-5 w-5 flex-shrink-0"
/>

      <p className="flex-1">{message}</p>
      <button
  type="button"
  onClick={() => removeToast(id)}
  className="ml-2 text-lg opacity-60 transition hover:opacity-100"
  aria-label="Close notification"
>
  ×
</button>
    </div>
  );
}

export default Toast;