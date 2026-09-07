import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import Home from "./pages/Home.jsx";
import Product from "./pages/Product.jsx";
import Categories from "./pages/Categories.jsx";
import Contact from "./pages/Contact.jsx";
import Admin from "./pages/Admin.jsx";
import NotFound from "./pages/NotFound.jsx";
import { WHATSAPP_NUMBER } from "./config";

function ProtectedAdminRoute({ children }) {
  const isAdmin = sessionStorage.getItem("iotmart_admin") === "true";
  return isAdmin ? children : <Navigate to="/" replace />;
}

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar onOpenCart={() => setCartOpen(true)} />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <Admin />
              </ProtectedAdminRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with IoTMart on WhatsApp"
        className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-green-700 text-white shadow-lg shadow-green-700/30 transition-transform hover:scale-105"
      >
        <MessageCircle className="h-6 w-6" strokeWidth={2} />
      </a>
    </div>
  );
}
