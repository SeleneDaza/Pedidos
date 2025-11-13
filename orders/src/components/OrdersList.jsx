import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./OrderList.css";

export default function OrdersList({ orders }) {
  return (
    <div className="orders-list">
      <h2>Historial de pedidos</h2>
      <AnimatePresence>
        {orders.map((order) => (
          <motion.div
            key={order.id}
            className="order-item"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
          >
            <strong>{order.name}</strong> — {order.size}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
