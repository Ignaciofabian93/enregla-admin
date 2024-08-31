import { useState } from "react";
import { toast } from "react-toastify";
import { Auth } from "../services/auth";
import { useRouter } from "next/navigation";
import useSessionStore from "@/store/session";

export default function useSession() {
  const router = useRouter();
  const { setSession, clearSession } = useSessionStore();
  const [form, setForm] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const notifyError = (error: string) => toast.error(error);
  const notifyMessage = (message: string) => toast.success(message);

  const handleForm = (field: string, value: string) => setForm({ ...form, [field]: value });

  const login = async () => {
    const { email, password } = form;
    if (!email || !password) return notifyError("Porfavor complete todos los campos");
    setIsLoading(true);
    const response = await Auth({ email, password });
    if (response.error) return notifyError(response.error), setIsLoading(false);
    else {
      const newSession = {
        token: response.token,
        id: response.user.id,
        email: response.user.email,
        name: response.user.name,
        branch_id: response.user.branch_id,
        role_id: response.user.role_id,
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
