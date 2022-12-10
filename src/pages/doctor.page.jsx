import React, { useEffect } from 'react';
import CustomNavbar from '../components/navbar.component';
import useUserStore from '../stores/user.store';
import useDoctorStore from '../stores/doctor.store';

export default function DoctorPage() {
  const logout = useUserStore((state) => state.logout);
  const {
    doctores, fetchDoctores, // deleteDoctor
  } = useDoctorStore((state) => state);
  useEffect(() => {
    fetchDoctores();
  }, []);

  return (
    <>
      <CustomNavbar isAuth handleLogout={logout} />
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo electronico</th>
              <th>Telefono</th>
              <th>Direccion</th>
            </tr>
          </thead>
          <tbody>
            { doctores && doctores.map((doctor) => (
              <tr>
                <td>{doctor?.nombre_completo ?? 'NA'}</td>
                <td>{doctor?.email ?? 'NA'}</td>
                <td>{doctor?.telefono ?? 'NA'}</td>
                <td>{doctor?.direccion ?? 'NA'}</td>
                {/*
                <td>
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() => {
                      deleteDoctor(doctor?.id).then(() => {
                        fetchDoctores();
                      });
                    }}
                  >
                    Eliminar
                  </button>
                </td>
                  */}
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    </>
  );
}
