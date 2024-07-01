import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [categId, setCategId] = useState("");
    const [stock, setStock] = useState("");
    const [image, setImage] = useState(null); // Nuevo estado para la imagen
    const [errorInput, setErrorInput] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([title, price, description, categId, stock].includes("") || !image) {
            setErrorInput(true);

            setTimeout(() => {
                setErrorInput(false);
            }, 5000);
            return;
        }

        const accessToken = 'eyJraWQiOiJUYkYxUGM4ZTN5VWdcL2VjZUxXQ1NBd2lqbjV1YURtNDd6Zlh6YjNmVVl6UT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJkNGU4NzRmOC0wMDcxLTcwNGYtOGE1MS1mOTUyZjdiYjJlMDYiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV90Y2x1VklPdHYiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiI0ZGhlZGRvbDdqMWgxMWlzcGRybmV0aGQzZyIsImV2ZW50X2lkIjoiYmU3OGViM2MtMTE3MS00ZjcyLWIxNGEtMDBlNTBiNmVhZTg3IiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiBvcGVuaWQgZW1haWwiLCJhdXRoX3RpbWUiOjE3MTk3OTIxMzEsImV4cCI6MTcxOTg3ODUzMSwiaWF0IjoxNzE5NzkyMTMxLCJqdGkiOiJiZmY2Njg3Yi0yYjUxLTQ4NWYtYTNkNC05YTVkZDNhNjE4MzYiLCJ1c2VybmFtZSI6ImQ0ZTg3NGY4LTAwNzEtNzA0Zi04YTUxLWY5NTJmN2JiMmUwNiJ9.vrnq4x83ecsWEzhczO-O74EJpr4mwFUw04ACx50ylNLS5mZ3Y5AZ1Mi1vt6Jzh2mq3OLl7yfY4ltgfn3LrSFNH4NYQQQDvNq5Ma9_tgap36SVJxlryhIzGxFU9xTZhpUlF5YXrmOtNX3KkvGhBr6SidBmkN1VpssJA5Le1ozz4Wt2c2I4lPj3ZmUc8l6-PXVjojWyq8rYkaPgatNAOpI5rZMYVKmq32m03wefRq2gFXn4y7C8eGnBl9_KNUzqMUiMxWAV5rQJD0XAd47NwMbC8XNfLpmu0qkJZtemHMLJhVC0uEfsTS46USLGtcDQso44i0N36J7jgbWAlmcLGYFAQ'; // Reemplaza con tu token de acceso real

        // Subir imagen a AWS S3
        const imageName = `Producto${new Date().getTime()}.jpg`; // Generar un nombre único para la imagen
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

            const newProduct = {
                prodTitle: title,
                prodPrice: Number(price),
                prodDescription: description,
                prodCategId: Number(categId),
                prodStock: Number(stock),
                prodPath: s3Url,
            };

            const response = await fetch("/api/dev/ecommerceEscom/product", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                },
                body: JSON.stringify(newProduct),
            });

            if (!response.ok) {
                throw new Error("Failed to add product");
            }

            // Clear form fields
            setTitle("");
            setPrice("");
            setDescription("");
            setCategId("");
            setStock("");
            setImage(null);
            alert("Product added successfully");

            // Redirigir a la lista de productos
            navigate("/admin/products");
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    const handleCancel = () => {
        navigate("/admin/products");
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
                    Agregar <span className="text-indigo-600">Producto</span>
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
                            placeholder="Ingrese el título del producto"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Precio:
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            type="number"
                            placeholder="Ingrese el precio"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Categoría ID:
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            type="number"
                            placeholder="Ingrese la categoría ID"
                            value={categId}
                            onChange={(e) => setCategId(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Descripción:
                        </label>
                        <textarea
                            rows="5"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            placeholder="Ingrese la descripción del producto"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Stock:
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            type="number"
                            placeholder="Ingrese el stock"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Imagen del Producto:
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
                        Agregar Producto
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

export default AddProduct;
