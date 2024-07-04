import { Link } from "react-router-dom";
import { BsPencil, BsTrash } from "react-icons/bs";
import { useContext } from "react";
import { AdminAddressContext } from "../contexts/AdminAddressContext";

export const AdminAddress = ({ address }) => {
  const { addId, addTitle, addName, addAddress, addCity, addState, addPostalCode, addPhone } = address;
  const { deleteAddress } = useContext(AdminAddressContext);

  const handleDelete = () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta dirección?")) {
      deleteAddress(addId);
    }
  };

  return (
    <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition">
      <div className="w-full h-full p-4">
        <div className="text-lg font-bold mb-2">{addTitle}</div>
        <div className="text-sm mb-1"><strong>Nombre:</strong> {addName}</div>
        <div className="text-sm mb-1"><strong>Dirección:</strong> {addAddress}</div>
        <div className="text-sm mb-1"><strong>Ciudad:</strong> {addCity}</div>
        <div className="text-sm mb-1"><strong>Estado:</strong> {addState}</div>
        <div className="text-sm mb-1"><strong>Código Postal:</strong> {addPostalCode}</div>
        <div className="text-sm mb-1"><strong>Teléfono:</strong> {addPhone}</div>
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <Link
            to={`/admin/edit-address/${addId}`}
            className="w-8 h-8 bg-white flex justify-center items-center text-primary drop-shadow-xl"
          >
            <BsPencil />
          </Link>
          <button onClick={handleDelete}>
            <div className="w-8 h-8 bg-red-500 flex justify-center items-center text-white">
              <BsTrash />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAddress;
