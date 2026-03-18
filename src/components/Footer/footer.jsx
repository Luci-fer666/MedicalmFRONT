import "./footer.css"
import { Link } from "react-router-dom";
function Footer() {
  
return (
    <footer>
      <div className="avalado">
        <img src="/assets/img/doctor.jpg" alt="doctor"/>
        <div><p>Avalado por el Dr.Gregorio Casas.</p>
            <p>Especialista en enfermedades infecciosas y nefrología.</p>
            <p>Director del Departamento de Medicina Diagnóstica en el <br/> Hospital Universitario Princeton-Plainsboro</p></div>
      </div>


      <div className="copyright">
        <p>© 2026 · MediCalm</p>
        <p><a href="https://mi-portfolio-black.vercel.app" >Luciano Illuminati</a></p>
      </div>

      <div className="links">
        <nav>
          <Link to="/">Inicio</Link>
          <Link to="/subir">Subir</Link>
          <Link to="register">Registro</Link>
        </nav>
      </div>

    </footer>
  );
}

export default Footer;