import create from 'zustand';
import { persist } from 'zustand/middleware';
import API from '../services/api.service';

const useCitaStore = create(persist(
  (set) => ({
    citas: null,
    fetchCitas: async () => {
      const res = await API.get('/citas?populate=mascota,cliente,doctor&sort=id:desc');
      set({ citas: res.data.data });
    },
    addCita: async (form) => {
      await API.post('/citas', {
        data: form,
      });
    },
  }),
  {
    name: 'cita-storage',
    getStorage: () => localStorage,
  },
));

export default useCitaStore;
