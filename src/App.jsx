import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// Páginas
import { Home, ProductDetails, Products, About, Contact, Error, AddProduct, AdminDashboard } from "./pages";
// Componentes
import { Sidebar, Header, Footer, AdminHeader } from "./components";

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

const Layout = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/Admin");

  return (
    <div className="overflow-hidden">
      {isAdminRoute ? <AdminHeader /> : <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/AddProduct" element={<AddProduct />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Sidebar />
      <Footer />
    </div>
  );
};

export default App;
