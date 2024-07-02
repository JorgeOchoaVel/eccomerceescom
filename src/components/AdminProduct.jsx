import { Link } from "react-router-dom";
import { BsPencil, BsTrash } from "react-icons/bs";
import { useContext } from "react";
import { AdminProductContext } from "../contexts/AdminProductContext";

export const AdminProduct = ({ product }) => {
  const { id, image, title, price } = product;
  const { deleteProduct } = useContext(AdminProductContext);

  const handleDelete = () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      deleteProduct(id);
    }
  };

  return (
    <div>
      <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition">
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[200px] mx-auto flex justify-center items-center">
            <img
              className="max-h-[160px] group-hover:scale-110 transition duration-300"
              src={image}
              alt={title}
            />
          </div>
          <div className="absolute top-6 -right-10 group-hover:right-1 p-2 flex flex-col items-center justify-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <button onClick={handleDelete}>
              <div className="flex justify-center items-center text-white w-12 h-12 bg-red-500">
                <BsTrash className="text-3xl" />
              </div>
            </button>
            <Link
              to={`/admin/edit-product/${id}`}
              className="w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl"
            >
              <BsPencil />
            </Link>
          </div>
        </div>
      </div>
      <div>
        <Link to={`/admin/product/${id}`}>
          <h2 className="font-semibold mb-1">{title}</h2>
        </Link>
        <div className="font-semibold">$ {price}</div>
      </div>
    </div>
  );
};

export default AdminProduct;
