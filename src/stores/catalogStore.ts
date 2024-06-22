import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface IUserStore {
  catalogNavListStatus: boolean;

  setCatalogNavListStatus: (data: boolean) => void;
}

const catalogStore = create<IUserStore>()(
  devtools(
    persist(
      (set) => ({
        catalogNavListStatus: false,

        setCatalogNavListStatus: (data) => set({ catalogNavListStatus: data }),
      }),
      {
        name: "catalog-storage",
      }
    )
  )
);

export default catalogStore;
