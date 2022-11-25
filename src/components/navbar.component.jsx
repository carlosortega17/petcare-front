import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function CustomNavbar({ isAuth, handleLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
      <NavLink className="navbar-brand" to="/">
        <img src="/favicon.png" width="30" height="30" className="d-inline-block align-top" alt="" />
        Petcare
      </NavLink>
      {isAuth && (
        <>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink className="nav-item nav-link" to="/">Citas</NavLink>
              <NavLink className="nav-item nav-link" to="/doctores">Doctores</NavLink>
              <NavLink className="nav-item nav-link" to="/mascotas">Mascotas</NavLink>
              <NavLink className="nav-item nav-link" to="/clientes">Clientes</NavLink>
              <NavLink className="nav-item nav-link" type="button" onClick={handleLogout}>Cerrar sesion</NavLink>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}

CustomNavbar.propTypes = {
  isAuth: PropTypes.bool,
  handleLogout: PropTypes.instanceOf(Function),
};

CustomNavbar.defaultProps = {
  isAuth: false,
  handleLogout: () => {},
};
