import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeContext from "../Context/ThemeContext";
import ProductContext from "../Context/ProductsContext";
import CartContext from "../Context/CartContext";
import WishContext from "../Context/WichContext";
import { toast } from "react-toastify";
import {
  Heart,
  Search,
  Sliders,
  XCircle,
  Star,
  StarHalf,
  ChevronDown,
  ShoppingBag,
  ArrowUpDown,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

export default function Shop() {
  // State management
  const [btnFilter, setBtnFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 3000 });
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(18); // Increased from 12 to 16 for better grid layout

  // Context hooks
  const { products } = useContext(ProductContext);
  const { theme } = useContext(ThemeContext);
  const { dispatch, state: cartState } = useContext(CartContext);
  const { dispatch: wishDispatch, state: wishState } = useContext(WishContext);

  // Theme checks
  const isDark = theme === "dark";

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [btnFilter, searchQuery, priceRange, sortBy]);

  // Simulate loading state
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [btnFilter, searchQuery, priceRange, sortBy, currentPage]);

  // Helper functions
  const isInWishlist = (productId) => {
    return wishState.some((item) => item.id === productId);
  };

  const isInCart = (productId) => {
    return cartState.some((item) => item.id === productId);
  };

  const notify = (message, type = "success") => {
    toast[type](message, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleWishlistToggle = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    const isRemovingFromWish = isInWishlist(product.id);
    wishDispatch({ type: "addtoWish", payload: product });

    if (isRemovingFromWish) {
      notify("Product removed from wishlist", "error");
    } else {
      notify("Product added to wishlist");
    }
  };

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({
      type: "addtocart",
      payload: {
        id: parseInt(product.id),
        quantity: 1,
      },
    });
    notify("Product added to cart");
  };

  // Theme styles with enhanced consistency
  const themeStyles = {
    dark: {
      title: "text-white",
      shop: "bg-[#1e1e20]",
      card: "bg-[#292929] border border-gray-700 text-white",
      btn: "px-6 py-2 border border-gray-600 text-white rounded-full hover:bg-white hover:text-[#1e1e20] transition-all duration-300 cursor-pointer",
      btncateg:
        "px-6 py-2 border border-gray-600 text-white rounded-full hover:bg-white hover:text-[#1e1e20] transition-all duration-300 cursor-pointer",
      inputBg: "bg-[#292929] border-gray-700",
      skeleton: "bg-gray-700",
      hoverEffect: "hover:border-gray-500",
      secondaryText: "text-gray-400",
      divider: "border-gray-700",
      pageBtn:
        "bg-[#292929] border border-gray-700 text-white hover:border-primary cursor-pointer",
    },
    light: {
      title: "text-[#1e1e20]",
      shop: "bg-gray-100",
      card: "bg-white border border-gray-200 text-gray-900 shadow-sm",
      btn: "px-6 py-2 border border-gray-300 text-[#1e1e20] rounded-full hover:bg-[#1e1e20] hover:text-white transition-all duration-300 cursor-pointer",
      btncateg:
        "px-6 py-2 border border-gray-300 text-[#1e1e20] rounded-full hover:bg-[#1e1e20] hover:text-white transition-all duration-300 cursor-pointer",
      inputBg: "bg-white border-gray-300",
      skeleton: "bg-gray-200",
      hoverEffect: "hover:border-gray-400",
      secondaryText: "text-gray-600",
      divider: "border-gray-200",
      pageBtn:
        "bg-white border border-gray-200 text-gray-900 hover:border-primary cursor-pointer",
    },
  };

  const currentStyles = isDark ? themeStyles.dark : themeStyles.light;

  // Product filtering and sorting logic
  const filterAndSortProducts = () => {
    return products
      .filter((product) => {
        // Category filter
        const categoryMatch =
          btnFilter === "All" ||
          (product.type &&
            product.type.toLowerCase() === btnFilter.toLowerCase());

        // Search query filter
        const searchMatch =
          !searchQuery ||
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (product.description &&
            product.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase()));

        // Price range filter
        const priceMatch =
          (!priceRange.min || product.price >= priceRange.min) &&
          (!priceRange.max || product.price <= priceRange.max);

        return categoryMatch && searchMatch && priceMatch;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "price-low":
            return a.price - b.price;
          case "price-high":
            return b.price - a.price;
          case "name-asc":
            return a.title.localeCompare(b.title);
          case "name-desc":
            return b.title.localeCompare(a.title);
          default: // featured or any other default
            return 0; // maintain original order
        }
      });
  };

  const allFilteredProducts = filterAndSortProducts();

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allFilteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(allFilteredProducts.length / productsPerPage);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPageButtons = 5; // Maximum number of page buttons to show

    if (totalPages <= maxPageButtons) {
      // If we have fewer pages than the max, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page
      pageNumbers.push(1);

      // Calculate start and end of page range
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      // Adjust range if at the beginning or end
      if (currentPage <= 2) {
        endPage = 4;
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 3;
      }

      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pageNumbers.push("...");
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push("...");
      }

      // Always include last page if more than one page
      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  // Page change handler
  const handlePageChange = (page) => {
    if (page === "..." || page < 1 || page > totalPages) return;
    setCurrentPage(page);
    // Scroll to top when changing pages
    window.scrollTo(0, 0);
  };

  // Get unique product types for filters
  const productTypes = [
    "All",
    ...new Set(
      products
        .map((p) => p.type || "")
        .filter(Boolean)
        .map((t) => t.toLowerCase())
    ),
  ];

  // Render rating stars
  const renderRating = (rating = 4.5) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star
            key={`star-${i}`}
            size={16}
            className="text-yellow-500 fill-yellow-500"
          />
        ))}
        {hasHalfStar && (
          <StarHalf size={16} className="text-yellow-500 fill-yellow-500" />
        )}
        <span className={`ml-1 text-xs ${currentStyles.secondaryText}`}>
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  // Skeleton loader component
  const ProductSkeleton = () => (
    <div
      className={`${currentStyles.card} rounded-lg overflow-hidden animate-pulse`}
    >
      <div className={`h-40 ${currentStyles.skeleton}`}></div>
      <div className="p-3">
        <div
          className={`h-4 ${currentStyles.skeleton} rounded mb-2 w-3/4`}
        ></div>
        <div
          className={`h-3 ${currentStyles.skeleton} rounded mb-2 w-full`}
        ></div>
        <div className="flex justify-between items-center mt-3">
          <div className={`h-5 ${currentStyles.skeleton} rounded w-1/3`}></div>
          <div
            className={`h-8 ${currentStyles.skeleton} rounded-full w-8`}
          ></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`${currentStyles.shop} mt-12 min-h-screen pb-8`}>
      {/* Hero section */}
      <div className={`w-full py-16 ${isDark ? "" : "bg-gray-50"} mb-8`}>
        <div className="container mx-auto px-4">
          <h1
            className={`${currentStyles.title} text-4xl md:text-6xl font-bold mb-4`}
          >
            Shop <span className="text-primary">Premium Tech</span>
          </h1>
          <p className={`${currentStyles.secondaryText} max-w-2xl text-lg`}>
            Discover cutting-edge technology, premium audio gear, and
            accessories that elevate your digital lifestyle.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4">
        {/* Search and filters bar */}
        <div
          className={`${currentStyles.card} p-4 mb-8 rounded-xl flex flex-col md:flex-row gap-4 sticky top-16 z-10`}
        >
          <div className="relative flex-grow">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentStyles.inputBg} border focus:outline-none focus:ring-2 focus:ring-primary/50`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                <XCircle
                  size={18}
                  className="text-gray-500 hover:text-primary"
                />
              </button>
            )}
          </div>

          <div className="flex gap-2">
            <div className="relative">
              <button
                onClick={() =>
                  setSortBy((prev) =>
                    prev === "price-low" ? "price-high" : "price-low"
                  )
                }
                className={`${currentStyles.btn} flex items-center gap-2 px-4`}
              >
                <ArrowUpDown size={16} />
                <span className="hidden sm:inline">Sort</span>
              </button>
              <div
                className={`absolute left-0 mt-2 w-48 ${
                  currentStyles.card
                } rounded-lg shadow-lg ${
                  showFilters ? "block" : "hidden"
                } z-20`}
              >
                <div className="py-1 rounded-lg">
                  {[
                    "featured",
                    "price-low",
                    "price-high",
                    "name-asc",
                    "name-desc",
                  ].map((option) => (
                    <button
                      key={option}
                      onClick={() => setSortBy(option)}
                      className={`block w-full text-left px-4 py-2 cursor-pointer ${
                        sortBy === option ? "bg-primary/10 text-primary" : ""
                      } hover:bg-[#3d3d3f7e]`}
                    >
                      {option === "featured" && "Featured"}
                      {option === "price-low" && "Price: Low to High"}
                      {option === "price-high" && "Price: High to Low"}
                      {option === "name-asc" && "Name: A to Z"}
                      {option === "name-desc" && "Name: Z to A"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`${currentStyles.btn} flex items-center gap-2 px-4`}
            >
              <Sliders size={16} />
              <span className="hidden sm:inline">Filters</span>
            </button>

            <button
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className={`${currentStyles.btn} flex items-center px-4`}
            >
              {viewMode === "grid" ? (
                <div className="grid grid-cols-2 gap-0.5">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 bg-current rounded-sm"
                    ></div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-4 h-0.5 bg-current"></div>
                  ))}
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Expanded filters */}
        {showFilters && (
          <div className={`${currentStyles.card} p-6 mb-8 rounded-xl`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {productTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setBtnFilter(type)}
                      className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 cursor-pointer ${
                        btnFilter === type
                          ? "bg-primary text-white"
                          : `${currentStyles.btncateg}`
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min || ""}
                    onChange={(e) =>
                      setPriceRange({
                        ...priceRange,
                        min: Number(e.target.value) || 0,
                      })
                    }
                    className={`w-24 px-3 py-2 rounded-lg ${currentStyles.inputBg} border focus:outline-none focus:ring-2 focus:ring-primary/50`}
                  />
                  <span>to</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max || ""}
                    onChange={(e) =>
                      setPriceRange({
                        ...priceRange,
                        max: Number(e.target.value) || 0,
                      })
                    }
                    className={`w-24 px-3 py-2 rounded-lg ${currentStyles.inputBg} border focus:outline-none focus:ring-2 focus:ring-primary/50`}
                  />
                </div>
              </div>

              <div className="md:text-right">
                <button
                  onClick={() => {
                    setBtnFilter("All");
                    setSearchQuery("");
                    setPriceRange({ min: 0, max: 1000 });
                  }}
                  className="text-primary hover:underline mb-2 inline-block cursor-pointer"
                >
                  Reset filters
                </button>
                <p className={`text-sm ${currentStyles.secondaryText}`}>
                  Showing {allFilteredProducts.length} of {products.length}{" "}
                  products
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Product count and active filters */}
        <div className="flex flex-wrap items-center justify-between mb-6">
          <h2 className={`${currentStyles.title} text-xl font-bold`}>
            {btnFilter === "All"
              ? "All Products"
              : btnFilter.charAt(0).toUpperCase() + btnFilter.slice(1)}
            <span
              className={`${currentStyles.secondaryText} ml-2 text-sm font-normal`}
            >
              ({allFilteredProducts.length} items)
            </span>
          </h2>

          <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
            {btnFilter !== "All" && (
              <span
                className={`${currentStyles.card} px-3 py-1 text-sm rounded-full flex items-center gap-1 ${currentStyles.hoverEffect}`}
              >
                Category: {btnFilter}
                <XCircle
                  size={14}
                  className="cursor-pointer"
                  onClick={() => setBtnFilter("All")}
                />
              </span>
            )}

            {searchQuery && (
              <span
                className={`${currentStyles.card} px-3 py-1 text-sm rounded-full flex items-center gap-1 ${currentStyles.hoverEffect}`}
              >
                Search: {searchQuery}
                <XCircle
                  size={14}
                  className="cursor-pointer"
                  onClick={() => setSearchQuery("")}
                />
              </span>
            )}

            {(priceRange.min > 0 || priceRange.max < 1000) && (
              <span
                className={`${currentStyles.card} px-3 py-1 text-sm rounded-full flex items-center gap-1 ${currentStyles.hoverEffect}`}
              >
                Price: ${priceRange.min} - ${priceRange.max}
                <XCircle
                  size={14}
                  className="cursor-pointer"
                  onClick={() => setPriceRange({ min: 0, max: 1000 })}
                />
              </span>
            )}
          </div>
        </div>

        {/* No results message */}
        {!isLoading && allFilteredProducts.length === 0 && (
          <div className={`${currentStyles.card} p-8 rounded-xl text-center`}>
            <div className="mb-4">
              <Search size={48} className="mx-auto text-gray-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">No products found</h3>
            <p className={`${currentStyles.secondaryText} mb-4`}>
              We couldn't find any products matching your current filters.
            </p>
            <button
              onClick={() => {
                setBtnFilter("All");
                setSearchQuery("");
                setPriceRange({ min: 0, max: 1000 });
              }}
              className={`${currentStyles.btn} bg-primary text-white border-primary hover:bg-primary/90`}
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Pagination info - showing X to Y of Z products */}
        {!isLoading && allFilteredProducts.length > 0 && (
          <div className={`text-sm ${currentStyles.secondaryText} mb-4`}>
            Showing {indexOfFirstProduct + 1} to{" "}
            {Math.min(indexOfLastProduct, allFilteredProducts.length)} of{" "}
            {allFilteredProducts.length} products
          </div>
        )}

        {/* Products grid/list */}
        <div
          className={`
          ${
            viewMode === "grid"
              ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4"
              : "flex flex-col gap-4"
          }
        `}
        >
          {isLoading
            ? // Skeleton loading state
              [...Array(productsPerPage)].map((_, index) => (
                <ProductSkeleton key={index} />
              ))
            : currentProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/ProductPage/${product.id}`}
                  className={`
                  ${currentStyles.card} 
                  rounded-lg overflow-hidden transition-all duration-300 
                  ${currentStyles.hoverEffect} 
                  ${viewMode === "grid" ? "" : "flex"}
                  cursor-pointer
                `}
                >
                  <div
                    className={`
                  relative overflow-hidden bg-gradient-to-b from-gray-100/5 to-transparent 
                  ${
                    viewMode === "grid"
                      ? "h-40 p-3"
                      : "h-32 w-32 md:w-48 md:h-48 p-2 flex-shrink-0"
                  }
                `}
                  >
                    <img
                      loading="lazy"
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-contain transition-transform duration-500 hover:scale-110"
                    />
                    <button
                      onClick={(e) => handleWishlistToggle(product, e)}
                      className={`absolute top-2 right-2 p-1.5 rounded-full ${
                        isDark ? "bg-gray-800/80" : "bg-gray-200/20"
                      } transition-colors duration-300 hover:bg-primary/10 cursor-pointer`}
                    >
                      <Heart
                        size={16}
                        fill={isInWishlist(product.id) ? "red" : "none"}
                        stroke={
                          isInWishlist(product.id) ? "red" : "currentColor"
                        }
                        strokeWidth={1.5}
                        className={
                          isInWishlist(product.id) ? "text-primary" : ""
                        }
                      />
                    </button>
                  </div>

                  <div
                    className={`p-3 flex flex-col ${
                      viewMode === "list" ? "flex-1" : ""
                    }`}
                  >
                    <div className="mb-1">
                      {renderRating(product.rating || 4.5)}
                    </div>
                    <h2 className="text-sm font-bold mb-1 line-clamp-1 hover:text-primary transition-colors">
                      {product.title}
                    </h2>

                    {viewMode === "list" && (
                      <p
                        className={`text-sm line-clamp-2 mb-2 ${currentStyles.secondaryText}`}
                      >
                        {product.description}
                      </p>
                    )}

                    {product.features && viewMode === "list" && (
                      <ul
                        className={`text-sm ${currentStyles.secondaryText} mb-4 ml-5 list-disc`}
                      >
                        {product.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="mb-1">
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div
                      className={`flex items-center justify-between mt-auto ${
                        viewMode === "list"
                          ? `pt-4 border-t ${currentStyles.divider}`
                          : ""
                      }`}
                    >
                      <div>
                        <p className="text-sm font-bold">${product.price}</p>
                        {product.oldPrice && (
                          <p
                            className={`text-xs line-through ${currentStyles.secondaryText}`}
                          >
                            ${product.oldPrice}
                          </p>
                        )}
                      </div>
                      <button
                        className={`p-1.5 rounded-full bg-primary ${
                          isDark ? "text-white" : "text-[#1e1e20]"
                        } hover:bg-primary/90 transition-colors`}
                        onClick={(e) => handleAddToCart(product, e)}
                        aria-label="Add to cart"
                      >
                        <ShoppingBag
                          size={17}
                          className="hover:scale-110 transition-transform cursor-pointer "
                        />
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
        </div>

        {/* Pagination */}
        {!isLoading && allFilteredProducts.length > 0 && (
          <div className="flex justify-center mt-12 mb-8">
            <div className="flex items-center gap-2">
              {/* Previous page button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                  currentStyles.pageBtn
                } ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                aria-label="Previous page"
              >
                <ChevronLeft size={18} />
              </button>

              {/* Page numbers */}
              {getPageNumbers().map((page, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                    page === currentPage
                      ? "bg-primary text-white cursor-pointer"
                      : page === "..."
                      ? "cursor-default"
                      : `${currentStyles.pageBtn}`
                  }`}
                  disabled={page === "..."}
                >
                  {page}
                </button>
              ))}

              {/* Next page button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                  currentStyles.pageBtn
                } ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                aria-label="Next page"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
