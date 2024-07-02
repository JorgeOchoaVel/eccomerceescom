import { useContext } from "react";
import { Link } from "react-router-dom";
import { AdminCategoryContext } from "../contexts/AdminCategoryContext";
import { AdminCategory } from "../components";

export const AdminCategories = () => {
  const { categories, loading, error } = useContext(AdminCategoryContext);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!categories || categories.length === 0) {
    return <p>No hay categorías disponibles.</p>;
  }

  return (
    <section className="mt-[120px] sm:mt-10 max-w-[1100px] mx-auto py-16">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
            Administrar <span className="text-indigo-600">Categorías</span>
          </h3>
        </div>
        <div className="text-center mb-10">
          <Link to="/admin/add-category">
            <button className="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded">
              Agregar Nueva Categoría
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6 max-w-sm mx-auto md:max-w-none md:mx-0">
          {categories.map((category) => (
            <AdminCategory category={category} key={category.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminCategories;
