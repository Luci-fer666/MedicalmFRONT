import { Routes, Route } from "react-router-dom";

import "./App.css"

import Subir from "./pages/SubirAnalisis/SubirAnalisis.jsx";

import VerAnalisis from "./pages/VerAnalisisPage/VerAnalisis.jsx";
import Header from "./components/Header/header.jsx";
import Footer from "./components/Footer/footer.jsx";
import IndexBody from "./pages/HomePage/BodyIndex.jsx";
import Login from "./pages/LoginPage/Login.jsx";
import Recordatorio from "./components/Recordatorio/recordatorio.jsx";
import Register from "./pages/RegistroPage/Register.jsx";
import Perfil from "./pages/PerfilPage/Perfil.jsx";
import Analisis from "./pages/MisAnalisisPage/Analisis.jsx";
import Revisualizar from "./components/Visualizar/revisualizar.jsx";

function App() {
  return (
    <div className="app-layout">
      <Header/>
      <Recordatorio/>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<IndexBody />} />
          <Route path="/subir" element={<Subir />} />
          <Route path="/ver-analisis" element={<VerAnalisis />} />
          <Route path="/mis-analisis" element={<Analisis />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="perfil/:id" element={<Perfil />} />
          <Route path="/analisis/:id" element={<Revisualizar />} />
        </Routes>
      </main>

      <Footer/>
    </div>
  );}

export default App;