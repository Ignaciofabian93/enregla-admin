import { NextUIProvider } from "@nextui-org/system";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <ToastContainer theme="colored" autoClose={2000} position="top-center" />
      {children}
    </NextUIProvider>
  );
}
