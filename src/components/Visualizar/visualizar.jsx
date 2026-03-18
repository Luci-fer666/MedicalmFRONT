import "./visualizar.css";
import { useNavigate } from "react-router-dom";
import  React, { useContext } from "react";
import { AuthContext } from '../../auth/AuthContext';
import { ReactComponent as PorcentajeSVG } from "./porcentaje.svg";

function Visualizar({ analisis }) {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  
  const renderCeldaValor = (dato) => {
    if (!dato || typeof dato !== "object") {
      return <span className="no-encontrado">No se encontró en el PDF</span>;
    }
    const valor = dato.valor;
    const estado = dato.estado;

    if (estado === "normal") return <span className="normal">{valor}</span>;
    if (estado === "alto") return <span className="alto">{valor}</span>;
    if (estado === "bajo") return <span className="bajo">{valor}</span>;
    if (valor === 0) return <span className="no-encontrado">No se encontró en el PDF</span>;

    return <span>{valor}</span>;
  };
  
  const renderSimple = (valor) => {
    return valor
      ? <span>{valor}</span>
      : <span className="no-encontrado">No se encontró en el PDF</span>;
  };

  const volverASubir = () => {
    navigate("/subir");
  };

  const guardarAnalisis = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("No hay sesión activa");
        return;
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/mis-analisis/guardar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          resultado: analisis
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Error al procesar pedido");
        return;
      }

      alert("Análisis guardado con éxito!");
    } catch (error) {
      console.error(error);
      alert("Error inesperado");
    }
  };

  const calcularPorcentajeNormal = (analisis) => {
    let totalValidos = 0;
    let totalNormales = 0;
    const recorrer = (obj) => {
      for (let key in obj) {
        const valor = obj[key];

        if (typeof valor === "object" && valor !== null) {
          recorrer(valor);
        }
        if (key === "estado") {
          if (valor !== "no_encontrado") {
            totalValidos++;
            if (valor === "normal") {
              totalNormales++;
            }
          }
        }
      }
    };
  recorrer(analisis);
  const porcentaje =
    totalValidos === 0 ? 0 : (totalNormales / totalValidos) * 100;
  return Number(porcentaje.toFixed(2));
  };
  const porcentajeNormal = calcularPorcentajeNormal(analisis);

  const getColorClase = () => {
    if (porcentajeNormal === 100) return "color-verde";
    if (porcentajeNormal > 80) return "color-amarillo";
    return "color-rojo";
  };

  return (
    <div style={{ padding: 20 }}>
     
      <h2>Analisis procesado correctamente</h2>

    <div className="informe">
      <div className="porcentaje">
        <PorcentajeSVG className={`silueta ${getColorClase()}`} />
        <p className={`porcentaje-texto ${getColorClase()}`}>
          {porcentajeNormal} %
        </p>
      </div>

      <div className={`conclusion-box ${getColorClase()}`}>
        {porcentajeNormal === 100 ? (
          <p>Todo parece verse bien. Aun así, se recomienda consultar con un especialista.</p>
        ) : porcentajeNormal > 80 ? (
          <p>La mayoría de los valores están dentro del rango. Se recomienda control médico.</p>
        ) : (
          <p>Varios valores están fuera de rango. Se recomienda evaluación médica.</p>
        )}
      </div>
    </div>

    <div>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 20 }}>
        {/* ================= DATOS DEL PACIENTE ================= */}
        <tbody>
          <tr>
            <td colSpan={2} className="seccionNombre">Datos del paciente</td>
          </tr>
          <tr>
            <td className="parametro">Comparacion</td>
            <td>{renderSimple(analisis.patron.comparacion)}</td>
          </tr>
          <tr>
            <td className="parametro">Nombre</td>
            <td>{renderSimple(analisis.datos_paciente.nombre)}</td>
          </tr>
          <tr>
            <td className="parametro">Fecha</td>
            <td>{renderSimple(analisis.datos_paciente.fecha)}</td>
          </tr>
        </tbody>
        {/* ================= HEMOGRAMA ================= */}
        <tbody>
          <tr>
            <td colSpan={2} className="seccionNombre">Hemograma</td>
          </tr>
          <tr>
            <td className="parametro">Glóbulos rojos</td>
            <td>{renderCeldaValor(analisis.hemograma.globulos_rojos)}</td>
          </tr>
          <tr>
            <td className="parametro">Hemoglobina</td>
            <td>{renderCeldaValor(analisis.hemograma.hemoglobina)}</td>
          </tr>
          <tr>
            <td className="parametro">Hematocrito</td>
            <td>{renderCeldaValor(analisis.hemograma.hematocrito)}</td>
          </tr>
          <tr>
            <td className="parametro">Glóbulos blancos</td>
            <td>{renderCeldaValor(analisis.hemograma.globulos_blancos)}</td>
          </tr>
          <tr>
            <td className="parametro">Plaquetas</td>
            <td>{renderCeldaValor(analisis.hemograma.plaquetas)}</td>
          </tr>
        </tbody>
        {/* ================= GLUCEMIA ================= */}
        <tbody>
          <tr>
            <td colSpan={2} className="seccionNombre">Glucemia</td>
          </tr>
          <tr>
            <td className="parametro">Glucosa</td>
            <td>{renderCeldaValor(analisis.glucemia.glucosa)}</td>
          </tr>
        </tbody>
        {/* ================= FUNCIÓN RENAL ================= */}
        <tbody>
          <tr>
            <td colSpan={2} className="seccionNombre">Función renal</td>
          </tr>
          <tr>
            <td className="parametro">Urea</td>
            <td>{renderCeldaValor(analisis.funcion_renal.urea)}</td>
          </tr>
          <tr>
            <td className="parametro">Creatinina</td>
            <td>{renderCeldaValor(analisis.funcion_renal.creatinina)}</td>
          </tr>
        </tbody>
        {/* ================= FUNCIÓN HEPÁTICA ================= */}
        <tbody>
          <tr>
            <td colSpan={2} className="seccionNombre">Función hepática</td>
          </tr>
          <tr>
            <td className="parametro">AST (TGO)</td>
            <td>{renderCeldaValor(analisis.funcion_hepatica.ast_tgo)}</td>
          </tr>
          <tr>
            <td className="parametro">ALT (TGP)</td>
            <td>{renderCeldaValor(analisis.funcion_hepatica.alt_tgp)}</td>
          </tr>
          <tr>
            <td className="parametro">Fosfatasa alcalina</td>
            <td>{renderCeldaValor(analisis.funcion_hepatica.fosfatasa_alcalina)}</td>
          </tr>
          <tr>
            <td className="parametro">Bilirrubina total</td>
            <td>{renderCeldaValor(analisis.funcion_hepatica.bilirrubina_total)}</td>
          </tr>
        </tbody>
        {/* ================= PERFIL LIPÍDICO ================= */}
        <tbody>
          <tr>
            <td colSpan={2} className="seccionNombre">Perfil lipídico</td>
          </tr>
          <tr>
            <td className="parametro">Colesterol total</td>
            <td>{renderCeldaValor(analisis.perfil_lipidico.colesterol_total)}</td>
          </tr>
          <tr>
            <td className="parametro">LDL</td>
            <td>{renderCeldaValor(analisis.perfil_lipidico.ldl)}</td>
          </tr>
          <tr>
            <td className="parametro">HDL</td>
            <td>{renderCeldaValor(analisis.perfil_lipidico.hdl)}</td>
          </tr>
          <tr>
            <td className="parametro">Triglicéridos</td>
            <td>{renderCeldaValor(analisis.perfil_lipidico.trigliceridos)}</td>
          </tr>
        </tbody>
        {/* ================= ELECTROLITOS ================= */}
        <tbody>
          <tr>
            <td colSpan={2} className="seccionNombre">Electrolitos</td>
          </tr>
          <tr>
            <td className="parametro">Sodio</td>
            <td>{renderCeldaValor(analisis.electrolitos.sodio)}</td>
          </tr>
          <tr>
            <td className="parametro">Potasio</td>
            <td>{renderCeldaValor(analisis.electrolitos.potasio)}</td>
          </tr>
          <tr>
            <td className="parametro">Cloro</td>
            <td>{renderCeldaValor(analisis.electrolitos.cloro)}</td>
          </tr>
        </tbody>
        {/* ================= PROTEÍNAS ================= */}
        <tbody>
          <tr>
            <td colSpan={2} className="seccionNombre">Proteínas</td>
          </tr>
          <tr>
            <td className="parametro">Proteínas totales</td>
            <td>{renderCeldaValor(analisis.proteinas.proteinas_totales)}</td>
          </tr>
          <tr>
            <td className="parametro">Albúmina</td>
            <td>{renderCeldaValor(analisis.proteinas.albumina)}</td>
          </tr>
        </tbody>
        {/* ================= COAGULACIÓN ================= */}
        <tbody>
          <tr>
            <td colSpan={2} className="seccionNombre">Coagulación</td>
          </tr>
          <tr>
            <td className="parametro">TP / INR</td>
            <td>{renderCeldaValor(analisis.coagulacion.tp_inr)}</td>
          </tr>
          <tr>
            <td className="parametro">TTPa</td>
            <td>{renderCeldaValor(analisis.coagulacion.ttpa)}</td>
          </tr>
        </tbody>
        {/* ================= MARCADORES INFLAMATORIOS ================= */}
        <tbody>
          <tr>
            <td colSpan={2} className="seccionNombre">Marcadores inflamatorios</td>
          </tr>
          <tr>
            <td className="parametro">PCR</td>
            <td>{renderCeldaValor(analisis.marcadores_inflamatorios.pcr)}</td>
          </tr>
          <tr>
            <td className="parametro">VSG</td>
            <td>{renderCeldaValor(analisis.marcadores_inflamatorios.vsg)}</td>
          </tr>
        </tbody>
      </table>
      <br/>
    </div>
    <div className="botones-analisis">
      {currentUser ? (
        <div><button id="guardar" className="btnsave" 
            onClick={() => guardarAnalisis()}> Guardar </button></div>
            ) : 
            (
        <div><button id="guardar" className="btnsave"> 
        Para guardar los datos, inicie sesion </button> </div>
            )}

      <div><button  id="guardar" className="btnsave" 
      onClick={() => volverASubir()}>
        Volver a Subir
      </button></div>
      </div>
  </div>
  
  );
}
export default Visualizar;
