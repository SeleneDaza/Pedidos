// src/services/api.js (API de Pedidos - Java/Spring Boot)

const API_BASE_URL = "http://localhost:8080"; // <--- VERIFICA ESTE PUERTO
const ORDERS_ENDPOINT = `${API_BASE_URL}/orders`;

/**
 * Crea un nuevo pedido llamando a POST /orders.
 */
export async function createOrder(newOrder) {
  const response = await fetch(ORDERS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newOrder),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: "Error desconocido en el servidor de pedidos." }));
    throw new Error(errorData.message || `Error ${response.status}: Fallo al procesar el pedido.`);
  }

  return response.json();
}

/**
 * Obtiene la lista de todos los pedidos llamando a GET /orders.
 */
export async function getOrders() {
  const response = await fetch(ORDERS_ENDPOINT);

  if (!response.ok) {
    throw new Error(`Error ${response.status}: Fallo al obtener el historial de pedidos.`);
  }

  // Si la API devuelve un array vacío, lo manejamos.
  const data = await response.json();
  return Array.isArray(data) ? data : [];
}
//USAR PARA EL BACK
//export async function createOrder(order) {
//   const res = await fetch("http://localhost:8080/orders", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(order),
//   });
//   if (!res.ok) throw new Error("Error al crear pedido");
//   return await res.json();
// }
