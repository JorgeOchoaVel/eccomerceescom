import { useContext, useState } from "react";
import { Link } from "react-router-dom";
// context
import { AdminProductContext } from "../contexts/AdminProductContext";
// componentes
import { AdminProduct } from "../components";

export const AdminProducts = () => {
  const { products, categories, loading, error } = useContext(AdminProductContext);
  const [selectedCategory, setSelectedCategory] = useState(""); // Estado para la categoría seleccionada

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === Number(selectedCategory))
    : products;

  return (
    <section className="mt-[120px] sm:mt-10 max-w-[1100px] mx-auto py-16">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
            Administrar <span className="text-indigo-600">Productos</span>
          </h3>
        </div>
        <div className="text-center mb-10">
          <Link to="/admin/add-product">
            <button className="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded">
              Agregar Nuevo Producto
            </button>
          </Link>
        </div>
        <div className="text-center mb-10">
          <select
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            {categories.map((category) => (
              <option key={category.categID} value={category.categID}>
                {category.categName}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6 max-w-sm mx-auto md:max-w-none md:mx-0">
          {filteredProducts.map((product) => (
            <AdminProduct product={product} key={product.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminProducts;
