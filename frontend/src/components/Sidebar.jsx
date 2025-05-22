import React from "react";
import { Link } from "react-router-dom"; // Para navegación entre rutas
import {
  FaHome,
  FaTasks,
  FaProjectDiagram,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa"; // Iconos de FontAwesome

// Componente principal del sidebar (barra lateral)
const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-blue-900 text-white flex flex-col">
      {/* Encabezado del sidebar */}
      <div className="p-6 text-2xl font-bold border-b border-blue-700">
        Task Manager
      </div>

      {/* Navegación principal */}
      <nav className="flex-1 p-4 space-y-2">
        {/* Elementos de navegación utilizando el componente NavItem */}
        <NavItem icon={<FaHome />} label="Inicio" to="/" />
        <NavItem icon={<FaTasks />} label="Tareas" to="/tareas" />
        <NavItem
          icon={<FaProjectDiagram />}
          label="Proyectos"
          to="/proyectos"
        />
        <NavItem icon={<FaCog />} label="Configuración" to="/configuracion" />
      </nav>

      {/* Sección inferior con opción de cerrar sesión */}
      <div className="p-4 border-t border-blue-700">
        <NavItem icon={<FaSignOutAlt />} label="Cerrar sesión" to="/" />
      </div>
    </div>
  );
};

// Componente reutilizable para cada ítem de navegación
//Usa el componente Link de React Router para navegar
//Recibe tres props icon, label, to:ruta del enlace
const NavItem = ({ icon, label, to }) => (
  <Link
    to={to}
    className="flex items-center space-x-3 p-2 rounded-md hover:bg-blue-700 transition-colors"
  >
    {/* Icono del ítem */}
    <span className="text-lg">{icon}</span>
    {/* Etiqueta del ítem */}
    <span>{label}</span>
  </Link>
);

export default Sidebar;
