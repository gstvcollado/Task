import { useEffect } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";

const DownloadReport = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPDF = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/report/pdf",
          {
            responseType: "blob",
          }
        );

        const blob = new Blob([response.data], { type: "application/pdf" });
        saveAs(blob, "reporte_tareas.pdf");

        setTimeout(() => navigate("/"), 1000);
      } catch (error) {
        console.error("Error al descargar el PDF:", error);
      }
    };

    fetchPDF();
  }, [navigate]);

  return (
    <div className="p-6 text-center">
      <p className="text-gray-600">Generando y descargando el reporte...</p>
    </div>
  );
};

export default DownloadReport;
