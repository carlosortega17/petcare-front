import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import CustomNavbar from '../components/navbar.component';
import useUserStore from '../stores/user.store';
import useCitaStore from '../stores/cita.store';
import useDoctorStore from '../stores/doctor.store';
import useClienteStore from '../stores/cliente.store';
import useMascotaStore from '../stores/mascota.store';

export default function DashboardPage() {
  const logout = useUserStore((state) => state.logout);
  const schema = yup.object({
    cliente: yup.number().required('El campo es requerido'),
    doctor: yup.number().required('El campo es requerido'),
    mascota: yup.number().required('El campo es requerido'),
    descripcion: yup.string().min(3, 'Se requiere almenos 3 caracteres').required('El campo es requerido'),
    horario_cita: yup.date().required(),
    hora: yup.string().required(),
  });
  const { citas, addCita, fetchCitas } = useCitaStore((state) => state);
  const { doctores, fetchDoctores } = useDoctorStore((state) => state);
  const { clientes, fetchClientes } = useClienteStore((state) => state);
  const { mascotas, fetchMascotasById } = useMascotaStore((state) => state);

  const {
    handleSubmit,
    register,
    reset,
  } = useForm({
    defaultValues: {
      cliente: '',
      doctor: '',
      mascota: '',
      descripcion: '',
      horario_cita: '',
      hora: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (form) => {
    addCita(form).then(() => {
      fetchCitas();
      reset();
    });
  };

  useEffect(() => {
    fetchDoctores();
    fetchClientes();
    fetchCitas();
    fetchMascotasById();
  }, []);

  return (
    <>
      <CustomNavbar isAuth handleLogout={logout} />
      <div className="container">
        <form className="card mb-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="card-header">
            <h5 className="card-title">Agregar Cita</h5>
          </div>
          <div className="card-body">
            <div className="form-group">
              <span>Doctor</span>
              <select {...register('doctor')} className="form-control">
                {doctores && doctores.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor?.nombre_completo}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <span>Cliente</span>
              <select
                {...register('cliente')}
                onChange={(e) => {
                  fetchMascotasById(e.target.value);
                }}
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
              <span>Mascota</span>
              <select {...register('mascota')} className="form-control">
                {mascotas && mascotas?.map((mascota) => (
                  <option key={mascota.id} value={mascota.id}>
                    {mascota.attributes.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <span>Descripcion</span>
              <textarea {...register('descripcion')} className="form-control" />
            </div>
            <div className="form-group">
              <span>Fecha de consulta</span>
              <input type="date" {...register('horario_cita')} className="form-control" />
            </div>
            <div className="form-group">
              <span>Hora</span>
              <input type="time" {...register('hora')} className="form-control" />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary form-control">Agregar</button>
            </div>
          </div>
        </form>
        <table className="table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Doctor</th>
              <th>Mascota</th>
              <th>Descripcion</th>
              <th>Fecha de la cita</th>
              <th>Hora</th>
            </tr>
          </thead>
          <tbody>
            { citas && citas.map((cita) => (
              <tr>
                <td>{cita.attributes.cliente.data.attributes.nombre_completo}</td>
                <td>{cita.attributes.doctor.data.attributes.nombre_completo}</td>
                <td>{cita.attributes.mascota.data.attributes.nombre}</td>
                <td>{cita.attributes.descripcion}</td>
                <td>{cita.attributes.horario_cita}</td>
                <td>{cita.attributes.hora}</td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    </>
  );
}
