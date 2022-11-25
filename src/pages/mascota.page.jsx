import React, { useEffect } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomNavbar from '../components/navbar.component';
import useClienteStore from '../stores/cliente.store';
import useMascotaStore from '../stores/mascota.store';
import useUserStore from '../stores/user.store';

export default function MascotaPage() {
  const logout = useUserStore((state) => state.logout);
  const { mascotas, fetchMascotas, addMascota } = useMascotaStore((state) => state);
  const { clientes, fetchClientes } = useClienteStore((state) => state);
  const schema = yup.object({
    cliente: yup.number().required('El campo es requerido'),
    nombre: yup.string().required('El campo es requerido'),
    raza: yup.string().required('El campo es requerido'),
    edad: yup.number().required('El campo es requerido'),
  });

  useEffect(() => {
    fetchMascotas();
    fetchClientes();
  }, []);

  const {
    handleSubmit,
    register,
    reset,
  } = useForm({
    defaultValues: {
      cliente: '',
      nombre: '',
      raza: '',
      edad: 0,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (form) => {
    addMascota(form).then(() => {
      fetchMascotas();
      reset();
    });
  };

  return (
    <>
      <CustomNavbar isAuth handleLogout={logout} />
      <div className="container">
        <form className="card mb-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="card-header">
            <h5 className="card-title">Agregar Mascota</h5>
          </div>
          <div className="card-body">
            <div className="form-group">
              <span>Cliente</span>
              <select
                {...register('cliente')}
                className="form-control"
              >
                {clientes && clientes.map((cliente) => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.attributes.nombre_completo}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <span>Nombre</span>
              <input className="form-control" type="text" {...register('nombre')} />
            </div>
            <div className="form-group">
              <span>Raza</span>
              <input className="form-control" type="text" {...register('raza')} />
            </div>
            <div className="form-group">
              <span>Edad</span>
              <input min="0" className="form-control" type="number" {...register('edad')} />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary form-control">Agregar</button>
            </div>
          </div>
        </form>
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Raza</th>
              <th>Edad</th>
              <th>Cliente</th>
            </tr>
          </thead>
          <tbody>
            { mascotas && mascotas.map((mascota) => (
              <tr>
                <td>{mascota.attributes.nombre}</td>
                <td>{mascota.attributes.raza}</td>
                <td>{mascota.attributes.edad}</td>
                <td>{mascota.attributes.cliente.data.attributes.nombre_completo}</td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    </>
  );
}
