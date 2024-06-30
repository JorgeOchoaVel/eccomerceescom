import { Link } from "react-router-dom";
// imagenes
import adminImage from "../img/Imagen4.png";

export const AdminHero = () => {
  return (
    <>
      <section className="h-[400px] bg-hero bg-no-repeat bg-center bg-cover py-12 mt-20">
        <div className="container mx-auto flex justify-around h-full">
          {/* texto */}
          <div className="flex flex-col justify-center">
            <div className="font-semibold flex items-center uppercase">
              <div className="w-10 h-[2px] bg-red-500 mr-3"></div>Bienvenido administrador
            </div>
            <h1 className="w-full text-[40px] leading-[1.1] font-light mb-4 uppercase">
              Gestiona tus <span className="font-semibold">Productos y Usuarios</span>
            </h1>
            <Link
              to={"/admin/products"}
              className="self-start uppercase font-semibold border-b-2 border-primary"
            >
              Ver Productos
            </Link>
          </div>
          {/* imagen */}
          <div className="hidden lg:block lg:w-1/4 lg:mr-20">
            <img className="lg:w-full" src={adminImage} alt="Imagen de administrador" />
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminHero;
