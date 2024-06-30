import { useState } from "react";

const AddProduct = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [categId, setCategId] = useState("");
    const [stock, setStock] = useState("");
    const [path, setPath] = useState("");
    const [errorInput, setErrorInput] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([title, price, description, categId, stock, path].includes("")) {
        setErrorInput(true);

        setTimeout(() => {
            setErrorInput(false);
        }, 5000);
        return;
        }

        const newProduct = {
        prodTitle: title,
        prodPrice: Number(price),
        prodDescription: description,
        prodCategId: Number(categId),
        prodStock: Number(stock),
        prodPath: path,
        };

        const accessToken = 'eyJraWQiOiJUYkYxUGM4ZTN5VWdcL2VjZUxXQ1NBd2lqbjV1YURtNDd6Zlh6YjNmVVl6UT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJjNGE4ZDQxOC1lMGIxLTcwNjgtM2E5Yy04OWZkNzA4OTJiODkiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV90Y2x1VklPdHYiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiI0ZGhlZGRvbDdqMWgxMWlzcGRybmV0aGQzZyIsImV2ZW50X2lkIjoiYTIwNjg1OTEtMTFmZC00ODZjLThhNDUtMmZlNDE0MWNiNGZiIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiBvcGVuaWQgZW1haWwiLCJhdXRoX3RpbWUiOjE3MTk2MzA5MDksImV4cCI6MTcxOTcxNzMwOSwiaWF0IjoxNzE5NjMwOTA5LCJqdGkiOiIzOTVhOWZjMC0yYTQwLTRlYzUtYTNhZi1jYjkwZWEzOGJjMzciLCJ1c2VybmFtZSI6ImM0YThkNDE4LWUwYjEtNzA2OC0zYTljLTg5ZmQ3MDg5MmI4OSJ9.SNrV_Klqvll_zuNaRErgqVAJjKenv5dY3BLS8393tl9LxnB0_7Ly7jPgLKdYYqwZ_6vWsn_aW_-zkf8yE3Jl9eGFhPg3hmk1RZpAzRuqIdA57trrKStXJ7KH3JK3H7r-hAqLljgHX5RJ-ZyluGo8Vt4jKJcTdE2bgUkdkl4xd8cNLGGCh9od71oYlfALN-Bbp-dilQNAF-uS_u0euNaN6GI77e9QAFK4gonmum8CA31xgbe9QzqLMFdgupit9vMn0GpKrKTCOEC4ObyrVaEyDBa219589QY4tPiqhFOFag11hL8E0bBlkT9VXo9koTUbWw4gH5BSWvLSJYGY3e7ZPA'; // Reemplaza 'your_access_token_here' con tu token de acceso real

        try {
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
        setPath("");
        alert("Product added successfully");
        } catch (error) {
        console.error("Error adding product:", error);
        }
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
                Ruta:
                </label>
                <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="Ingrese la ruta"
                value={path}
                onChange={(e) => setPath(e.target.value)}
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
            </div>
        </form>
        </div>
    );
};

export default AddProduct;
