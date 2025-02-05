import { useContext } from "react";
// context
import { AdminProductContext } from "../contexts/AdminProductContext";
// componentes
import { AdminHero, Product } from "../components";
import { AdminHeader } from "../components/AdminHeader";

export const AdminDashboard = () => {
  const { products } = useContext(AdminProductContext);

  // Filtrando productos para categorías específicas, si es necesario
  const filteredProducts = products.filter(
    (item) =>
      item.category === "electronics" || item.category === "jewelery"
  );

  return (
    <>
      <AdminHeader />
      <AdminHero />
      <section className="py-16">
        <div className="container mx-auto">
          <h1 className="uppercase mb-6 font-bold text-2xl text-primary">
            Productos para Administrar
          </h1>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 max-w-sm mx-auto md:max-w-none md:mx-0">
            {filteredProducts.map((product) => (
              <Product product={product} key={product.id} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
