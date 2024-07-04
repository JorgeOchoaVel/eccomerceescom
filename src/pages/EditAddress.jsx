import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditAddress = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [errorInput, setErrorInput] = useState(false);

  useEffect(() => {
    const fetchAddress = async () => {
      const accessToken = 'eyJraWQiOiJUYkYxUGM4ZTN5VWdcL2VjZUxXQ1NBd2lqbjV1YURtNDd6Zlh6YjNmVVl6UT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJjNGE4ZDQxOC1lMGIxLTcwNjgtM2E5Yy04OWZkNzA4OTJiODkiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV90Y2x1VklPdHYiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiI0ZGhlZGRvbDdqMWgxMWlzcGRybmV0aGQzZyIsImV2ZW50X2lkIjoiYTAwMTBlYTktOWI2Ny00N2NkLWI5NGQtYWU0OTQ4MTE2ZjQ3IiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiBvcGVuaWQgZW1haWwiLCJhdXRoX3RpbWUiOjE3MTk5OTM0MjUsImV4cCI6MTcyMDA3OTgyNSwiaWF0IjoxNzE5OTkzNDI1LCJqdGkiOiJmZTdjZjVlMy00Y2ZkLTQ4MjUtYTA1My02ODMxZmU3MmE2NWMiLCJ1c2VybmFtZSI6ImM0YThkNDE4LWUwYjEtNzA2OC0zYTljLTg5ZmQ3MDg5MmI4OSJ9.jdwz5FEMEOo2OrOSQro200w7HWqJQZQNcpxuOGrFVyWh4mAzQBuO-AXn2BaJ6c7qHBHC1K6NwLy5_abQgp16HWPC1IvTJrOEaKTRAR5LURNzMd0bT8_dujKOfQmHHraXoNZKMcPdBrfQ2rTRAOijb7aaS0bZMn8CdvL9AwlbxTSu1Np_S4-uMkpFnXOzTB-9QmLU878GviMLWNHQVS_eB214Jd1TPlkDzFB6OPsRwOqzx5uGJerGrEhR107N2IGhPJeZzJ_9fivRRyq7I-Ddi1lH-N4n_r-HmtlrcMl4rXDKhnBSEk6XLNDcgehBWd-iCvj4dPhLciJJh2D8fjixjw'; // Reemplaza con tu token de acceso real
      try {
        const response = await fetch(`/api/dev/ecommerceEscom/address/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch address");
        }

        const address = await response.json();
        setTitle(address.addTitle);
        setName(address.addName);
        setAddress(address.addAddress);
        setCity(address.addCity);
        setState(address.addState);
        setPostalCode(address.addPostalCode);
        setPhone(address.addPhone);
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };

    fetchAddress();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([title, name, address, city, state, postalCode, phone].includes("")) {
      setErrorInput(true);

      setTimeout(() => {
        setErrorInput(false);
      }, 5000);
      return;
    }

    const updatedAddress = {
      addTitle: title,
      addName: name,
      addAddress: address,
      addCity: city,
      addState: state,
      addPostalCode: postalCode,
      addPhone: phone,
    };

    const accessToken = 'eyJraWQiOiJUYkYxUGM4ZTN5VWdcL2VjZUxXQ1NBd2lqbjV1YURtNDd6Zlh6YjNmVVl6UT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJjNGE4ZDQxOC1lMGIxLTcwNjgtM2E5Yy04OWZkNzA4OTJiODkiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV90Y2x1VklPdHYiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiI0ZGhlZGRvbDdqMWgxMWlzcGRybmV0aGQzZyIsImV2ZW50X2lkIjoiYTAwMTBlYTktOWI2Ny00N2NkLWI5NGQtYWU0OTQ4MTE2ZjQ3IiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiBvcGVuaWQgZW1haWwiLCJhdXRoX3RpbWUiOjE3MTk5OTM0MjUsImV4cCI6MTcyMDA3OTgyNSwiaWF0IjoxNzE5OTkzNDI1LCJqdGkiOiJmZTdjZjVlMy00Y2ZkLTQ4MjUtYTA1My02ODMxZmU3MmE2NWMiLCJ1c2VybmFtZSI6ImM0YThkNDE4LWUwYjEtNzA2OC0zYTljLTg5ZmQ3MDg5MmI4OSJ9.jdwz5FEMEOo2OrOSQro200w7HWqJQZQNcpxuOGrFVyWh4mAzQBuO-AXn2BaJ6c7qHBHC1K6NwLy5_abQgp16HWPC1IvTJrOEaKTRAR5LURNzMd0bT8_dujKOfQmHHraXoNZKMcPdBrfQ2rTRAOijb7aaS0bZMn8CdvL9AwlbxTSu1Np_S4-uMkpFnXOzTB-9QmLU878GviMLWNHQVS_eB214Jd1TPlkDzFB6OPsRwOqzx5uGJerGrEhR107N2IGhPJeZzJ_9fivRRyq7I-Ddi1lH-N4n_r-HmtlrcMl4rXDKhnBSEk6XLNDcgehBWd-iCvj4dPhLciJJh2D8fjixjw'; // Reemplaza con tu token de acceso real

    try {
      const response = await fetch(`/api/dev/ecommerceEscom/address/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify(updatedAddress),
      });

      if (!response.ok) {
        throw new Error("Failed to update address");
      }

      alert("Dirección actualizada con éxito");
      navigate("/admin/addresses"); // Redirigir a la lista de direcciones
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  const handleCancel = () => {
    navigate("/admin/addresses");
  };

  return (
    <div className="mt-[140px] sm:mt-20 max-w-screen-md mx-auto p-5">
      {errorInput && (
        <div className="bg-red-500 text-white font-medium text-center py-2 rounded mb-5">
          <strong>¡Error!</strong>
          <br />
          Todos los campos son obligatorios.
        </div>
      )}
      <div className="text-center mb-10">
        <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
          Editar <span className="text-indigo-600">Dirección</span>
        </h3>
      </div>

      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Título:
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="Ingrese el título de la dirección"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Nombre:
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Ingrese el nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Dirección:
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Ingrese la dirección"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Ciudad:
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Ingrese la ciudad"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Estado:
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Ingrese el estado"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Código Postal:
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Ingrese el código postal"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Teléfono:
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Ingrese el teléfono"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-center w-full px-3">
          <button
            className="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
            type="submit"
          >
            Actualizar Dirección
          </button>
          <button
            type="button"
            className="shadow bg-gray-600 hover:bg-gray-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded ml-4"
            onClick={handleCancel}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAddress;
