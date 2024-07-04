import { useContext } from "react";
// context
import { AdminAddressContext } from "../contexts/AdminAddressContext";

export const AdminAddresses = () => {
  const { addresses, loading, error } = useContext(AdminAddressContext);

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
            Administrar <span className="text-indigo-600">Direcciones</span>
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 max-w-sm mx-auto md:max-w-none md:mx-0">
          {addresses.map((address) => (
            <div key={address.addTitle} className="border border-gray-200 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">{address.addTitle}</h4>
              <p>Nombre: {address.addName}</p>
              <p>Dirección: {address.addAddress}</p>
              <p>Ciudad: {address.addCity}</p>
              <p>Estado: {address.addState}</p>
              <p>Código Postal: {address.addPostalCode}</p>
              <p>Teléfono: {address.addPhone}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminAddresses;
