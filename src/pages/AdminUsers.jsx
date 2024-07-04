import { useContext } from "react";
import { Link } from "react-router-dom";
import { AdminUserContext } from "../contexts/AdminUserContext";

export const AdminUsers = () => {
  const { users, loading, error } = useContext(AdminUserContext);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <section className="mt-[120px] sm:mt-10 max-w-[1100px] mx-auto py-16">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
            Administrar <span className="text-indigo-600">Usuarios</span>
          </h3>
        </div>
        <div className="text-center mb-10">
          <Link to="/admin/my-user">
            <button className="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded">
              Mi Usuario
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 max-w-sm mx-auto md:max-w-none md:mx-0">
          {users.map((user) => (
            <div key={user.userUUID} className="border border-gray-200 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Email: {user.userEmail}</h4>
              <p>Nombre: {user.userFirstName} {user.userLastName}</p>
              <p>Tipo usuario: {user.userStatus === 0 ? "Administrador" : "Cliente"}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminUsers;
