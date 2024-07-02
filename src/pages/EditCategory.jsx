import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [path, setPath] = useState(""); // Declarar el estado `path`
  const [image, setImage] = useState(null); // Nuevo estado para la imagen
  const [errorInput, setErrorInput] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      const accessToken = 'your_access_token_here'; // Reemplaza con tu token de acceso real
      try {
        const response = await fetch(`/api/dev/ecommerceEscom/category/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch category");
        }

        const category = await response.json();
        console.log("Fetched category:", category); // Verifica los datos recibidos

        setName(category.categName || "");
        setPath(category.categPath || ""); // Asegurarse de que nunca sea undefined
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    fetchCategory();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name === "") {
      setErrorInput(true);

      setTimeout(() => {
        setErrorInput(false);
      }, 5000);
      return;
    }

    let newPath = path;

    if (image) {
      // Subir imagen a AWS S3
      const accessToken = 'your_access_token_here'; // Reemplaza con tu token de acceso real
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

        newPath = s3Url;
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    const updatedCategory = {
      categName: name,
      categPath: newPath,
    };

    const accessToken = 'your_access_token_here'; // Reemplaza con tu token de acceso real

    try {
      const response = await fetch(`/api/dev/ecommerceEscom/category/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify(updatedCategory),
      });

      if (!response.ok) {
        throw new Error("Failed to update category");
      }

      alert("Category updated successfully");
      navigate("/admin/categories"); // Redirigir a la lista de categorías
    } catch (error) {
      console.error("Error updating category:", error);
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
          Editar <span className="text-indigo-600">Categoría</span>
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
          <div className="w-full px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Nombre:
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="Ingrese el nombre de la categoría"
              value={id}
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
            Actualizar Categoría
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

export default EditCategory;
