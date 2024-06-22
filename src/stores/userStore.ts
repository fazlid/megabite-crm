import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { IUser } from '@/types/definitions';

interface IUserStore {
  user: null | IUser;
  isAuth: boolean;
  test: boolean;
  setTest: (data: boolean) => void;
  setUser: (data: IUser) => void;
  logout: () => void;
}

const userStore = create<IUserStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuth: false,
        test: true,

        setTest: (data) => {
          console.log(`Setting test to: ${data}`);
          set({ test: data });
        },
        setUser: (data) => set({ user: data, isAuth: true }),
        logout: () => set({ user: null, isAuth: false }),
      }),
      {
        name: 'user-storage',
      }
    )
  )
);

export default userStore;
