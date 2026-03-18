import { Link } from "react-router-dom";
import "./header.css";
import { AuthContext } from '../../auth/AuthContext';
import React, { useContext } from 'react';

function Header() {
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?.id;

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="brand">
          <img
            className="logo"
            src="/assets/img/logo.png"
            alt="Icono"
          />
          <span className="brand-name">MediCalm</span>
        </Link>
      </div>

      <nav className="nav">
        <Link to="/" className="link">Inicio</Link>
        <Link to="/subir" className="link">Subir</Link>

        {currentUser ? (
          <>
            <Link to={`/perfil/${userId}`} className="link">Perfil</Link>
            <Link to="/mis-analisis" className="link">Análisis</Link>
          </>
        ) : (
          <Link to="/login" className="link login-btn">Login</Link>
        )}
      </nav>
    </header>
  );
}

export default Header;