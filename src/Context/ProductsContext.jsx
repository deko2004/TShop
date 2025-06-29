import { createContext, useState, useEffect } from "react";

// It's good practice to define the API base URL in a central place,
// e.g., an environment variable or a config file.
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // The backend uses _id, frontend might expect id. Let's map it.
        // Also, the backend 'reviews' field is numReviews.
        const formattedProducts = data.map(product => ({
          ...product,
          id: product._id, // Map _id to id
          reviews: product.numReviews // Map numReviews to reviews (if frontend expects 'reviews' as count)
                                    // If frontend expects 'reviews' as an array of review objects, this needs adjustment
                                    // or the Product.jsx component needs to use numReviews.
                                    // For now, assuming 'reviews' was used as a count like 'numReviews'.
        }));
        setProducts(formattedProducts);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <ProductContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
