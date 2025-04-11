import { useState, useContext, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LogOut,
  User,
  ShoppingCart,
  ChevronDown,
  Menu,
  X,
  Heart,
  Sun,
  Moon,
} from "lucide-react";
import ThemeContext from "../Context/ThemeContext";
import CartContext from "../Context/CartContext";
import WishContext from "../Context/WichContext"; // Note: typo in original "WichContext"
import avatar from "../assets/avatar.jpg";

export default function Header() {
  const { theme, setTheme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const location = useLocation();

  const { state: cartItems } = useContext(CartContext);
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const { state: wishItems } = useContext(WishContext);

  // Refs for dropdown handling
  const avatarRef = useRef(null);
  const resourcesRef = useRef(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);

  // Close menu on location change (navigation)
  useEffect(() => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
    setAvatarOpen(false);
  }, [location]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (avatarRef.current && !avatarRef.current.contains(event.target)) {
        setAvatarOpen(false);
      }
      if (
        resourcesRef.current &&
        !resourcesRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Theme config
  const config = {
    header: {
      bg: isDark ? "bg-[#1e1e20]/95" : "bg-white/95",
      shadow: isDark ? "shadow-md shadow-black/10" : "shadow-sm",
      backdrop: "backdrop-blur-sm",
    },
    text: {
      base: isDark ? "text-gray-100" : "text-[#1e1e20]",
      hover: "hover:text-primary",
    },
    logo: {
      bg: "bg-gradient-to-r from-primary to-blue-600",
      text: isDark ? "text-white" : "text-gray-800",
    },
    nav: {
      link: `${
        isDark ? "text-gray-100" : "text-[#1e1e20]"
      } hover:text-primary transition-all duration-200 
             relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary 
             after:transition-all hover:after:w-full`,
      active: "text-primary after:w-full",
    },
    dropdown: {
      container: `absolute left-0 mt-2 w-48 rounded-lg shadow-lg 
                 ${
                   isDark
                     ? "bg-[#292929]/95 ring-white/10"
                     : "bg-white/95 ring-black/5"
                 } 
                 backdrop-blur-sm ring-1 transition-all duration-200`,
      item: `block px-4 py-2.5 text-sm rounded-md transition-colors 
            ${
              isDark
                ? "text-gray-100 hover:bg-[#1e1e20]/50"
                : "text-[#1e1e20] hover:bg-gray-50"
            }`,
    },
    mobile: {
      nav: `md:hidden transition-all duration-300 ease-in-out 
           ${isDark ? "bg-[#1e1e20]/95" : "bg-white/95"}`,
      item: `block py-2.5 transition-colors 
            ${
              isDark
                ? "text-gray-100 hover:text-primary"
                : "text-[#1e1e20] hover:text-primary"
            }`,
    },
    iconButton: `p-2 rounded-full cursor-pointer transition-colors
                ${
                  isDark
                    ? "text-gray-100 hover:bg-[#292929]/50"
                    : "text-[#1e1e20] hover:bg-gray-100"
                }`,
    badge: isDark
      ? "bg-primary text-white text-xs font-medium px-2 py-0.5 rounded-full min-w-[20px] flex items-center justify-center"
      : "bg-primary text-[#1e1e20] text-xs font-medium px-2 py-0.5 rounded-full min-w-[20px] flex items-center justify-center",
  };

  const isActive = (path) => {
    return location.pathname === path ? config.nav.active : "";
  };

  return (
    <header
      className={`${config.header.bg} ${config.header.shadow} ${config.header.backdrop} fixed w-full top-0 z-50`}
    >
      <div className="lg:px-8 py-3 ">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <div
                className={`h-10 w-10 rounded-lg ${config.logo.bg} flex items-center justify-center`}
              >
                <span className="text-white text-xl font-bold">T</span>
              </div>
              <span
                className={`text-2xl font-bold tracking-tight ${config.logo.text}`}
              >
                ToShop
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className={`${config.nav.link} ${isActive("/")}`}>
              Home
            </Link>
            <Link
              to="/shop"
              className={`${config.nav.link} ${isActive("/shop")}`}
            >
              Shop
            </Link>
            <Link to="/" className={`${config.nav.link} ${isActive("/")}`}>
              Services
            </Link>

            {/* Desktop Resources Dropdown */}
            <div className="relative" ref={resourcesRef}>
              <button
                className={`${config.nav.link} flex items-center`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-expanded={isDropdownOpen}
              >
                Resources
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div className={`${config.dropdown.container} z-10`}>
                  <div className="py-1">
                    <Link
                      to="/blog"
                      className={`${config.dropdown.item} ${isActive("/blog")}`}
                    >
                      Blog
                    </Link>
                    <Link
                      to="/guides"
                      className={`${config.dropdown.item} ${isActive(
                        "/guides"
                      )}`}
                    >
                      Guides
                    </Link>
                    <Link
                      to="/webinars"
                      className={`${config.dropdown.item} ${isActive(
                        "/webinars"
                      )}`}
                    >
                      Webinars
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/contact"
              className={`${config.nav.link} ${isActive("/contact")}`}
            >
              Contact
            </Link>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Wishlist Icon */}
            <Link to="/wish" className="relative">
              <button className={config.iconButton} aria-label="Wishlist">
                <Heart strokeWidth={1.5} className="w-5 h-5 sm:w-6 sm:h-6" />
                {wishItems.length > 0 && (
                  <span className={`absolute -top-1 -right-1 ${config.badge}`}>
                    {wishItems.length}
                  </span>
                )}
              </button>
            </Link>

            {/* Cart Icon */}
            <Link to="/cart" className="relative">
              <button className={config.iconButton} aria-label="Shopping Cart">
                <ShoppingCart
                  strokeWidth={1.5}
                  className="w-5 h-5 sm:w-6 sm:h-6"
                />
                {totalQuantity > 0 && (
                  <span className={`absolute -top-1 -right-1 ${config.badge}`}>
                    {totalQuantity}
                  </span>
                )}
              </button>
            </Link>

            {/* Theme Toggle */}
            <button
              className={config.iconButton}
              onClick={() => setTheme(isDark ? "light" : "dark")}
              aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            >
              {isDark ? (
                <Sun className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Moon className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>

            {/* Avatar Dropdown */}
            <div className="relative" ref={avatarRef}>
              <button
                className="focus:outline-none cursor-pointer rounded-full ring-offset-2 focus:ring-2 focus:ring-primary"
                onClick={() => setAvatarOpen(!avatarOpen)}
                aria-expanded={avatarOpen}
                aria-label="User menu"
              >
                <img
                  src={avatar}
                  alt="User avatar"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                />
              </button>

              {avatarOpen && (
                <div
                  className={`${config.dropdown.container} right-0 left-auto z-10`}
                >
                  <ul className="py-2">
                    <li>
                      <Link
                        to="/profile"
                        className={`${config.dropdown.item} flex items-center gap-2`}
                        onClick={() => setAvatarOpen(false)}
                      >
                        <User size={18} />
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        className={`${config.dropdown.item} flex items-center gap-2 w-full text-left text-red-500 hover:text-red-600`}
                        onClick={() => {
                          // Handle Logout Click
                          setAvatarOpen(false);
                        }}
                      >
                        <LogOut size={18} />
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className={`${config.iconButton} md:hidden ml-1`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`${
          config.mobile.nav
        } overflow-hidden transition-all duration-300 ${
          isMenuOpen
            ? "max-h-96 border-t border-gray-200 dark:border-[#1e1e20]"
            : "max-h-0"
        }`}
      >
        <div className="container mx-auto px-4 py-2 space-y-1">
          <Link
            to="/"
            className={`${config.mobile.item} ${isActive("/")}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/shop"
            className={`${config.mobile.item} ${isActive("/shop")}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Shop
          </Link>
          <Link
            to="/"
            className={`${config.mobile.item} ${isActive("/services")}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Services
          </Link>

          {/* Mobile Resources Dropdown */}
          <div>
            <button
              className={`flex items-center justify-between w-full py-2.5 ${config.text.base} ${config.text.hover}`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-expanded={isDropdownOpen}
            >
              <span>Resources</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`pl-4 space-y-1 overflow-hidden transition-all duration-200 ${
                isDropdownOpen
                  ? "max-h-48 opacity-100 my-1"
                  : "max-h-0 opacity-0"
              }`}
            >
              <Link
                to="/blog"
                className={`${config.mobile.item} ${isActive("/blog")}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                to="/guides"
                className={`${config.mobile.item} ${isActive("/guides")}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Guides
              </Link>
              <Link
                to="/webinars"
                className={`${config.mobile.item} ${isActive("/webinars")}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Webinars
              </Link>
            </div>
          </div>

          <Link
            to="/contact"
            className={`${config.mobile.item} ${isActive("/contact")}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}
