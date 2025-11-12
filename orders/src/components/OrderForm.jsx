import React, { useState } from "react";
import { motion } from "framer-motion";
import "./OrderForm.css";

// Recibir 'menu' como prop
export default function OrderForm({ onAddOrder, menu = [] }) { 
  const [name, setName] = useState(""); 
  const [size, setSize] = useState("");
  // Opcional: agregar cantidad
  const [quantity, setQuantity] = useState(1); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !size || quantity <= 0) return alert("Completa todos los campos y revisa la cantidad.");
    
    // Aquí puedes ajustar la data si necesitas enviar más campos a tu API de Pedidos
    onAddOrder({ name, size, quantity }); 
    setName("");
    setSize("");
    setQuantity(1);
  };

  // Deshabilitar si el menú no está cargado (solo si el array está vacío y no hay errores)
  const isMenuLoaded = menu.length > 0;

  return (
    <motion.form
      className="order-form"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <label>Bebida:</label>
      {/* Usamos el select poblado con el menú */}
      <select 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        disabled={!isMenuLoaded}
      >
        <option value="">
          {isMenuLoaded ? "Seleccionar bebida..." : "Cargando menú..."}
        </option>
        {menu.map((item) => (
          <option key={item.name} value={item.name}>
            {item.name} - ${item.price}
          </option>
        ))}
      </select>
      
      {/* Opcional: Campo para la cantidad */}
      <label>Cantidad:</label>
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
        disabled={!isMenuLoaded}
      />

      <label>Tamaño:</label>
      <select value={size} onChange={(e) => setSize(e.target.value)} disabled={!isMenuLoaded}>
        <option value="">Seleccionar...</option>
        <option value="small">Pequeño</option>
        <option value="medium">Mediano</option>
        <option value="large">Grande</option>
      </select>

      <motion.button 
        whileTap={{ scale: 0.95 }} 
        type="submit" 
        disabled={!isMenuLoaded || !name || !size || quantity <= 0}
      >
        Hacer Pedido
      </motion.button>
    </motion.form>
  );
}