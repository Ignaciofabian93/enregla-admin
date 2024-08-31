"use client";
import { useRouter } from "next/navigation";
import { Spinner } from "@nextui-org/spinner";
import { useEffect } from "react";
import useSessionStore from "@/store/session";
import { GetMe } from "@/services/auth";

export default function Auth() {
  const router = useRouter();
  const { session, setSession } = useSessionStore();

  const redirect = (path: string) => {
    setTimeout(() => {
      router.push(path);
    }, 2000);
  };

  useEffect(() => {
    if (session.token) {
      getUserInfo();
      redirect("/home");
    } else {
      redirect("/login");
    }
  }, [session]);

  const getUserInfo = async () => {
    const response = await GetMe({ token: session.token });
    if (response.user) {
      const newSession = {
        ...session,
        id: response.user.id,
        email: response.user.email,
        name: response.user.name,
        rut: response.user.rut,
      };
      setSession(newSession);
    }
  };

  return (
    <main className="w-screen h-screen">
      <div className="w-full h-full flex items-center justify-center">
        <Spinner color="primary" size="md" />
      </div>
    </main>
  );
}
