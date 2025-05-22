import React, { useEffect, useState } from "react";
import axios from "axios"; // Cliente HTTP para llamadas a la API
import Card from "../components/Card"; // Tarjeta individual de tarea
import Table from "../components/Table"; // Tabla con listado de tareas
import ModalEditar from "../components/ModalEditar"; // Modal para crear/editar tareas
import { FiPlus } from "react-icons/fi"; // Ícono "+" para el botón de agregar

// Componente principal de la vista de tareas
const Tareas = () => {
  // Estado para guardar todas las tareas
  const [tareas, setTareas] = useState([]);
  // Estado para la tarea actualmente seleccionada (para editar)
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);
  // Estado para mostrar u ocultar el modal
  const [mostrarModal, setMostrarModal] = useState(false);

  // Función para obtener las tareas desde la API
  const fetchTareas = () => {
    axios
      .get("http://127.0.0.1:8000/api/v1/tasks") // Llama al backend
      .then((res) => setTareas(res.data)) // Guarda las tareas en el estado
      .catch((err) => console.error("Error al obtener tareas", err));
  };

  // useEffect se ejecuta al montar el componente
  useEffect(() => {
    fetchTareas(); // Carga las tareas una vez al iniciar
  }, []);

  // Función para eliminar una tarea
  const handleEliminar = (id) => {
    if (confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
      axios
        .delete(`http://127.0.0.1:8000/api/v1/tasks/${id}`) // Llama al backend
        .then(fetchTareas) // Refresca la lista de tareas
        .catch((err) => console.error("Error al eliminar tarea", err));
    }
  };

  // Función para iniciar la edición de una tarea
  const handleEditar = (tarea) => {
    setTareaSeleccionada(tarea); // Selecciona la tarea a editar
    setMostrarModal(true); // Muestra el modal de edición
  };

  // Función para guardar cambios (crear o editar tarea)
  const handleGuardar = (id, datos) => {
    if (id) {
      // Actualizar tarea existente
      axios
        .put(`http://127.0.0.1:8000/api/v1/tasks/${id}`, datos)
        .then(fetchTareas)
        .catch((err) => console.error("Error al actualizar tarea", err));
    } else {
      // Crear nueva tarea
      axios
        .post("http://127.0.0.1:8000/api/v1/tasks", datos)
        .then(fetchTareas)
        .catch((err) => console.error("Error al crear tarea", err));
    }
  };

  // Render del componente
  return (
    <>
      {/* Encabezado con título y botón "Agregar" */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Lista de Tareas</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm flex items-center gap-2"
          onClick={() => {
            setTareaSeleccionada(null); // Limpia la selección para nueva tarea
            setMostrarModal(true); // Abre el modal
          }}
        >
          <FiPlus className="text-lg" /> Agregar
        </button>
      </div>

      {/* Sección principal: tarjetas + tabla */}
      <div className="flex p-6 bg-gray-100">
        {/* Columna de tarjetas (scrollable) */}
        <div className="flex flex-col max-h-[80vh] max-w-[50vh] overflow-y-scroll">
          {tareas.map((tarea) => (
            <Card
              key={tarea.id}
              title={tarea.title}
              description={tarea.description}
              estado={tarea.status} // status viene del backend
            />
          ))}
        </div>

        {/* Tabla editable con acciones */}
        <div className="flex-1">
          <Table
            tareas={tareas}
            onEditar={handleEditar}
            onEliminar={handleEliminar}
          />
        </div>
      </div>

      {/* Modal para editar/crear tarea */}
      <ModalEditar
        tarea={tareaSeleccionada}
        visible={mostrarModal}
        onClose={() => setMostrarModal(false)} // Cierra modal
        onGuardar={handleGuardar} // Guarda cambios
      />
    </>
  );
};

export default Tareas;
