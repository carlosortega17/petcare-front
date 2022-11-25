import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavLink } from 'react-router-dom';
import CustomNavbar from '../components/navbar.component';
import useUserStore from '../stores/user.store';

const schema = yup.object({
  identifier: yup.string().min(5, 'Se requieren minimo 5 caracteres').required('El campo es requerido'),
  password: yup.string().min(5, 'Se requieren minimo 5 caracteres').required('El campo es requerido'),
});

export default function HomePage() {
  const login = useUserStore((state) => state.login);
  const {
    handleSubmit,
    register,
    formState: {
      errors,
    },
  } = useForm({
    defaultValues: {
      identifier: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (form) => {
    login(form);
  };

  return (
    <div>
      <CustomNavbar />
      <div className="container">
        <div className="mt-4 row justify-content-center">
          <form style={{ width: '100%', maxWidth: 360 }} className="card" onSubmit={handleSubmit(onSubmit)}>
            <div className="card-header">
              <h5 className="card-title">
                Iniciar sesión
              </h5>
            </div>
            <div className="card-body">
              <div className="form-group">
                <span>Correo electronico</span>
                <input {...register('identifier')} type="email" className="form-control mb-3" />
                {errors.identifier?.message && (
                <div className="alert alert-danger" role="alert">
                  {errors.identifier.message}
                </div>
                )}
              </div>
              <div className="form-group">
                <span>Contraseña</span>
                <input {...register('password')} type="password" className="form-control mb-3" />
                {errors.password?.message && (
                <div className="alert alert-danger" role="alert">
                  {errors.password.message}
                </div>
                )}
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary form-control">Ingresar</button>
              </div>
              <div className="form-group">
                <NavLink className="btn btn-secondary form-control" to="/register">Registrarse</NavLink>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
