import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyUser = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorInput, setErrorInput] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const accessToken = 'eyJraWQiOiJUYkYxUGM4ZTN5VWdcL2VjZUxXQ1NBd2lqbjV1YURtNDd6Zlh6YjNmVVl6UT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJkNGU4NzRmOC0wMDcxLTcwNGYtOGE1MS1mOTUyZjdiYjJlMDYiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV90Y2x1VklPdHYiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiI0ZGhlZGRvbDdqMWgxMWlzcGRybmV0aGQzZyIsImV2ZW50X2lkIjoiMTc5ODdiZGEtMmRkMy00MWJmLTliZDAtNzVjY2MzNTVjODA0IiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiBvcGVuaWQgZW1haWwiLCJhdXRoX3RpbWUiOjE3MTk5NTY1MzMsImV4cCI6MTcyMDA0MjkzMywiaWF0IjoxNzE5OTU2NTMzLCJqdGkiOiJkYzQwMDc2Yy05NWY0LTQ5MTItYWYyNC03MmFmZjc3YWQ4NDIiLCJ1c2VybmFtZSI6ImQ0ZTg3NGY4LTAwNzEtNzA0Zi04YTUxLWY5NTJmN2JiMmUwNiJ9.wvbV-RwtzPaFlFrUUOHbcm8QJI0sPXMOeAgTF2zKltj_Am-IhhvWJ0r7z5RE0K1n2YBDo0ILkZXaCbg32zf1ko5TzB3jK5AYwzxujVCwbMqd_Js_buQ266lLACKdxJKL2Rw8kGMb3sR6vy49AZHyuNW8H8HDr2z33URB--VP2VmEFY8qiU5ilWAQUlS0KQ-dXqyN25QpLPloIlX0sbRxaKSRIYpywaJaegMEjIo4IR3PHDhyKvA3_MFdAxDfvl0zUsKX0AbXbW5mtwDxVP6cj7McakxqHFD_mLDJN6futofFOSBynfdOwMqy_KN5GibWpyYepghNooRJoRSLOPfOhw'; // Reemplaza con tu token de acceso real
      try {
        const response = await fetch("/api/dev/ecommerceEscom/user/normal", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const user = await response.json();
        setEmail(user.userEmail);
        setFirstName(user.userFirstName);
        setLastName(user.userLastName);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([firstName, lastName].includes("")) {
      setErrorInput(true);

      setTimeout(() => {
        setErrorInput(false);
      }, 5000);
      return;
    }

    const accessToken = 'eyJraWQiOiJUYkYxUGM4ZTN5VWdcL2VjZUxXQ1NBd2lqbjV1YURtNDd6Zlh6YjNmVVl6UT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJkNGU4NzRmOC0wMDcxLTcwNGYtOGE1MS1mOTUyZjdiYjJlMDYiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV90Y2x1VklPdHYiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiI0ZGhlZGRvbDdqMWgxMWlzcGRybmV0aGQzZyIsImV2ZW50X2lkIjoiMTc5ODdiZGEtMmRkMy00MWJmLTliZDAtNzVjY2MzNTVjODA0IiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiBvcGVuaWQgZW1haWwiLCJhdXRoX3RpbWUiOjE3MTk5NTY1MzMsImV4cCI6MTcyMDA0MjkzMywiaWF0IjoxNzE5OTU2NTMzLCJqdGkiOiJkYzQwMDc2Yy05NWY0LTQ5MTItYWYyNC03MmFmZjc3YWQ4NDIiLCJ1c2VybmFtZSI6ImQ0ZTg3NGY4LTAwNzEtNzA0Zi04YTUxLWY5NTJmN2JiMmUwNiJ9.wvbV-RwtzPaFlFrUUOHbcm8QJI0sPXMOeAgTF2zKltj_Am-IhhvWJ0r7z5RE0K1n2YBDo0ILkZXaCbg32zf1ko5TzB3jK5AYwzxujVCwbMqd_Js_buQ266lLACKdxJKL2Rw8kGMb3sR6vy49AZHyuNW8H8HDr2z33URB--VP2VmEFY8qiU5ilWAQUlS0KQ-dXqyN25QpLPloIlX0sbRxaKSRIYpywaJaegMEjIo4IR3PHDhyKvA3_MFdAxDfvl0zUsKX0AbXbW5mtwDxVP6cj7McakxqHFD_mLDJN6futofFOSBynfdOwMqy_KN5GibWpyYepghNooRJoRSLOPfOhw'; // Reemplaza con tu token de acceso real

    const updatedUser = {
      userFirstName: firstName,
      userLastName: lastName,
    };

    try {
      const response = await fetch("/api/dev/ecommerceEscom/user/normal", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        throw new Error("Failed to update user data");
      }

      alert("User data updated successfully");
      navigate("/admin/users"); // Redirigir a la lista de usuarios
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleCancel = () => {
    navigate("/admin/users");
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
          Editar <span className="text-indigo-600">Mi Usuario</span>
        </h3>
      </div>

      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Email:
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="email"
              placeholder="Email del usuario"
              value={email}
              disabled
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Nombre:
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Ingrese el nombre"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Apellido:
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Ingrese el apellido"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-center w-full px-3">
          <button
            className="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
            type="submit"
          >
            Actualizar Usuario
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

export default MyUser;
