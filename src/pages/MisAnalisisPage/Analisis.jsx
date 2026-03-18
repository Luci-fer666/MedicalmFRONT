import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext.js';
import Error from "../../components/error/error.jsx";
import Loading from '../../components/Loading/loading.jsx';
import './Analisis.css';


function Analisis() {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [analisis, setAnalisis] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

useEffect(() => {
  if (!currentUser) {
    navigate("/login");
  }
}, [currentUser, navigate]);

useEffect(() => {
  const fetchAnalisis = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No hay sesión activa");
      }
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/mis-analisis`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "No se pudieron obtener los análisis");
      }
      const data = await response.json();
      setAnalisis(data);

    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  fetchAnalisis();
}, []);

  if (loading) return <Loading/>;
  if (error) return <Error errormessage={error}/>;
  if (!analisis) return <div>No se encontraron analisis</div>;

return (
  <main className="contenido-pedidos">
    <h1 className="titulo-pagina">Mis Análisis</h1>

    {analisis.length === 0 && (
      <p>No tienes análisis guardados.</p>
    )}

    <div className="lista-pedidos">
      {analisis.map((item) => (
        <div key={item._id} className="pedido-card">

          <div className="pedido-header">
            <div className="info-pedido">
              <h3>Análisis #{item._id.slice(-6)}</h3>
              <span className="fecha-pedido">
                {new Date(item.fecha).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="pedido-items">
            <p><strong>Paciente:</strong> {item.nombrePaciente}</p>
          </div>

          <button
            onClick={() => navigate(`/analisis/${item._id}`)}
          >
            Ver análisis
          </button>

        </div>
      ))}
    </div>
  </main>
);
}
export default Analisis;
