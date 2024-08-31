import { Session } from "@/types/session";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const defaultSession: Session = {
  id: 0,
  email: "",
  name: "",
  token: "",
  branch_id: 0,
  role_id: 0,
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
