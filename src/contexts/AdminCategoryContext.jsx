import { createContext, useState, useEffect } from "react";

export const AdminCategoryContext = createContext();

const AdminCategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = 'eyJraWQiOiJUYkYxUGM4ZTN5VWdcL2VjZUxXQ1NBd2lqbjV1YURtNDd6Zlh6YjNmVVl6UT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJkNGU4NzRmOC0wMDcxLTcwNGYtOGE1MS1mOTUyZjdiYjJlMDYiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV90Y2x1VklPdHYiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiI0ZGhlZGRvbDdqMWgxMWlzcGRybmV0aGQzZyIsImV2ZW50X2lkIjoiMTc5ODdiZGEtMmRkMy00MWJmLTliZDAtNzVjY2MzNTVjODA0IiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiBvcGVuaWQgZW1haWwiLCJhdXRoX3RpbWUiOjE3MTk5NTY1MzMsImV4cCI6MTcyMDA0MjkzMywiaWF0IjoxNzE5OTU2NTMzLCJqdGkiOiJkYzQwMDc2Yy05NWY0LTQ5MTItYWYyNC03MmFmZjc3YWQ4NDIiLCJ1c2VybmFtZSI6ImQ0ZTg3NGY4LTAwNzEtNzA0Zi04YTUxLWY5NTJmN2JiMmUwNiJ9.wvbV-RwtzPaFlFrUUOHbcm8QJI0sPXMOeAgTF2zKltj_Am-IhhvWJ0r7z5RE0K1n2YBDo0ILkZXaCbg32zf1ko5TzB3jK5AYwzxujVCwbMqd_Js_buQ266lLACKdxJKL2Rw8kGMb3sR6vy49AZHyuNW8H8HDr2z33URB--VP2VmEFY8qiU5ilWAQUlS0KQ-dXqyN25QpLPloIlX0sbRxaKSRIYpywaJaegMEjIo4IR3PHDhyKvA3_MFdAxDfvl0zUsKX0AbXbW5mtwDxVP6cj7McakxqHFD_mLDJN6futofFOSBynfdOwMqy_KN5GibWpyYepghNooRJoRSLOPfOhw';

  useEffect(() => {
    const fetchCategories = async () => {
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
