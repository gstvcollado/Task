<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TaskManager;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Muestra la lista de todas las tareas.
     */
    public function index()
    {
        $tasks = TaskManager::all();
        return response()->json($tasks);
    }

    /**
     * Almacena una nueva tarea en la base de datos.
     */
    public function store(Request $request)
    {
        // Validar los datos recibidos
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:pending,in_progress,done' // Cambié la validación
        ]);

        // Crear y guardar nueva tarea
        $task = TaskManager::create([
            'title' => $request->title,
            'description' => $request->description,
            'status' => $request->status
        ]);

        return response()->json([
            'message' => 'Tarea creada correctamente',
            'data' => $task
        ], 201); // Código HTTP 201: creado
    }

    /**
     * Muestra una tarea específica por su ID.
     */
    public function show(string $id)
    {
        // Usamos findOrFail para un manejo más limpio del error
        $task = TaskManager::findOrFail($id);

        return response()->json($task);
    }

    /**
     * Actualiza una tarea existente por su ID.
     */
    public function update(Request $request, string $id)
    {
        // Usamos findOrFail para un manejo más limpio del error
        $task = TaskManager::findOrFail($id);

        // Validar datos antes de actualizar
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:pending,in_progress,done' // Cambié la validación
        ]);

        $task->update([
            'title' => $request->title,
            'description' => $request->description,
            'status' => $request->status
        ]);

        return response()->json([
            'message' => 'Tarea actualizada correctamente',
            'data' => $task
        ]);
    }

    /**
     * Elimina una tarea existente por su ID.
     */
    public function destroy(string $id)
    {
        $task = TaskManager::findOrFail($id);
        $task->delete();

        return response()->json([
            'message' => 'Tarea eliminada correctamente'
        ]);
    }
}