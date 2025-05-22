<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TaskManager;
use Barryvdh\DomPDF\Facade\Pdf;

class ReportController extends Controller
{
    /**
     * Genera un reporte PDF con todas las tareas.
     */
    public function generatePDF()
    {
        $tasks = TaskManager::all();
        $pdf = Pdf::loadView('pdf.report', compact('tasks'));

        return $pdf->download('reporte_tareas.pdf');
    }
}
