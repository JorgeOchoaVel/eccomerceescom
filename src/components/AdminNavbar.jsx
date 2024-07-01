import { Link, useLocation } from "react-router-dom";

export const AdminNavbar = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <nav className="flex items-center gap-3 font-medium text-primary">
      <Link
        className={`${
          pathname === "/admin/dashboard" && "text-red-600"
        } hover:text-red-600 transition`}
        to={"/admin/dashboard"}
      >
        Inicio
      </Link>
      <Link
        className={`${
          pathname === "/admin/products" && "text-red-600"
        } hover:text-red-600 transition`}
        to={"/admin/products"}
      >
        Productos
      </Link>
      <Link
        className={`${
          pathname === "/admin/users" && "text-red-600"
        } hover:text-red-600 transition`}
        to={"/admin/users"}
      >
        Usuarios
      </Link>
      <Link
        className={`${
          pathname === "/admin/orders" && "text-red-600"
        } hover:text-red-600 transition`}
        to={"/admin/orders"}
      >
        Órdenes
      </Link>
      <Link
        className={`${
          pathname === "/admin/categorias" && "text-red-600"
        } hover:text-red-600 transition`}
        to={"/admin/categorias"}
      >
        Categorias
      </Link>
    </nav>
  );
};

export default AdminNavbar;
