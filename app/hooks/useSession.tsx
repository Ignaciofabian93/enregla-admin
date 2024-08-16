import { useState } from "react";
import { toast } from "react-toastify";
import { Auth } from "../services/auth";
import { useRouter } from "next/navigation";
import useSessionStore, { defaultSession } from "../store/session";

export default function useSession() {
  const router = useRouter();
  const { setSession, setToken } = useSessionStore();
  const [form, setForm] = useState<{ rut: string; password: string }>({
    rut: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const notifyError = (error: string) => toast.error(error);
  const notifyMessage = (message: string) => toast.success(message);

  const handleForm = (field: string, value: string) => setForm({ ...form, [field]: value });

  const login = async () => {
    const { rut, password } = form;
    if (!rut || !password) return notifyError("Porfavor complete todos los campos");
    setIsLoading(true);
    const response = await Auth({ rut, password });
    if (response.error) return notifyError(response.error);
    else {
      notifyMessage(response.message);
      setSession(response.user);
      setToken(response.token);
      router.replace("/home");
    }
  };

  const logout = () => {
    setSession(defaultSession);
    setToken("");
    localStorage.removeItem("session");
    router.replace("/login");
    notifyMessage("Sesión cerrada");
  };

  return { form, handleForm, login, isLoading, logout };
}
