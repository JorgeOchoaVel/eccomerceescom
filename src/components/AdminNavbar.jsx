import { Link, useLocation } from "react-router-dom";

export const AdminNavbar = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <nav className="flex items-center gap-3 font-medium text-primary">
      <Link
        className={`${
          pathname === "/admin" && "text-red-600"
        } hover:text-red-600 transition`}
        to={"/AdminDashboard"}
      >
        Inicio
      </Link>
      <Link
        className={`${
          pathname === "/admin/products" && "text-red-600"
        } hover:text-red-600 transition`}
        to={"/products"}
      >
        Productos
      </Link>
      <Link
        className={`${
          pathname === "/admin/users" && "text-red-600"
        } hover:text-red-600 transition`}
        to={"/admin/users"} //AQUI VAN LOS USUARIOS
      >
        Usuarios
      </Link>
      <Link
        className={`${
          pathname === "/admin/orders" && "text-red-600"
        } hover:text-red-600 transition`}
        to={"/admin/orders"} //AQUI VAN LAS ORDENES 
      >
        Órdenes
      </Link>
      <Link
        className={`${pathname === "/admin/add-product" && "text-red-600"} hover:text-red-600 transition`}
        to={"/AddProduct"}
      >
        Agregar Producto
      </Link>
    </nav>
  );
};

export default AdminNavbar;
