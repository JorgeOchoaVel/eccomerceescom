import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// Páginas
import { Home, ProductDetails, Products, About, Contact, Error, AddProduct, AdminDashboard, AdminProducts, EditProduct, AdminCategories, AddCategory, EditCategory } from "./pages";
// Componentes
import { Sidebar, Header, Footer, AdminHeader } from "./components";
import AdminProductProvider from "./contexts/AdminProductContext";
import AdminCategoryProvider from "./contexts/AdminCategoryContext";

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

const Layout = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="overflow-hidden">
      {isAdminRoute ? <AdminHeader /> : <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/dashboard" element={<AdminProductProvider><AdminDashboard /></AdminProductProvider>} />
        <Route path="/admin/products" element={<AdminProductProvider><AdminProducts /></AdminProductProvider>} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/admin/edit-product/:id" element={<EditProduct />} />
        <Route path="/admin/categories" element={<AdminCategoryProvider><AdminCategories /></AdminCategoryProvider>} />
        <Route path="/admin/add-category" element={<AddCategory />} />
        <Route path="/admin/edit-category/:id" element={<EditCategory />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Sidebar />
      <Footer />
    </div>
  );
};

export default App;
