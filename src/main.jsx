import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// contexts
import CartProvider from "./contexts/CartContext";
import ProductProvider from "./contexts/ProductContext";
import SidebarProvider from "./contexts/SidebarContext";
import AdminProductProvider from "./contexts/AdminProductContext";


import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <SidebarProvider>
    <CartProvider>
      <ProductProvider>
      <AdminProductProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
          </AdminProductProvider>
      </ProductProvider>
    </CartProvider>
  </SidebarProvider>
);
