"use client";
import { useRouter } from "next/navigation";
import { Spinner } from "@nextui-org/spinner";
import { useCallback, useEffect } from "react";
import { GetMe } from "@/services/auth";
import useSessionStore from "@/store/session";

export default function Auth() {
  const router = useRouter();
  const { session, setSession } = useSessionStore();

  const redirect = useCallback(
    (path: string) => {
      setTimeout(() => {
        router.push(path);
      }, 2000);
    },
    [router]
  );

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await GetMe({ token: session.token });
      if (response.user) {
        const newSession = {
          ...session,
          id: response.user.id,
          email: response.user.email,
          name: response.user.name,
        };
        setSession(newSession);
        redirect("/home");
      }
    };

    if (session.token) {
      getUserInfo();
    } else {
      redirect("/login");
    }
  }, [session, setSession, redirect]);

  return (
    <main className="w-screen h-screen">
      <div className="w-full h-full flex items-center justify-center">
        <Spinner color="primary" size="md" />
      </div>
    </main>
  );
}
