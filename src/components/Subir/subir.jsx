import  React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/loading.jsx"
import Error from "../error/error.jsx";
import { AuthContext } from '../../auth/AuthContext.js';
import "./subir.css";

function Subir() {

  const { currentUser } = useContext(AuthContext);
  const [edad, setEdad] = useState("18-29");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle");
  const [loading, setLoading] = useState();
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const calcularRangoEdad = (fechaNacimiento) => {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);

  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const m = hoy.getMonth() - nacimiento.getMonth();

  if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }

  if (edad <= 1) return "0-1";
  if (edad <= 5) return "1-5";
  if (edad <= 11) return "6-11";
  if (edad <= 17) return "12-17";
  if (edad <= 29) return "18-29";
  if (edad <= 49) return "30-49";
  if (edad <= 69) return "50-69";
  return "+70";
  };

  const handleEdadChange = (value) => {
  if (value === "auto" && currentUser?.nacimiento) {
    const rango = calcularRangoEdad(currentUser.nacimiento);
    setEdad(rango);
  } else {
    setEdad(value);
  }
};

  const handleFile = (selectedFile) => {
    if (!selectedFile || selectedFile.type !== "application/pdf") {
      setError("Solo se permiten archivos PDF");
      return;
    }
    setError(null);
    setFile(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) return;

    setStatus("uploading");
    setLoading(true)
    try {
      const formData = new FormData();
      formData.append("pdf", file);
      formData.append("edad", edad);

      const res = await fetch("http://localhost:4000/api/mis-analisis/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Error en el servidor");

      const data = await res.json();
      if (res.ok){
      navigate("/ver-analisis", { state: data });}
    } catch (err) {
      setError(err.message);
      setStatus("error");
    } finally {
        setLoading(false)}
  };

  if (loading) return <div><Loading/></div>;
  if (error) return <div><Error errormessage={error}/></div>;

  return (   
    <div className="subir-container">

      <div className="fondo">
        <img src="/assets/img/inicio.jpg" alt="inicio" />
      </div>

      <div className="texto">
        <p>Recuerda que los resultados seran comparados con los resultados estandar adulto estable de 25 años. Si quieres personalizar la edad debes iniciar sesion.</p>
        <h2>Subir Analisis</h2>
        <select
          value={edad}
          onChange={(e) => handleEdadChange(e.target.value)}>
          {currentUser && <option value="auto">Automático</option>}
          <option value="0-1">0-1</option>
          <option value="1-5">1-5</option>
          <option value="6-11">6-11</option>
          <option value="12-17">12-17</option>
          <option value="18-29">18-29</option>
          <option value="30-49">30-49</option>
          <option value="50-69">50-69</option>
          <option value="+70">+70</option>
        </select>
        <div
          className="drop-zone"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => document.getElementById("fileInput").click()}>
          {file ? (
            <p>📄 {file.name}</p>
          ) : (
            <p>Arrastrá un PDF acá o hacé click</p>
          )}
        </div>
        <input
          id="fileInput"
          type="file"
          accept="application/pdf"
          hidden
          onChange={(e) => handleFile(e.target.files[0])}/>
        <button
          onClick={handleSubmit}
          disabled={!file || status === "uploading"}>
          {status === "uploading" ? "Enviando..." : "Enviar"}
        </button>
      </div>
      {error && <div>Error: {error}</div>}
    </div>
  );
}

export default Subir;