import create from 'zustand';
import { persist } from 'zustand/middleware';
import API from '../services/api.service';

const useDoctorStore = create(persist(
  (set) => ({
    doctores: null,
    fetchDoctores: async () => {
      const res = await API.get('/users');
      set({ doctores: res.data });
    },
    addDoctor: async (form) => {
      await API.post('/doctors', form);
    },
    deleteDoctor: async (id) => {
      await API.delete(`/doctor/${id}`);
    },
  }),
  {
    name: 'doctor-storage',
    getStorage: () => localStorage,
  },
));

export default useDoctorStore;
