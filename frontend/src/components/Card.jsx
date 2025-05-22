import React from "react";
// Importación de íconos desde react-icons (FontAwesome)
import {
  FaUserCircle,
  FaRegStickyNote,
  FaAlignLeft,
  FaCheck,
  FaSpinner,
  FaTimesCircle,
} from "react-icons/fa";
// Imagen del usuario (local)
import User from "../img/user.png";

// Componente funcional Card que recibe props: title, description y estado
function Card({ title, description, estado }) {
  // Función para traducir el estado a una versión legible para el usuario
  const getEstadoLegible = (estado) => {
    switch (estado) {
      case "done":
        return "Done";
      case "in_progress":
        return "In Progress";
      case "pending":
      default:
        return "Pending";
    }
  };

  // Función para obtener las clases CSS que representan el color del estado
  const getEstadoColor = (estado) => {
    switch (estado) {
      case "done":
        return "bg-green-100 text-green-800"; // Verde para tareas completadas
      case "in_progress":
        return "bg-yellow-100 text-yellow-800"; // Amarillo para tareas en progreso
      case "pending":
      default:
        return "bg-red-100 text-red-800"; // Rojo para tareas pendientes
    }
  };

  // Función para retornar el ícono correspondiente según el estado
  const getEstadoIcon = (estado) => {
    switch (estado) {
      case "done":
        return <FaCheck className="mr-1" />; // Check para 'done'
      case "in_progress":
        return <FaSpinner className="mr-1 animate-spin" />; // Spinner animado
      case "pending":
      default:
        return <FaTimesCircle className="mr-1" />; // X para pendiente
    }
  };

  // Renderización del componente
  return (
    <section className="mr-4">
      <article className="rounded-3xl bg-gray-200 w-[300px] h-[300px] p-6 shadow-sm mt-3 ">
        {/* Sección superior con imagen de usuario y etiqueta */}
        <div className="flex justify-between items-center">
          <img src={User} alt="Usuario" className="h-20 w-20" />
          <span className="text-sm font-light text-[#757575] flex items-center gap-1">
            <FaUserCircle />
            Usuario
          </span>
        </div>

        {/* Sección del contenido de la tarea */}
        <div className="mt-6">
          <h2 className="font-bold flex items-center gap-2">
            <FaRegStickyNote />
            {title} {/* Título de la tarjeta */}
          </h2>
          <p className="text-sm font-light text-[#424242] mt-3 flex items-center gap-2">
            <FaAlignLeft />
            {description} {/* Descripción de la tarjeta */}
          </p>
        </div>

        {/* Sección inferior con estado visual */}
        <div className="flex justify-end items-center mt-5">
          <span
            className={`px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${getEstadoColor(
              estado
            )}`}
          >
            {getEstadoIcon(estado)} {/* Ícono según estado */}
            {getEstadoLegible(estado)} {/* Texto según estado */}
          </span>
        </div>
      </article>
    </section>
  );
}

export default Card; // Exportación del componente para su uso en otros archivos
