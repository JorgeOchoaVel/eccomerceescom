import { Link } from "react-router-dom";
import { BsPencil, BsTrash } from "react-icons/bs";
import { useContext } from "react";
import { AdminCategoryContext } from "../contexts/AdminCategoryContext";

export const AdminCategory = ({ category }) => {
  const { id, name, path } = category;
  const { deleteCategory } = useContext(AdminCategoryContext);

  const handleDelete = () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta categoría?")) {
      deleteCategory(id);
    }
  };

  return (
    <div>
      <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition">
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[200px] mx-auto flex justify-center items-center">
            <img
              className="max-h-[160px] group-hover:scale-110 transition duration-300"
              src={path}
              alt={name}
            />
          </div>
          <div className="absolute top-6 -right-10 group-hover:right-1 p-2 flex flex-col items-center justify-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <button onClick={handleDelete}>
              <div className="flex justify-center items-center text-white w-12 h-12 bg-red-500">
                <BsTrash className="text-3xl" />
              </div>
            </button>
            <Link
              to={`/admin/edit-category/${id}`}
              className="w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl"
            >
              <BsPencil />
            </Link>
          </div>
        </div>
      </div>
      <div>
        <div className="text-sm capitalize text-gray-500 mb-1">{name}</div>
      </div>
    </div>
  );
};

export default AdminCategory;
