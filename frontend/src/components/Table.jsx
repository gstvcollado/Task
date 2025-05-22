import React from "react";
// Íconos de acciones y estados
import {
  FaEdit,
  FaTrash,
  FaCheck,
  FaSpinner,
  FaTimesCircle,
} from "react-icons/fa";

// Componente funcional Table que recibe tareas y funciones para editar y eliminar
const Table = ({ tareas, onEditar, onEliminar }) => {
  return (
    <div className="ml-3">
      {/* Tabla principal */}
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            {/* Encabezados de la tabla */}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Título
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Descripción
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Estado
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {/* Recorre la lista de tareas y genera una fila por tarea */}
          {tareas.map((item) => (
            <tr key={item.id}>
              {/* Columna: Título de la tarea */}
              <td className="px-6 py-4 text-sm text-gray-900">{item.title}</td>

              {/* Columna: Descripción */}
              <td className="px-6 py-4 text-sm text-gray-900">
                {item.description}
              </td>

              {/* Columna: Estado con colores e íconos condicionales */}
              <td className="px-6 py-4 text-sm">
                <span
                  className={`px-4 inline-flex items-center gap-1 text-xs leading-5 font-semibold rounded-full ${
                    item.status === "done"
                      ? "bg-green-100 text-green-800"
                      : item.status === "in_progress"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {/* Ícono dependiendo del estado */}
                  {item.status === "done" && <FaCheck />}
                  {item.status === "in_progress" && (
                    <FaSpinner className="animate-spin" />
                  )}
                  {item.status === "pending" && <FaTimesCircle />}

                  {/* Texto legible del estado */}
                  {item.status === "done"
                    ? "Done"
                    : item.status === "in_progress"
                    ? "InProgress"
                    : "Pending"}
                </span>
              </td>

              {/* Columna: Botones de acción (Editar y Eliminar) */}
              <td className="px-6 py-4 text-sm flex space-x-2">
                {/* Botón Editar */}
                <button
                  onClick={() => onEditar(item)} // Llama a la función con la tarea actual
                  className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                >
                  <FaEdit />
                  Editar
                </button>

                {/* Botón Eliminar */}
                <button
                  onClick={() => onEliminar(item.id)} // Llama a la función con el ID
                  className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                >
                  <FaTrash />
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
