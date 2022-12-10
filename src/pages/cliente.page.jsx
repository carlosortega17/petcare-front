import React, { useEffect } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomNavbar from '../components/navbar.component';
import useClienteStore from '../stores/cliente.store';
import useUserStore from '../stores/user.store';

export default function ClientePage() {
  const logout = useUserStore((state) => state.logout);
  const { clientes, fetchClientes, addCliente } = useClienteStore((state) => state);
  const schema = yup.object({
    nombre_completo: yup.string().required('El campo es requerido'),
    telefono: yup.number().required('El campo es requerido'),
    direccion: yup.string().required('El campo es requerido'),
  });

  useEffect(() => {
    fetchClientes();
  }, []);

  const {
    handleSubmit,
    register,
    reset,
  } = useForm({
    defaultValues: {
      nombre_completo: '',
      telefono: 0,
      direccion: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (form) => {
    addCliente(form).then(() => {
      fetchClientes();
      reset();
    });
  };

  return (
    <>
      <CustomNavbar isAuth handleLogout={logout} />
      <div className="container">
        <form className="card mb-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="card-header">
            <h5 className="card-title">Agregar Cliente</h5>
          </div>
          <div className="card-body">
            <div className="form-group">
              <span>Nombre</span>
              <input className="form-control" type="text" {...register('nombre_completo')} />
            </div>
            <div className="form-group">
              <span>Telefono</span>
              <input className="form-control" type="text" {...register('telefono')} />
            </div>
            <div className="form-group">
              <span>Direccion</span>
              <textarea className="form-control" {...register('direccion')} />
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
              <th>Telefono</th>
              <th>Direccion</th>
            </tr>
          </thead>
          <tbody>
            { clientes && clientes.map((cliente) => (
              <tr>
                <td>{cliente?.attributes?.nombre_completo}</td>
                <td>{cliente?.attributes?.telefono}</td>
                <td>{cliente?.attributes?.direccion}</td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    </>
  );
}
