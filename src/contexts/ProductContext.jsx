import { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/dev/ecommerceEscom/product");
      const data = await response.json();
      const products = data.data.map(item => ({
        id: item.prodID,
        title: item.prodTitle,
        description: item.prodDescription,
        price: item.prodPrice,
        image: item.prodPath,
      }));
      setProducts(products);
    };
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
