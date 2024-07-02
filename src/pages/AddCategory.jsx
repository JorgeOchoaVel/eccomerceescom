import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [errorInput, setErrorInput] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([name].includes("") || !image) {
      setErrorInput(true);

      setTimeout(() => {
        setErrorInput(false);
      }, 5000);
      return;
    }

    const accessToken = 'eyJraWQiOiJUYkYxUGM4ZTN5VWdcL2VjZUxXQ1NBd2lqbjV1YURtNDd6Zlh6YjNmVVl6UT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJkNGU4NzRmOC0wMDcxLTcwNGYtOGE1MS1mOTUyZjdiYjJlMDYiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV90Y2x1VklPdHYiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiI0ZGhlZGRvbDdqMWgxMWlzcGRybmV0aGQzZyIsImV2ZW50X2lkIjoiYmU3OGViM2MtMTE3MS00ZjcyLWIxNGEtMDBlNTBiNmVhZTg3IiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiBvcGVuaWQgZW1haWwiLCJhdXRoX3RpbWUiOjE3MTk3OTIxMzEsImV4cCI6MTcxOTg3ODUzMSwiaWF0IjoxNzE5NzkyMTMxLCJqdGkiOiJiZmY2Njg3Yi0yYjUxLTQ4NWYtYTNkNC05YTVkZDNhNjE4MzYiLCJ1c2VybmFtZSI6ImQ0ZTg3NGY4LTAwNzEtNzA0Zi04YTUxLWY5NTJmN2JiMmUwNiJ9.vrnq4x83ecsWEzhczO-O74EJpr4mwFUw04ACx50ylNLS5mZ3Y5AZ1Mi1vt6Jzh2mq3OLl7yfY4ltgfn3LrSFNH4NYQQQDvNq5Ma9_tgap36SVJxlryhIzGxFU9xTZhpUlF5YXrmOtNX3KkvGhBr6SidBmkN1VpssJA5Le1ozz4Wt2c2I4lPj3ZmUc8l6-PXVjojWyq8rYkaPgatNAOpI5rZMYVKmq32m03wefRq2gFXn4y7C8eGnBl9_KNUzqMUiMxWAV5rQJD0XAd47NwMbC8XNfLpmu0qkJZtemHMLJhVC0uEfsTS46USLGtcDQso44i0N36J7jgbWAlmcLGYFAQ'; // Reemplaza con tu token de acceso real

    // Subir imagen a AWS S3
    const imageName = `Categoria${new Date().getTime()}.jpg`; // Generar un nombre único para la imagen
    const imageUrl = `/api/dev/ecommerceescom-images/${imageName}`;
    const s3Url = `https://ecommerceescom-images.s3.amazonaws.com/${imageName}`;

    try {
      const imageData = new FormData();
      imageData.append("file", image);

      const imageResponse = await fetch(imageUrl, {
        method: "PUT",
        body: image,
        headers: {
          "Content-Type": image.type,
          "Authorization": `Bearer ${accessToken}`,
        },
      });

      if (!imageResponse.ok) {
        throw new Error("Failed to upload image");
      }

      const newCategory = {
        categName: name,
        categPath: s3Url,
      };

      const response = await fetch("/api/dev/ecommerceEscom/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify(newCategory),
      });

      if (!response.ok) {
        throw new Error("Failed to add category");
      }

      // Clear form fields
      setName("");
      setImage(null);
      alert("Category added successfully");

      // Redirigir a la lista de categorías
      navigate("/admin/categories");
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleCancel = () => {
    navigate("/admin/categories");
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
          Agregar <span className="text-indigo-600">Categoría</span>
        </h3>
      </div>

      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Nombre:
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="Ingrese el nombre de la categoría"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Imagen:
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
        </div>
        <div className="flex justify-center w-full px-3">
          <button
            className="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
            type="submit"
          >
            Agregar Categoría
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

export default AddCategory;
