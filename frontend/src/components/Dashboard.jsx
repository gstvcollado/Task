import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Definición de colores para cada estado de la tarea
const statusColors = {
  pending: "#facc15", // Amarillo para tareas pendientes
  in_progress: "#3b82f6", // Azul para tareas en progreso
  done: "#22c55e", // Verde para tareas completadas
};

// Colores de fondo para las etiquetas de estado
const badgeColors = {
  pending: "bg-yellow-400",
  in_progress: "bg-blue-500",
  done: "bg-green-500",
};

const Dashboard = () => {
  // Estado para almacenar las tareas
  const [tasks, setTasks] = useState([]);

  // useEffect para cargar las tareas al inicio de la aplicación
  useEffect(() => {
    // Realiza la solicitud HTTP para obtener las tareas
    axios
      .get("http://127.0.0.1:8000/api/tasks") // URL de la API para obtener las tareas
      .then((response) => setTasks(response.data)) // Guarda las tareas en el estado
      .catch((error) => console.error("Error cargando tareas", error)); // Manejo de errores
  }, []); // El array vacío asegura que solo se ejecute una vez cuando el componente se monta

  return (
    <div className="bg-gray-100 rounded p-4 shadow-md max-w-7xl mx-auto">
      {/* Sección de Lista de tareas */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Lista de Tareas
        </h2>
        <ul className="bg-white p-3 rounded shadow max-h-52 overflow-y-auto text-sm">
          {/* Mapeo de tareas y renderización de cada tarea en la lista */}
          {tasks.map((task) => (
            <li
              key={task.id} // Asegura que cada tarea tenga una clave única
              className="border-b p-2 flex justify-between items-center"
            >
              {/* Título de la tarea */}
              <span className="text-gray-800">{task.title}</span>
              {/* Estado de la tarea con un color de fondo dinámico */}
              <span
                className={`px-2 py-1 text-white rounded text-xs ${
                  badgeColors[task.status]
                }`}
              >
                {task.status.replace("_", " ")}{" "}
                {/* Muestra el estado de la tarea */}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Sección de gráficos */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Progreso de Tareas
        </h2>
        {/* Se crea una cuadrícula responsiva para los gráficos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[35vh] overflow-y-auto pr-2">
          {/* Mapeo de tareas para renderizar un gráfico por cada una */}
          {tasks.map((task) => (
            <div key={task.id} className="bg-white p-3 rounded shadow text-sm">
              {/* Título de la tarea en el gráfico */}
              <h3 className="font-medium text-gray-900 mb-1">{task.title}</h3>
              {/* ResponsiveContainer asegura que el gráfico sea responsivo */}
              <ResponsiveContainer width="100%" height={120}>
                <BarChart
                  data={[
                    {
                      name: task.title,
                      value:
                        // Asigna un valor basado en el estado de la tarea
                        task.status === "done"
                          ? 100 // 100% para tareas completadas
                          : task.status === "in_progress"
                          ? 50 // 50% para tareas en progreso
                          : 10, // 10% para tareas pendientes
                    },
                  ]}
                >
                  {/* Ejes X y Y */}
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 10, fill: "#6B7280" }}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: "#6B7280" }}
                    domain={[0, 100]} // Limita el eje Y entre 0 y 100
                  />
                  <Tooltip /> {/* Muestra un tooltip con detalles */}
                  {/* Barra que representa el progreso */}
                  <Bar
                    dataKey="value"
                    fill={statusColors[task.status]} // Color de la barra según el estado
                    radius={[4, 4, 0, 0]} // Bordes redondeados en la parte superior de la barra
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
