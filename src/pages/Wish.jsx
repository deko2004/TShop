import { useContext, useState, useEffect } from "react";
import ThemeContext from "../Context/ThemeContext";
import WishContext from "../Context/WichContext"; // Note: Typo in import path maintained as per requirements
import CartContext from "../Context/CartContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  X,
  Eye,
  GridIcon,
  List,
  ArrowRight,
  Check,
  Trash2,
  Package,
} from "lucide-react";

const getStyles = (isDark) => ({
  pageBg: isDark ? "bg-[#1e1e20]" : "bg-gray-100",
  title: isDark ? "text-white" : "text-[#1e1e20]",
  card: isDark ? "bg-[#292929]" : "bg-white",
  btn: isDark
    ? "border-2 border-white rounded-xl text-white"
    : "border-2 border-[#1e1e20] rounded-xl text-[#1e1e20]",
  cardShadow: isDark
    ? "shadow-lg shadow-black/20"
    : "shadow-xl shadow-gray-200",
  secondaryText: isDark ? "text-gray-300" : "text-gray-600",
  badge: isDark
    ? "bg-indigo-900 text-indigo-200"
    : "bg-indigo-100 text-indigo-800",
  overlay: isDark ? "bg-black/80" : "bg-white/80",
  divider: isDark ? "border-gray-700" : "border-gray-200",
  iconColor: isDark ? "text-white" : "text-[#1e1e20]",
});

export default function Wish() {
  const { theme } = useContext(ThemeContext);
  const { state: wishState, dispatch: wishDispatch } = useContext(WishContext);
  const { state: cartState, dispatch: cartDispatch } = useContext(CartContext);
  const isDark = theme === "dark";
  const styles = getStyles(isDark);

  const [selectedItem, setSelectedItem] = useState(null);
  const [isQuickView, setIsQuickView] = useState(false);
  const [isListView, setIsListView] = useState(false);
  const [animatingItems, setAnimatingItems] = useState([]);

  // Track items already in cart
  const itemsInCart = cartState ? cartState.map((item) => item.id) : [];

  useEffect(() => {
    // Animation for new items
    const timer = setTimeout(() => {
      setAnimatingItems([]);
    }, 1000);
    return () => clearTimeout(timer);
  }, [animatingItems]);

  useEffect(() => {
    // Prevent scrolling when modal is open
    if (isQuickView) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isQuickView]);

  const handleMoveToCart = (item) => {
    cartDispatch({ type: "addtocart", payload: item });
    wishDispatch({ type: "addtoWish", payload: item }); // This will remove it from wish list
    setAnimatingItems([...animatingItems, item.id]);
    toast.success("Item moved to cart!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleRemoveFromWish = (item) => {
    wishDispatch({ type: "addtoWish", payload: item });
    toast.success("Item removed from wishlist", {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  const openQuickView = (item) => {
    setSelectedItem(item);
    setIsQuickView(true);
  };

  const closeQuickView = () => {
    setIsQuickView(false);
    setTimeout(() => setSelectedItem(null), 300);
  };

  return (
    <div
      className={`${styles.pageBg} min-h-screen pt-16 px-4 md:px-8 lg:px-12 pb-16 transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header section with tabs like in the image */}
        <div className="mb-4 flex justify-center items-center">
          <h1
            className={`${styles.title} pt-14 text-xl font-bold mb-6 transition-colors duration-300 flex items-center gap-2`}
          >
            My Wishlist
          </h1>
        </div>

        {wishState.length === 0 ? (
          <div className="text-center py-16 max-w-lg mx-auto">
            <div className="mb-8 flex justify-center">
              <Heart className="h-16 w-16 text-red-500 opacity-60" />
            </div>
            <p
              className={`${styles.title} text-xl mb-6 transition-colors duration-300`}
            >
              Your wishlist is empty
            </p>
            <p className={`${styles.secondaryText} mb-8`}>
              Add items to your wishlist to save them for later and keep track
              of products you love.
            </p>
            <Link to="/shop">
              <button
                className={`${styles.btn} px-8 py-3 cursor-pointer hover:opacity-80 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 mx-auto`}
              >
                <Package size={20} />
                Browse Products
                <ArrowRight size={16} />
              </button>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
              <p
                className={`${styles.secondaryText} transition-colors duration-300 mb-4 md:mb-0`}
              >
                {wishState.length} {wishState.length === 1 ? "item" : "items"}{" "}
                in your wishlist
              </p>

              <div className="flex gap-3">
                <button
                  className={`px-3 py-1 rounded-lg cursor-pointer transition-colors flex items-center gap-2 ${
                    isListView
                      ? "bg-blue-600 text-white"
                      : `${styles.btn} bg-opacity-10`
                  }`}
                  onClick={() => setIsListView(true)}
                  aria-label="Switch to list view"
                >
                  <List size={16} /> List
                </button>
                <button
                  className={`px-3 py-1 rounded-lg transition-colors flex cursor-pointer items-center gap-2 ${
                    !isListView
                      ? "bg-blue-600 text-white"
                      : `${styles.btn} bg-opacity-10`
                  }`}
                  onClick={() => setIsListView(false)}
                  aria-label="Switch to grid view"
                >
                  <GridIcon size={16} /> Grid
                </button>
              </div>
            </div>

            {isListView ? (
              <div
                className={`${styles.card} ${styles.cardShadow} rounded-xl overflow-hidden transition-all duration-300`}
              >
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr
                        className={`${styles.title} border-b ${styles.divider}`}
                      >
                        <th className="text-left py-4 px-6">Product</th>
                        <th className="text-right py-4 px-6">Price</th>
                        <th className="text-right py-4 px-6">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {wishState.map((item) => (
                        <tr
                          key={item.id}
                          className={`${styles.title} border-b last:border-b-0 ${styles.divider} hover:bg-opacity-50 transition-colors duration-300`}
                        >
                          <td className="py-4 px-6">
                            <div className="flex items-center">
                              <div className="w-16 h-16 mr-4 flex-shrink-0">
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                              <div className="flex-grow">
                                <h3
                                  className="font-medium line-clamp-1 hover:underline cursor-pointer"
                                  onClick={() => openQuickView(item)}
                                  title={item.title}
                                >
                                  {item.title}
                                </h3>
                                {itemsInCart.includes(item.id) && (
                                  <span
                                    className={`${styles.badge} text-xs px-2 py-1 rounded-full inline-flex items-center gap-1 mt-1`}
                                  >
                                    <Check size={12} /> In Cart
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-right font-bold">
                            ${item.price.toFixed(2)}
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => openQuickView(item)}
                                className={`${styles.btn} p-2 rounded-lg cursor-pointer hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300`}
                                aria-label={`Quick view of ${item.title}`}
                              >
                                <Eye size={18} />
                              </button>
                              <button
                                onClick={() => handleMoveToCart(item)}
                                className={`bg-blue-600 text-white p-2 cursor-pointer rounded-lg hover:bg-blue-700 transition-all duration-300 ${
                                  animatingItems.includes(item.id)
                                    ? "animate-pulse"
                                    : ""
                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                                aria-label={`Move ${item.title} to cart`}
                                disabled={itemsInCart.includes(item.id)}
                              >
                                <ShoppingCart size={18} />
                              </button>
                              <button
                                onClick={() => handleRemoveFromWish(item)}
                                className="bg-red-500 text-white p-2 rounded-lg cursor-pointer hover:bg-red-600 transition-all duration-300"
                                aria-label={`Remove ${item.title} from wishlist`}
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {wishState.map((item) => (
                  <div
                    key={item.id}
                    className={`${styles.card}  rounded-xl overflow-hidden flex flex-col transition-all duration-300 relative`}
                  >
                    <div className="relative">
                      {/* Heart icon in corner like in the mockup */}
                      <button
                        onClick={() => handleRemoveFromWish(item)}
                        className="absolute top-2 right-2 z-10 p-2 cursor-pointer rounded-full bg-white/70 text-gray-800 hover:text-red-500"
                        aria-label={`Remove ${item.title} from wishlist`}
                      >
                        <Heart
                          size={18}
                          className="text-red-500 fill-red-500"
                        />
                      </button>

                      <div
                        className="h-32 lg:h-40 p-2 flex items-center justify-center cursor-pointer"
                        onClick={() => openQuickView(item)}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="max-h-28 lg:max-h-36 object-contain transition-transform duration-500 hover:scale-110"
                        />
                      </div>

                      {/* Transparent overlay instead of dark */}
                      <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                        <button
                          onClick={() => openQuickView(item)}
                          className="bg-white text-gray-800 cursor-pointer rounded-full w-10 h-10 flex items-center justify-center m-1 hover:bg-blue-500 hover:text-white transition-all duration-300"
                          aria-label="Quick view"
                        >
                          <Eye size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="flex-grow p-3 flex flex-col">
                      {/* Star rating like in the mockup */}
                      <div className="flex items-center mb-1">
                        <div className="flex text-yellow-400">
                          {item.rating && (
                            <>
                              <span className="text-xs mr-1">★</span>
                              <span className="text-xs">{item.rating}</span>
                            </>
                          )}
                        </div>
                      </div>

                      <h3
                        className={`${styles.title} font-medium text-sm line-clamp-1 cursor-pointer hover:text-blue-500`}
                        title={item.title}
                        onClick={() => openQuickView(item)}
                      >
                        {item.title}
                      </h3>

                      {/* Category text like in the mockup */}
                      <p className="text-xs text-gray-400 mb-1">
                        {item.category || "Chair"}
                      </p>

                      <p
                        className={`${styles.title} text-sm font-bold transition-colors duration-300`}
                      >
                        ${item.price.toFixed(2)}
                      </p>

                      {/* Move to cart button with minimal styling like in the mockup */}
                      <div className="mt-2">
                        <button
                          onClick={() => handleMoveToCart(item)}
                          className={`w-full bg-blue-600 text-white cursor-pointer py-2 rounded-lg transition-all duration-300 text-sm flex items-center justify-center gap-1 ${
                            animatingItems.includes(item.id)
                              ? "animate-pulse"
                              : ""
                          } disabled:opacity-50 disabled:cursor-not-allowed`}
                          aria-label={`Move ${item.title} to cart`}
                          disabled={itemsInCart.includes(item.id)}
                        >
                          <ShoppingCart size={14} />
                          {itemsInCart.includes(item.id)
                            ? "In Cart"
                            : "Add to Cart"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Responsive Quick View Modal */}
      {selectedItem && (
        <div
          className={`fixed inset-0 ${
            styles.overlay
          } flex items-center justify-center z-50 p-2 sm:p-4 transition-opacity duration-300 ${
            isQuickView ? "opacity-100" : "opacity-0 pointer-events-none"
          } overflow-y-auto`}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeQuickView();
          }}
        >
          <div
            className={`relative ${styles.card} ${
              styles.cardShadow
            } w-full max-w-4xl rounded-xl sm:rounded-2xl overflow-hidden transition-transform duration-300 ${
              isQuickView ? "scale-100" : "scale-95"
            } my-4`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeQuickView}
              className="absolute top-2 right-2 cursor-pointer sm:top-4 sm:right-4 z-10 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300"
              aria-label="Close quick view"
            >
              <X size={16} />
            </button>

            {""}
            {""}
            {""}
            {""}
            <div className="flex flex-col md:flex-row">
              {/* Image section */}
              <div className="p-2 sm:p-4 md:p-6 md:w-1/2 flex items-center justify-center">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="max-h-38 sm:max-h-48 md:max-h-66 object-contain"
                />
              </div>

              {/* Details section */}
              <div className="p-2 sm:p-2 md:p-6 md:w-1/2 flex flex-col">
                <h2
                  className={`${styles.title} text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2`}
                >
                  {selectedItem.title}
                </h2>
                <p
                  className={`${styles.title} text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-4`}
                >
                  ${selectedItem.price.toFixed(2)}
                </p>

                {/* Product specs in a responsive grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-1 mb-4">
                  {selectedItem.brand && (
                    <div
                      className={`${styles.secondaryText} text-xs sm:text-sm`}
                    >
                      <span className="font-semibold">Brand:</span>{" "}
                      {selectedItem.brand}
                    </div>
                  )}

                  {selectedItem.category && (
                    <div
                      className={`${styles.secondaryText} text-xs sm:text-sm`}
                    >
                      <span className="font-semibold">Category:</span>{" "}
                      {selectedItem.category}
                    </div>
                  )}

                  {selectedItem.sku && (
                    <div
                      className={`${styles.secondaryText} text-xs sm:text-sm`}
                    >
                      <span className="font-semibold">SKU:</span>{" "}
                      {selectedItem.sku}
                    </div>
                  )}

                  {selectedItem.stock !== undefined && (
                    <div
                      className={`${styles.secondaryText} text-xs sm:text-sm`}
                    >
                      <span className="font-semibold">Availability:</span>{" "}
                      {selectedItem.stock > 0
                        ? `In Stock (${selectedItem.stock})`
                        : "Out of Stock"}
                    </div>
                  )}

                  {selectedItem.rating !== undefined && (
                    <div
                      className={`${styles.secondaryText} text-xs sm:text-sm`}
                    >
                      <span className="font-semibold">Rating:</span>{" "}
                      {selectedItem.rating}{" "}
                      {selectedItem.reviews &&
                        `(${selectedItem.reviews} reviews)`}
                    </div>
                  )}
                </div>

                <div
                  className={`${styles.divider} border-t my-2 sm:my-3`}
                ></div>

                <p
                  className={`${styles.secondaryText} mb-2 sm:mb-4 text-xs sm:text-sm`}
                >
                  {selectedItem.description ||
                    "This item is on your wishlist. You can move it to your cart or remove it from your wishlist."}
                </p>

                <div className="mt-auto flex gap-2 sm:gap-3">
                  <button
                    onClick={() => {
                      handleMoveToCart(selectedItem);
                      closeQuickView();
                    }}
                    className="flex-1 bg-blue-600 text-white cursor-pointer py-1 sm:py-2 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                    disabled={itemsInCart.includes(selectedItem.id)}
                  >
                    <ShoppingCart size={14} className="sm:w-4 sm:h-4" />
                    {itemsInCart.includes(selectedItem.id)
                      ? "Already In Cart"
                      : "Move to Cart"}
                  </button>
                  <button
                    onClick={() => {
                      handleRemoveFromWish(selectedItem);
                      closeQuickView();
                    }}
                    className="px-3.5 py-4 cursor-pointer lg:py-4 sm:px-4 bg-red-500 text-white rounded-lg transition-colors duration-300 flex items-center"
                  >
                    <Trash2 size={14} className="sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
            </div>

            {""}
            {""}
            {""}
            {""}
          </div>
        </div>
      )}
    </div>
  );
}
