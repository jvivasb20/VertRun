/* import { create } from "zustand";
import { fetchActivities } from "@/api/activities";
import { useAuthStore } from "./useAuthStore";
import { Activities } from "@/types/Activities";

interface ActivitiesStore {
  activities: Activities[];
  error: string | null;
  loading: boolean;
  fetchActivities: () => Promise<void>;
}

const useActivitiesStore = create<ActivitiesStore>((set, get) => ({
  activities: [],
  error: null,
  loading: false,
  fetchActivities: async () => {
    const { accessToken } = useAuthStore();

    if (!accessToken) {
      set({ error: "Access token is missing." });
      return;
    }

    set({ loading: true, error: null });

    try {
    
    

      set({ activities });
      console.log("activities", activities);
    } catch (error) {
      console.log("error", error);
      // set({ error: error?.message as string});
    } finally {
      set({ loading: false });
    }
  },
}));

export default useActivitiesStore;
 */
