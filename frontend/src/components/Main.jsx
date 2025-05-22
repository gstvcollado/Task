import React from "react";
import { Routes, Route } from "react-router-dom"; // Importa componentes para manejo de rutas

// Importación de las páginas que se van a renderizar en función de la ruta
import Inicio from "../pages/Inicio";
import Tareas from "../pages/Tareas";
import Proyectos from "../pages/Proyectos";
import Configuracion from "../pages/Configuracion";
import DownloadReport from "../pages/DownloadReport";

// Componente principal que gestiona las rutas de la aplicación
const Main = () => {
  return (
    // Contenedor principal del contenido de las páginas
    <main className="flex-1 p-6 bg-blue-200 min-h-screen">
      {/* Componente Routes de react-router-dom para manejar múltiples rutas */}
      <Routes>
        {/* Define cada ruta y el componente que debe renderizarse */}
        <Route path="/" element={<Inicio />} /> {/* Ruta de inicio */}
        <Route path="/tareas" element={<Tareas />} /> {/* Página de tareas */}
        <Route path="/proyectos" element={<Proyectos />} />
        {/* Página de proyectos */}
        <Route path="/configuracion" element={<Configuracion />} />
        {/* Página de configuración */}
        <Route path="/report/pdf" element={<DownloadReport />} />
      </Routes>
    </main>
  );
};

export default Main;
