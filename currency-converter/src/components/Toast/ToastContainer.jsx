import { useToast } from "@/hooks/useToast";
import Toast from "./Toast";

function ToastContainer() {
  const { toasts } = useToast();

  return (
    <div className="fixed top-5 right-5 flex flex-col gap-3 z-50">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
        />
      ))}
    </div>
  );
}

export default ToastContainer;