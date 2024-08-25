import { useState } from "react";
import { toast } from "react-toastify";
import { Auth } from "../services/auth";
import { useRouter } from "next/navigation";
import useSessionStore from "../store/session";

export default function useSession() {
  const router = useRouter();
  const { setSession, clearSession } = useSessionStore();
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
      const newSession = {
        token: response.token,
        id: response.user.id,
        email: response.user.email,
        name: response.user.name,
        rut: response.user.rut,
      };
      notifyMessage(response.message);
      setSession(newSession);
      router.replace("/home");
    }
  };

  const logout = () => {
    clearSession();
    localStorage.removeItem("session");
    router.replace("/login");
    notifyMessage("Sesión cerrada");
  };

  return { form, handleForm, login, isLoading, logout };
}
