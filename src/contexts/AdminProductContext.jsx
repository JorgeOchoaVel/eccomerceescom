import { createContext, useState, useEffect } from "react";

export const AdminProductContext = createContext();

const AdminProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // Estado para las categorías
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = 'eyJraWQiOiJUYkYxUGM4ZTN5VWdcL2VjZUxXQ1NBd2lqbjV1YURtNDd6Zlh6YjNmVVl6UT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJkNGU4NzRmOC0wMDcxLTcwNGYtOGE1MS1mOTUyZjdiYjJlMDYiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV90Y2x1VklPdHYiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiI0ZGhlZGRvbDdqMWgxMWlzcGRybmV0aGQzZyIsImV2ZW50X2lkIjoiMTc5ODdiZGEtMmRkMy00MWJmLTliZDAtNzVjY2MzNTVjODA0IiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiBvcGVuaWQgZW1haWwiLCJhdXRoX3RpbWUiOjE3MTk5NTY1MzMsImV4cCI6MTcyMDA0MjkzMywiaWF0IjoxNzE5OTU2NTMzLCJqdGkiOiJkYzQwMDc2Yy05NWY0LTQ5MTItYWYyNC03MmFmZjc3YWQ4NDIiLCJ1c2VybmFtZSI6ImQ0ZTg3NGY4LTAwNzEtNzA0Zi04YTUxLWY5NTJmN2JiMmUwNiJ9.wvbV-RwtzPaFlFrUUOHbcm8QJI0sPXMOeAgTF2zKltj_Am-IhhvWJ0r7z5RE0K1n2YBDo0ILkZXaCbg32zf1ko5TzB3jK5AYwzxujVCwbMqd_Js_buQ266lLACKdxJKL2Rw8kGMb3sR6vy49AZHyuNW8H8HDr2z33URB--VP2VmEFY8qiU5ilWAQUlS0KQ-dXqyN25QpLPloIlX0sbRxaKSRIYpywaJaegMEjIo4IR3PHDhyKvA3_MFdAxDfvl0zUsKX0AbXbW5mtwDxVP6cj7McakxqHFD_mLDJN6futofFOSBynfdOwMqy_KN5GibWpyYepghNooRJoRSLOPfOhw'; // Reemplazar accesstoken 

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        const productsResponse = await fetch("/api/dev/ecommerceEscom/product");
        const productsData = await productsResponse.json();
        const products = productsData.data.map(item => ({
          id: item.prodID,
          title: item.prodTitle,
          description: item.prodDescription,
          price: item.prodPrice,
          image: item.prodPath,
          category: item.prodCategId, 
        }));

        const categoriesResponse = await fetch("/api/dev/ecommerceEscom/category");
        const categoriesData = await categoriesResponse.json();

        setProducts(products);
        setCategories(categoriesData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsAndCategories();
  }, []);

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`/api/dev/ecommerceEscom/product/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
      alert('Producto eliminado con éxito');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error al eliminar el producto');
    }
  };

  return (
    <AdminProductContext.Provider value={{ products, categories, loading, error, deleteProduct }}>
      {children}
    </AdminProductContext.Provider>
  );
};

export default AdminProductProvider;
