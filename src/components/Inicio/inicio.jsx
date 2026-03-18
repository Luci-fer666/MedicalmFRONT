import "./inicio.css"

function Inicio() {
  return (
    <div className="inicio">
      
      <div className="fondo">
        <img src="/assets/img/inicio.jpg" alt="inicio" />
      </div>

      <div className="texto">
        <h1>Bienvenido a MediCalm👋</h1>
        <p>
          Esta aplicación permite subir analisis, extraer su contenido
          automáticamente y procesarlo mediante inteligencia artificial.
        </p>
        <p>
          Comenzá subiendo un Analisis desde la sección <strong>Subir</strong>.
        </p>
      </div>

    </div>
  );
}

export default Inicio;