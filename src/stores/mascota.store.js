import create from 'zustand';
import { persist } from 'zustand/middleware';
import API from '../services/api.service';

const useMascotaStore = create(persist(
  (set) => ({
    mascotas: null,
    fetchMascotasById: async (id) => {
      const res = await API.get(`/mascotas?filters[cliente][id][$eq]=${id}&sort=id:desc`);
      set({ mascotas: res.data.data });
    },
    fetchMascotas: async () => {
      const res = await API.get('/mascotas?populate=cliente&sort=id:desc');
      set({ mascotas: res.data.data });
    },
    addMascota: async (form) => {
      await API.post('/mascotas', {
        data: form,
      });
    },
  }),
  {
    name: 'mascota-storage',
    getStorage: () => localStorage,
  },
));

export default useMascotaStore;
