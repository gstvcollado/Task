import React from "react";
import Dashboard from "../components/Dashboard";

function Inicio() {
  return (
    <div className=" bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h1>
      <Dashboard />
    </div>
  );
}

export default Inicio;
