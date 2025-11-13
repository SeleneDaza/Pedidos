import React from "react";
import OrdersPage from "./pages/OrdersPage.jsx";
import TestConnection from "./components/TestConnection.jsx";
import "./App.css";

export default function App() {
  return (
    <div className="app-container">
      {/*componente temporal para probar conexión */}
      {/*<TestConnection />*/}

      <OrdersPage />
    </div>
  );
}
