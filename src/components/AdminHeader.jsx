import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// contexts
import { SidebarContext } from "../contexts/SidebarContext";
// componentes
import { AdminNavbar } from "./AdminNavbar";
// logo
import Logo from "../img/logo.svg";

export const AdminHeader = () => {
  const [isActive, setIsActive] = useState(false);

  const { isOpen, setIsOpen } = useContext(SidebarContext);

  // event listener
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
  }, []);

  return (
    <header
      className={`${
        isActive ? "bg-white py-4 shadow-md" : "bg-none py-6"
      } fixed w-full z-10 transition-all`}
    >
      <div className="container mx-auto flex items-center justify-between h-full">
        {/* Logo */}
        <Link to={"/Admin"}>
          <div className="flex items-center gap-4">
            <img className="w-[40px]" src={Logo} alt="Logo" />
            <h2 className="uppercase text-xl font-bold">Panel de administración</h2>
          </div>
        </Link>

        {/* Menu */}
        <div className="flex gap-10">
          <div className="absolute right-0 left-0 bg-white w-full h-full -bottom-[70px] flex justify-center sm:bg-none sm:relative sm:right-0 sm:bottom-0">
            <AdminNavbar />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
