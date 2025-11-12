// src/services/menuApi.js (API de Bebidas - Python/FastAPI)

const MENU_API_BASE_URL = "http://localhost:5000"; // <--- VERIFICA ESTE PUERTO
const MENU_ENDPOINT = `${MENU_API_BASE_URL}/menu`;

/**
 * Obtiene el menú de bebidas de la API de Bebidas (Python).
 */
export async function getMenu() {
  const response = await fetch(MENU_ENDPOINT);

  if (!response.ok) {
    throw new Error(`Error ${response.status}: Fallo al obtener el menú de bebidas.`);
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
}