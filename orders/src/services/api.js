// src/services/api.js (API de Pedidos - Java/Spring Boot)

// ✅ Puerto del backend correcto
const API_BASE_URL = "http://localhost:8081";
const PEDIDOS_ENDPOINT = `${API_BASE_URL}/pedidos`;

/**
 * Crea un nuevo pedido (POST /pedidos)
 */
export async function createOrder(order) {
  const response = await fetch(PEDIDOS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: "Error desconocido en el servidor de pedidos." }));
    throw new Error(errorData.message || `Error ${response.status}: Fallo al crear el pedido.`);
  }

  return await response.json();
}

/**
 * Obtiene la lista de todos los pedidos (GET /pedidos)
 */
export async function getOrders() {
  const response = await fetch(PEDIDOS_ENDPOINT);

  if (!response.ok) {
    throw new Error(`Error ${response.status}: Fallo al obtener el historial de pedidos.`);
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
}
