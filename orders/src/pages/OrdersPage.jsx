import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import OrderForm from "../components/OrderForm.jsx";
import OrdersList from "../components/OrdersList.jsx";
import Message from "../components/Message.jsx";
import Loader from "../components/Loader.jsx";
// Importaciones de servicios
import { createOrder, getOrders } from "../services/api.js"; // API de Pedidos (Java)
import { getMenu } from "../services/menuApi.js";     // API de Bebidas (Python)

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [menu, setMenu] = useState([]); // Nuevo estado para el menú
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Carga inicial de datos
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setMessage("");

    // --- 1. Cargar Historial de Pedidos (API Java) ---
    try {
      const fetchedOrders = await getOrders();
      setOrders(fetchedOrders);
    } catch (error) {
      console.error("Fallo al cargar pedidos:", error);
      setMessage((prev) => prev + ` ❌ Error: Historial no disponible.`);
    }

    // --- 2. Cargar Menú de Bebidas (API Python) ---
    try {
      const fetchedMenu = await getMenu();
      setMenu(fetchedMenu); 
    } catch (error) {
      console.error("Fallo al cargar menú:", error);
      // Muestra una advertencia, pero no bloquea la aplicación
      setMessage((prev) => prev + ` ⚠️ Advertencia: Menú no disponible.`);
      setMenu([]); // Asegura que el menú sea un array vacío
    } 

    setLoading(false);
  };


  const addOrder = async (newOrder) => {
    setLoading(true);
    setMessage(""); // Limpiar mensaje anterior
    try {
      // Llama a la API de Pedidos (Java)
      const createdOrder = await createOrder(newOrder);

      // Si es exitoso, actualiza el estado local
      setOrders((prevOrders) => [...prevOrders, createdOrder]);

      // Muestra el mensaje de éxito
      setMessage("✅ Pedido realizado con éxito ☕");

    } catch (error) {
      console.error("Error al añadir pedido:", error);
      // Muestra el mensaje de error de la API (ej: bebida no disponible)
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
      // Opcional: limpiar el mensaje después de un tiempo
      setTimeout(() => setMessage(""), 8000);
    }
  };

  return (
    <motion.div
      className="orders-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="title">☕ VirtualCoffee Orders</h1>
      {message && <Message text={message} />} 
      
      {/* Pasar el menú disponible al formulario */}
      <OrderForm onAddOrder={addOrder} menu={menu} disabled={loading} />
      
      {loading && <Loader />}
      
      {/* Solo mostramos la lista si no hay un loader visible */}
      {!loading && <OrdersList orders={orders} />}

    </motion.div>
  );
}