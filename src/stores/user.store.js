import create from 'zustand';
import { persist } from 'zustand/middleware';
import API from '../services/api.service';

const useUserStore = create(persist(
  (set) => ({
    jwt: null,
    user: null,
    login: async (form) => {
      const res = await API.post('/auth/local', form);
      set({ jwt: res.data?.jwt, user: res.data?.user });
    },
    register: async (form) => {
      const res = await API.post('/auth/local/register', form);
      set({ jwt: res.data?.jwt, user: res.data?.user });
    },
    logout: () => set({ jwt: null, user: null }),
  }),
  {
    name: 'user-storage',
    getStorage: () => localStorage,
  },
));

export default useUserStore;
