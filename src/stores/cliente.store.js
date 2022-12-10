import create from 'zustand';
import { persist } from 'zustand/middleware';
import API from '../services/api.service';

const useClienteStore = create(persist(
  (set) => ({
    clientes: null,
    fetchClientes: async () => {
      const res = await API.get('/clientes?populate=usuario&sort=id:desc');
      set({ clientes: res.data.data });
    },
    addCliente: async (form) => {
      await API.post('/clientes', {
        data: form,
      });
    },
    deleteCliente: async (id) => {
      await API.delete(`/clientes/${id}`);
    },
  }),
  {
    name: 'doctor-storage',
    getStorage: () => localStorage,
  },
));

export default useClienteStore;
