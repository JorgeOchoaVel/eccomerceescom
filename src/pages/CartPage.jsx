import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { CartItem } from "../components/CartItem";

export const CartPage = () => {
  const { cart, clearCart, total, itemAmount } = useContext(CartContext);

  return (
    <section className="mt-[120px] sm:mt-10 max-w-[1100px] mx-auto py-16">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
            Carrito de <span className="text-indigo-600">Compras</span>
          </h3>
        </div>
        {itemAmount === 0 ? (
          <div className="text-center">
            <p className="text-xl">Tu carrito está vacío.</p>
            <Link to="/products" className="text-indigo-600 hover:underline">
              Ver Productos
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-y-2 h-[500px] lg:h-[420px] overflow-y-auto overflow-x-hidden border-b mb-10">
              {cart.map((item) => (
                <CartItem item={item} key={item.id} />
              ))}
            </div>
            <div className="flex justify-between items-center mb-10">
              <div className="uppercase font-semibold">
                <span className="mr-2">Total:</span>${" "}
                {parseFloat(total).toFixed(2)}
              </div>
              <button
                onClick={clearCart}
                className="cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl"
              >
                Vaciar Carrito
              </button>
            </div>
            <div className="flex justify-between">
              <Link
                to="/products"
                className="bg-gray-200 flex p-4 justify-center items-center text-primary font-medium"
              >
                Seguir Comprando
              </Link>
              <Link
                to="/checkout"
                className="bg-primary flex p-4 justify-center items-center text-white font-medium"
              >
                Verificar
              </Link>
            </div>
            <div className="flex justify-center mt-10">
              <Link
                to="/payment" // Actualiza este enlace según tu ruta de pago
                className="bg-green-500 flex p-4 justify-center items-center text-white font-medium"
              >
                Proceder al Pago
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CartPage;
