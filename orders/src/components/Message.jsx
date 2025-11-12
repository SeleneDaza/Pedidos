import React from "react";
import { motion } from "framer-motion";

export default function Message({ text }) {
  return (
    <motion.div
      className="message"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        marginBottom: "1rem",
        background: "#d8f3dc",
        padding: "0.8rem",
        borderRadius: "8px",
        textAlign: "center",
        fontWeight: 600,
      }}
    >
      {text}
    </motion.div>
  );
}

