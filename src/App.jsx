import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home.page';
import RegisterPage from './pages/register.page';
import useUserStore from './stores/user.store';
import CitaPage from './pages/cita.page';
import DoctorPage from './pages/doctor.page';
import MascotaPage from './pages/mascota.page';
import ClientePage from './pages/cliente.page';
import RedirectToHome from './components/tohome.component';

function App() {
  const { jwt, user } = useUserStore((state) => state);
  return (
    <BrowserRouter>
      <Routes>
        { (jwt === null || user === null) ? (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<RedirectToHome />} />
          </>
        ) : (
          <>
            <Route path="/" element={<CitaPage />} />
            <Route path="/doctores" element={<DoctorPage />} />
            <Route path="/mascotas" element={<MascotaPage />} />
            <Route path="/clientes" element={<ClientePage />} />
            <Route path="*" element={<RedirectToHome />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
