"use client";
import { useRouter } from "next/navigation";
import { Spinner } from "@nextui-org/spinner";
import { useEffect } from "react";
import useSessionStore from "./store/session";

export default function Auth() {
  const router = useRouter();
  const token = useSessionStore((token) => token.token);

  const redirect = (path: string) => {
    setTimeout(() => {
      router.push(path);
    }, 2000);
  };

  useEffect(() => {
    if (token) {
      redirect("/home");
    } else {
      redirect("/login");
    }
  }, [token]);

  return (
    <main className="w-screen h-screen">
      <div className="w-full h-full flex items-center justify-center">
        <Spinner color="primary" size="md" />
      </div>
    </main>
  );
}
