import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavLink } from 'react-router-dom';
import CustomNavbar from '../components/navbar.component';
import useUserStore from '../stores/user.store';

const schema = yup.object({
  username: yup.string().min(5, 'Se requieren minimo 5 caracteres').required('El campo es requerido'),
  email: yup.string().min(5, 'Se requieren minimo 5 caracteres').required('El campo es requerido'),
  password: yup.string().min(5, 'Se requieren minimo 5 caracteres').required('El campo es requerido'),
});

export default function RegisterPage() {
  const handleRegister = useUserStore((state) => state.register);
  const {
    handleSubmit,
    register,
    reset,
    formState: {
      errors,
    },
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (form) => {
    handleRegister(form);
    reset();
  };

  return (
    <div>
      <CustomNavbar />
      <div className="container">
        <div className="mt-4 row justify-content-center">
          <form style={{ width: '100%', maxWidth: 360 }} className="card" onSubmit={handleSubmit(onSubmit)}>
            <div className="card-header">
              <h5 className="card-title">
                Registrar usuario
              </h5>
            </div>
            <div className="card-body">
              <div className="form-group">
                <span>Nombre de usuario</span>
                <input {...register('username')} type="text" className="form-control mb-3" />
                {errors.username?.message && (
                <div className="alert alert-danger" role="alert">
                  {errors.username.message}
                </div>
                )}
              </div>
              <div className="form-group">
                <span>Correo electronico</span>
                <input {...register('email')} type="email" className="form-control mb-3" />
                {errors.email?.message && (
                <div className="alert alert-danger" role="alert">
                  {errors.email.message}
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
                <button type="submit" className="btn btn-primary form-control">Registrarse</button>
              </div>
              <div className="form-group">
                <NavLink className="btn btn-secondary form-control" to="/">Iniciar sesión</NavLink>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
