import { useContext } from "react";
import { useParams } from "react-router-dom";
// context
import { CartContext } from "../contexts/CartContext";
import { ProductContext } from "../contexts/ProductContext";

export const ProductDetails = () => {
  // obtener el id del producto por medio de la url
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);

  // Obtener el producto basado en el id
  const product = products.find((item) => item.id === parseInt(id));

  if (!product) {
    return (
      <section className="h-screen flex justify-center items-center">
        Cargando...
      </section>
    );
  }

  // Desestructurar el producto
  const { title, price, description } = product;

  return (
    <section className="pt-32 pb-12 lg:py-32 h-screen flex items-center">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          {/* texto */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">
              {title}
            </h1>
            <div className="text-xl text-red-500 font-medium mb-6">
              $ {price}
            </div>
            <p className="mb-8">{description}</p>
            <button
              onClick={() => addToCart(product, product.id)}
              className="bg-primary py-4 px-8 text-white"
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
