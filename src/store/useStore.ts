import { create } from 'zustand';

interface Store {
  user: object | null;
  setUser: (user: object | null) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

export const useStore = create<Store>()((set) => ({
  user: null,
  isLoading: false,
  setUser: (user) => set(() => ({ user })),
  setIsLoading: (value) => set(() => ({ isLoading: value })),
}));
