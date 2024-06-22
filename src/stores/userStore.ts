import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { IUser } from '@/types/definitions';

interface IUserStore {
  user: null | IUser;
  isAuth: boolean;
  profileLinkActive: string;
  signinTemplateCheckbox: boolean;

  setSigninTemplateCheckbox: (data: boolean) => void;
  setUser: (data: IUser) => void;
  logout: () => void;
  setProfileLinkActive: (data: string) => void;
}

const userStore = create<IUserStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuth: false,
        profileLinkActive: 'Мои заказы',
        signinTemplateCheckbox: false,

        setSigninTemplateCheckbox: (data) => set({signinTemplateCheckbox: data}),
        setProfileLinkActive: (data) => set({ profileLinkActive: data}),
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
