import Header from "./layout/Header";
import FeutureSlider from "./components/FeutureSlider";
import HeroSection from "./pages/HeroSection";
import Cart from "./pages/Cart";
import Wish from "./pages/Wish";
import Shop from "./pages/Shop";
import ProductPage from "./pages/Product";
import ThemeContext from "./Context/ThemeContext";
import Footer from "./layout/Footer";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { CartProvider } from "./Context/CartContext";
import { WishProvider } from "./Context/WichContext";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import ProfilePage from "./pages/ProfilePage";
import ScrooltoTop from "./hooks/ScrooltoTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProductProvider } from "./Context/ProductsContext";

export default function App() {
  const [theme, setTheme] = useState("dark");

  return (
    <ProductProvider>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <CartProvider>
          <WishProvider>
            <ScrooltoTop />
            <div className="App ">
              <Header />
              <Routes>
                <Route
                  path="/"
                  element={
                    <div
                      className={
                        theme === "dark" ? "bg-[#1e1e20]  " : "bg-white "
                      }
                    >
                      <HeroSection />
                      <FeutureSlider />
                      <Services />
                      <Footer />
                    </div>
                  }
                />
                <Route
                  path="/shop"
                  element={
                    <>
                      <Shop /> <Footer />
                    </>
                  }
                />

                <Route
                  path="/Cart"
                  element={
                    <>
                      <Cart />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/Wish"
                  element={
                    <>
                      <Wish />
                      <Footer />
                    </>
                  }
                />
                <Route path="/profile" element={<ProfilePage />} />
                <Route
                  path="/ProductPage/:id"
                  element={
                    <>
                      <ProductPage /> <FeutureSlider /> <Footer />
                    </>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <>
                      <Contact /> <Footer />
                    </>
                  }
                />
                <Route path="*" element={<h1>Not Found</h1>} />
              </Routes>
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={theme}
                style={{ top: "80px" }} // Adjust as needed
              />
            </div>
          </WishProvider>
        </CartProvider>
      </ThemeContext.Provider>
    </ProductProvider>
  );
}
