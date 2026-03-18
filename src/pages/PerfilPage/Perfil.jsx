import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext.js';
import Loading from '../../components/Loading/loading.jsx';
import Error from '../../components/error/error.jsx';
import './Perfil.css';

function Perfil() {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuario = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/${id}`);

        if (response.status === 404) {
          setUser(null);
          setLoading(false);
          return;
        }

        if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message ||'No se pudo obtener el usuario');
        }

        const data = await response.json();
        console.log("Usuario recibido:", data);

        setUser(data);

      } catch (err) {
        console.error("Error al obtener usuario:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUsuario();
    }
  }, [id]);

  if (loading) return <p><Loading/></p>;
  if (!currentUser){
    navigate("/login");
    return <p>Debes iniciar sesión para visualizar esta página</p>;
  }
  if (error) return <Error errormessage={error}/>;
  if (!user) return <p>No se encontró el usuario
                    <button className="btn-logout" onClick={logout}>Logout</button> </p>;

  return (
    <main id="perfil-container">
      <div className="perfil-card">
        <h2 className="perfil-nombre">{user.username}</h2>

        <img
          className="perfil-imagen"
          src={user.usericon}
          alt={user.username}
        />

        <ul className="perfil-lista">
          <li><strong>Usuario:</strong> {user.username}</li>
          <li><strong>Email:</strong> {user.email}</li>
        </ul>

        <button className="btn-logout" onClick={logout}>Logout</button>

        <div className="perfil-links">
          <Link className="perfil-link" to={`/mis-analisis/${user._id}`}>Mis analisis</Link>
        </div>
      </div>
    </main>
  );
}

export default Perfil;