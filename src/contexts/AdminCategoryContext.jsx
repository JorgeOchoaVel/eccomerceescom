import { createContext, useState, useEffect } from "react";

export const AdminCategoryContext = createContext();

const AdminCategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const accessToken = 'eyJraWQiOiJUYkYxUGM4ZTN5VWdcL2VjZUxXQ1NBd2lqbjV1YURtNDd6Zlh6YjNmVVl6UT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJkNGU4NzRmOC0wMDcxLTcwNGYtOGE1MS1mOTUyZjdiYjJlMDYiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV90Y2x1VklPdHYiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiI0ZGhlZGRvbDdqMWgxMWlzcGRybmV0aGQzZyIsImV2ZW50X2lkIjoiYmU3OGViM2MtMTE3MS00ZjcyLWIxNGEtMDBlNTBiNmVhZTg3IiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiBvcGVuaWQgZW1haWwiLCJhdXRoX3RpbWUiOjE3MTk3OTIxMzEsImV4cCI6MTcxOTg3ODUzMSwiaWF0IjoxNzE5NzkyMTMxLCJqdGkiOiJiZmY2Njg3Yi0yYjUxLTQ4NWYtYTNkNC05YTVkZDNhNjE4MzYiLCJ1c2VybmFtZSI6ImQ0ZTg3NGY4LTAwNzEtNzA0Zi04YTUxLWY5NTJmN2JiMmUwNiJ9.vrnq4x83ecsWEzhczO-O74EJpr4mwFUw04ACx50ylNLS5mZ3Y5AZ1Mi1vt6Jzh2mq3OLl7yfY4ltgfn3LrSFNH4NYQQQDvNq5Ma9_tgap36SVJxlryhIzGxFU9xTZhpUlF5YXrmOtNX3KkvGhBr6SidBmkN1VpssJA5Le1ozz4Wt2c2I4lPj3ZmUc8l6-PXVjojWyq8rYkaPgatNAOpI5rZMYVKmq32m03wefRq2gFXn4y7C8eGnBl9_KNUzqMUiMxWAV5rQJD0XAd47NwMbC8XNfLpmu0qkJZtemHMLJhVC0uEfsTS46USLGtcDQso44i0N36J7jgbWAlmcLGYFAQ'; // Reemplaza con tu token de acceso real
      try {
        const response = await fetch("/api/dev/ecommerceEscom/category", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();
        console.log(data); // Añade este log para verificar los datos recibidos
        const categories = data.map(item => ({
          id: item.categID,
          name: item.categName,
          path: item.categPath,
        }));
        setCategories(categories);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const deleteCategory = async (id) => {
    const accessToken = 'eyJraWQiOiJUYkYxUGM4ZTN5VWdcL2VjZUxXQ1NBd2lqbjV1YURtNDd6Zlh6YjNmVVl6UT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJkNGU4NzRmOC0wMDcxLTcwNGYtOGE1MS1mOTUyZjdiYjJlMDYiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV90Y2x1VklPdHYiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiI0ZGhlZGRvbDdqMWgxMWlzcGRybmV0aGQzZyIsImV2ZW50X2lkIjoiYmU3OGViM2MtMTE3MS00ZjcyLWIxNGEtMDBlNTBiNmVhZTg3IiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiBvcGVuaWQgZW1haWwiLCJhdXRoX3RpbWUiOjE3MTk3OTIxMzEsImV4cCI6MTcxOTg3ODUzMSwiaWF0IjoxNzE5NzkyMTMxLCJqdGkiOiJiZmY2Njg3Yi0yYjUxLTQ4NWYtYTNkNC05YTVkZDNhNjE4MzYiLCJ1c2VybmFtZSI6ImQ0ZTg3NGY4LTAwNzEtNzA0Zi04YTUxLWY5NTJmN2JiMmUwNiJ9.vrnq4x83ecsWEzhczO-O74EJpr4mwFUw04ACx50ylNLS5mZ3Y5AZ1Mi1vt6Jzh2mq3OLl7yfY4ltgfn3LrSFNH4NYQQQDvNq5Ma9_tgap36SVJxlryhIzGxFU9xTZhpUlF5YXrmOtNX3KkvGhBr6SidBmkN1VpssJA5Le1ozz4Wt2c2I4lPj3ZmUc8l6-PXVjojWyq8rYkaPgatNAOpI5rZMYVKmq32m03wefRq2gFXn4y7C8eGnBl9_KNUzqMUiMxWAV5rQJD0XAd47NwMbC8XNfLpmu0qkJZtemHMLJhVC0uEfsTS46USLGtcDQso44i0N36J7jgbWAlmcLGYFAQ'; // Reemplaza con tu token de acceso real
    try {
      const response = await fetch(`/api/dev/ecommerceEscom/category/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete category");
      }

      setCategories(prevCategories => prevCategories.filter(category => category.id !== id));
      alert('Categoría eliminada con éxito');
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Error al eliminar la categoría");
    }
  };

  return (
    <AdminCategoryContext.Provider value={{ categories, loading, error, deleteCategory }}>
      {children}
    </AdminCategoryContext.Provider>
  );
};

export default AdminCategoryProvider;
