import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Session } from "../types/session";

export const defaultSession: Session = {
  id: 0,
  email: "",
  name: "",
  rut: "",
  token: "",
};

type sessionStore = {
  session: Session;
  setSession: (session: Session) => void;
  clearSession: () => void;
};

const useSessionStore = create<sessionStore>()(
  persist(
    (set) => ({
      session: defaultSession,
      setSession: (session: Session) => set({ session }),
      clearSession: () => set({ session: defaultSession }),
    }),
    {
      name: "session",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useSessionStore;
