import { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify'; // Assuming react-toastify is used for notifications

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To check initial auth status

  // Function to make API calls with credentials
  const makeAuthenticatedRequest = async (url, options = {}) => {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
        // Cookies are sent automatically by the browser if 'credentials: include' is set
        // and CORS on the server is configured correctly for credentials.
      },
      credentials: 'include', // Crucial for sending/receiving cookies
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  };


  // Check if user is logged in (e.g., by checking cookie or calling a /me endpoint)
  // This is a simplified check; a robust app might have a /api/users/me endpoint
  // to verify the cookie and get user data on initial load.
  // For now, we'll rely on localStorage or simply initialize as null.
  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user info:", error);
        localStorage.removeItem('userInfo');
      }
    }
    setLoading(false); // Done checking initial auth state
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const data = await makeAuthenticatedRequest(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data)); // Persist user info
      toast.success('Logged in successfully!');
      return data;
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error.message || 'Login failed. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    try {
      setLoading(true);
      const data = await makeAuthenticatedRequest(`${API_BASE_URL}/users/register`, {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
      });
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data)); // Persist user info
      toast.success('Registered successfully! Please log in.'); // Or log in directly
      // If backend logs in directly upon registration:
      // toast.success('Registered and logged in successfully!');
      return data;
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error(error.message || 'Registration failed. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      // Call a backend logout endpoint if it exists to clear the HTTPOnly cookie
      // await makeAuthenticatedRequest(`${API_BASE_URL}/users/logout`, { method: 'POST' });
      // For now, just clear client-side state
      setUser(null);
      localStorage.removeItem('userInfo');
      toast.info('Logged out.');
      // Optionally, redirect to home or login page via react-router history or navigate
    } catch (error) {
        console.error("Logout failed:", error);
        toast.error(error.message || 'Logout failed.');
        // Even if server logout fails, clear client state
        setUser(null);
        localStorage.removeItem('userInfo');
    } finally {
        setLoading(false);
    }
  };

  // Value provided to child components
  const value = {
    user,
    setUser, // Allow manual setting if needed, e.g., after profile update
    login,
    register,
    logout,
    loading, // To indicate auth operation in progress or initial check
    isAuthenticated: !!user, // Boolean flag for convenience
    makeAuthenticatedRequest // Expose this for other contexts/components
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
