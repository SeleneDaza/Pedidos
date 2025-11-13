import { useState } from "react";
import { createOrder } from "../services/api";

export default function TestConnection() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTestConnection = async () => {
    setLoading(true);
    setStatus("Conectando con el backend... ⏳");

    try {
      // Datos de prueba: Valeria pide un Capuccino
      const testOrder = {
        customerName: "Valeria",
        items: ["Capuccino"],
      };

      const result = await createOrder(testOrder);

      setStatus(
        `✅ Conexión exitosa: ${result.message}\nTotal calculado: $${result.total}`
      );
    } catch (error) {
      setStatus(`❌ Error al conectar con el backend: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "2rem",
        background: "#f7f7f7",
        borderRadius: "12px",
        maxWidth: "500px",
        margin: "3rem auto",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#4a4a4a" }}>
        🔌 Prueba de conexión React ↔ Spring Boot
      </h2>

      <p style={{ textAlign: "center", color: "#666" }}>
        Pulsa el botón para verificar la comunicación con el backend
      </p>

      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <button
          onClick={handleTestConnection}
          disabled={loading}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px 20px",
            fontSize: "16px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          {loading ? "Conectando..." : "Probar conexión"}
        </button>
      </div>

      <pre
        style={{
          backgroundColor: "#fff",
          padding: "1rem",
          borderRadius: "8px",
          marginTop: "1.5rem",
          fontSize: "15px",
          color: "#333",
          whiteSpace: "pre-wrap",
          border: "1px solid #ddd",
        }}
      >
        {status}
      </pre>
    </div>
  );
}
