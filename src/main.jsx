import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// contexts
import CartProvider from "./contexts/CartContext";
import ProductProvider from "./contexts/ProductContext";
import SidebarProvider from "./contexts/SidebarContext";
import AdminProductProvider from "./contexts/AdminProductContext";
import AdminCategoryProvider from "./contexts/AdminCategoryContext";
import AdminUserProvider from "./contexts/AdminUserContext";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <SidebarProvider>
    <CartProvider>
      <ProductProvider>
      <AdminProductProvider>
      <AdminCategoryProvider>
      <AdminUserProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
      </AdminUserProvider>
      </AdminCategoryProvider>
      </AdminProductProvider>
      </ProductProvider>
    </CartProvider>
  </SidebarProvider>
);
