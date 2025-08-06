import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ILoginPayload {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  avatar: string | null;
  role: {
    id: string;
    name: string;
  };
}

interface ILoginState {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  avatar: string | null;
  role: {
    id: string;
    name: string;
  };
  isLogin: boolean;
  hasHydrated: boolean;
  onAuthSuccess: (user: ILoginPayload) => void;
  onLogOut: () => void;
  setHasHydrated: (status: boolean) => void;
}

export const useAuthStore = create<ILoginState>()(
  persist(
    (set) => ({
      id: "",
      email: "",
      firstname: "",
      lastname: "",
      avatar: null,
      role: {
        id: "",
        name: "",
      },
      isLogin: false,
      hasHydrated: false,
      setHasHydrated: (status: boolean) => set({ hasHydrated: status }),
      onAuthSuccess: (payload) =>
        set(() => ({
          id: payload.id,
          email: payload.email,
          firstname: payload.firstname,
          lastname: payload.lastname,
          avatar: payload.avatar,
          role: {
            id: payload.role.id,
            name: payload.role.name,
          },
          isLogin: true,
        })),
      onLogOut: () =>
        set(() => ({
          id: "",
          email: "",
          firstname: "",
          lastname: "",
          avatar: null,
          role: {
            id: "",
            name: "",
          },
          isLogin: false,
        })),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
