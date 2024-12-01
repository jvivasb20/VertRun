import { authorizeStrava } from "@/config/oauth";
import { create } from "zustand";

interface StravaUser {
  id: number;
  username: string | null;
  firstname: string;
  lastname: string;
  city: string | null;
  state: string | null;
  country: string | null;
  profile: string | null;
  premium: boolean;
}

interface AuthStore {
  user: StravaUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
  loading: boolean;
  error: string | null;
  loginWithStrava: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  expiresAt: null,
  loading: false,
  error: null,
  loginWithStrava: async () => {
    set({ loading: true, error: null });
    try {
      const authResult = await authorizeStrava();

      const { accessToken, refreshToken, tokenAdditionalParameters } =
        authResult;

      const athlete =
        tokenAdditionalParameters?.athlete as unknown as StravaUser;
      const expiresAt = tokenAdditionalParameters?.expires_at as string;

      if (!accessToken || !athlete) {
        throw new Error("Invalid auth response");
      }

      set({
        accessToken,
        refreshToken,
        expiresAt: parseInt(expiresAt, 10),
        user: {
          ...athlete,
        },
        loading: false,
        error: null,
      });
    } catch (error: any) {
      set({ error: error.message || "Login failed", loading: false });
    }
  },
  logout: () => {
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      expiresAt: null,
      error: null,
    });
  },
}));
