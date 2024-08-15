import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Session } from "../types/session";

export const defaultSession: Session = {
  id: 0,
  email: "",
  name: "",
  rut: "",
};

type sessionStore = {
  session: Session;
  setSession: (session: Session) => void;
  token: string;
  setToken: (token: string) => void;
};

const useSessionStore = create<sessionStore>()(
  persist(
    (set) => ({
      session: defaultSession,
      setSession: (session: Session) => set({ session }),
      token: "",
      setToken: (token: string) => set({ token }),
    }),
    {
      name: "session",
      partialize: (state) => ({ token: state.token }),
    }
  )
);

export default useSessionStore;
