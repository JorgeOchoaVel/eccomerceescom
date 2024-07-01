import { createContext, useState, useEffect } from "react";

export const AdminProductContext = createContext();

const AdminProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/dev/ecommerceEscom/product");
        const data = await response.json();
        const products = data.data.map(item => ({
          id: item.prodID,
          title: item.prodTitle,
          description: item.prodDescription,
          price: item.prodPrice,
          image: item.prodPath,
          category: item.prodCategory, // Asegúrate de que esto exista en tus datos
        }));
        setProducts(products);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    const accessToken = 'eyJraWQiOiJUYkYxUGM4ZTN5VWdcL2VjZUxXQ1NBd2lqbjV1YURtNDd6Zlh6YjNmVVl6UT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJkNGU4NzRmOC0wMDcxLTcwNGYtOGE1MS1mOTUyZjdiYjJlMDYiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV90Y2x1VklPdHYiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiI0ZGhlZGRvbDdqMWgxMWlzcGRybmV0aGQzZyIsImV2ZW50X2lkIjoiYmU3OGViM2MtMTE3MS00ZjcyLWIxNGEtMDBlNTBiNmVhZTg3IiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiBvcGVuaWQgZW1haWwiLCJhdXRoX3RpbWUiOjE3MTk3OTIxMzEsImV4cCI6MTcxOTg3ODUzMSwiaWF0IjoxNzE5NzkyMTMxLCJqdGkiOiJiZmY2Njg3Yi0yYjUxLTQ4NWYtYTNkNC05YTVkZDNhNjE4MzYiLCJ1c2VybmFtZSI6ImQ0ZTg3NGY4LTAwNzEtNzA0Zi04YTUxLWY5NTJmN2JiMmUwNiJ9.vrnq4x83ecsWEzhczO-O74EJpr4mwFUw04ACx50ylNLS5mZ3Y5AZ1Mi1vt6Jzh2mq3OLl7yfY4ltgfn3LrSFNH4NYQQQDvNq5Ma9_tgap36SVJxlryhIzGxFU9xTZhpUlF5YXrmOtNX3KkvGhBr6SidBmkN1VpssJA5Le1ozz4Wt2c2I4lPj3ZmUc8l6-PXVjojWyq8rYkaPgatNAOpI5rZMYVKmq32m03wefRq2gFXn4y7C8eGnBl9_KNUzqMUiMxWAV5rQJD0XAd47NwMbC8XNfLpmu0qkJZtemHMLJhVC0uEfsTS46USLGtcDQso44i0N36J7jgbWAlmcLGYFAQ'; // Reemplaza con tu token de acceso real
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
    <AdminProductContext.Provider value={{ products, loading, error, deleteProduct }}>
      {children}
    </AdminProductContext.Provider>
  );
};

export default AdminProductProvider;

