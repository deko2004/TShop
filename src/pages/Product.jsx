import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import ThemeContext from "../Context/ThemeContext";
import ProductContext from "../Context/ProductsContext";
import CartContext from "../Context/CartContext";
import WishContext from "../Context/WichContext";
import Reviews from "../components/Reviews";
import AdditionalInfo from "../components/AdditionalInfo";
import {
  Star,
  Heart,
  Share,
  Minus,
  Plus,
  ShoppingCart,
  Twitter,
  Facebook,
  Github,
  Truck,
  Clock,
  Shield,
  RotateCcw,
} from "lucide-react";
import { toast } from "react-toastify";

export default function Product() {
  const { products } = useContext(ProductContext);
  const { id } = useParams();
  const { theme } = useContext(ThemeContext);
  const { dispatch: cartDispatch } = useContext(CartContext);
  const { dispatch: wishDispatch, state: wishState } = useContext(WishContext);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("Description");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isDark = theme === "dark";

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

  useEffect(() => {
    if (products && products[id]) {
      setProduct(products[id]);
    }
    setLoading(false);
  }, [products, id]);

  if (loading) {
    return (
      <div
        className={`h-screen flex items-center justify-center ${
          isDark ? "bg-[#1e1e20] text-white" : "bg-white text-gray-800"
        }`}
      >
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div
        className={`h-screen flex items-center justify-center ${
          isDark ? "bg-[#1e1e20] text-white" : "bg-white text-gray-800"
        }`}
      >
        <div className="text-center">
          <p className="text-2xl font-bold mb-2">Product Not Found</p>
          <p className="text-gray-500">
            Sorry, we couldn't find the requested product
          </p>
        </div>
      </div>
    );
  }

  const {
    title,
    price,
    image,
    description,
    brand,
    category,
    rating,
    stock,
    sku,
    dimensions,
    weight,
    reviews,
  } = product;

  const handleQuantityChange = (value) => {
    setQuantity(Math.max(1, Math.min(10, value))); // Limit quantity between 1 and 10
  };

  const handleAddToCart = () => {
    cartDispatch({
      type: "addtocart",
      payload: {
        id: id,
        title,
        price,
        image,
        quantity,
      },
    });
    notify(`${quantity} Product added to cart`);
  };

  const isInWishlist = (productId) => {
    return wishState.some((item) => item.id === productId);
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

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div
      className={`min-h-screen ${
        isDark ? "bg-[#1e1e20] text-white" : "bg-white text-gray-800"
      } pt-20`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 rtl:space-x-reverse">
              <li>
                <a
                  href="#"
                  className={`${
                    isDark
                      ? "text-gray-400 hover:text-gray-300"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Home
                </a>
              </li>
              <li className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
                /
              </li>
              <li>
                <a
                  href="#"
                  className={`${
                    isDark
                      ? "text-gray-400 hover:text-gray-300"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  {category}
                </a>
              </li>
              <li className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
                /
              </li>
              <li>
                <span
                  className={`${
                    isDark ? "text-gray-200" : "text-gray-800"
                  } font-medium`}
                >
                  {brand}
                </span>
              </li>
            </ol>
          </nav>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image Section */}
          <div className="relative group">
            <div
              className={`rounded-2xl overflow-hidden ${
                isDark ? "bg-[#222222]" : "bg-gray-100"
              } p-8 shadow-lg transition-all duration-300 hover:shadow-xl relative`}
            >
              <img
                src={
                  product.images
                    ? product.images[currentImageIndex]
                    : product.image
                }
                alt={title}
                className="w-full h-auto object-contain transform transition-transform duration-700 group-hover:scale-105"
              />

              {stock <= 5 && stock > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Limited Quantity
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            <div className="mt-4 grid grid-cols-4 gap-2">
              {(product.images || [product.image]).map((img, index) => (
                <button
                  key={index}
                  onClick={() => handleImageClick(index)}
                  className={`p-2 rounded-md overflow-hidden ${
                    isDark
                      ? "bg-[#222222] hover:bg-[#2a2a2c]"
                      : "bg-gray-100 hover:bg-gray-200"
                  } border-2 ${
                    index === currentImageIndex
                      ? isDark
                        ? "border-blue-500"
                        : "border-blue-600"
                      : isDark
                      ? "border-transparent"
                      : "border-transparent"
                  } transition-all duration-300`}
                >
                  <img
                    src={img}
                    alt={`${title} view ${index + 1}`}
                    className="w-full h-auto object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details Section */}
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-4xl font-bold mb-4">{title}</h1>
              <div className="flex items-center gap-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      className={`w-5 h-5 ${
                        idx < Math.floor(rating)
                          ? "fill-yellow-400"
                          : "fill-gray-300"
                      }`}
                      fill={idx < Math.floor(rating) ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <span
                  className={`text-sm ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  ({reviews} Reviews)
                </span>
              </div>
            </div>

            {/* Stock Status */}
            <div
              className={`inline-flex items-center gap-2 py-1 px-3 rounded-full ${
                stock > 0
                  ? isDark
                    ? "bg-green-900/20 text-green-400"
                    : "bg-green-100 text-green-600"
                  : isDark
                  ? "bg-red-900/20 text-red-400"
                  : "bg-red-100 text-red-600"
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-current"></span>
              <span className="font-medium text-sm">
                {stock > 0 ? "In Stock" : "Out of Stock"}
                {stock > 0 && <span className="ml-1">({stock} pieces)</span>}
              </span>
            </div>

            <div
              className={`text-3xl font-bold ${
                isDark ? "text-blue-400" : "text-blue-600"
              }`}
            >
              ${price}
              <span
                className={`text-sm ml-2 line-through ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                ${(price * 1.2).toFixed(2)}
              </span>
            </div>

            {/* Product Details List */}
            <div
              className={`${
                isDark ? "bg-[#222222]" : "bg-gray-50"
              } p-4 rounded-lg`}
            >
              <div
                className={`${
                  isDark ? "text-gray-300" : "text-gray-700"
                } space-y-2`}
              >
                <p className="flex justify-between">
                  <span className="font-medium">Brand:</span>
                  <span>{brand}</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-medium">SKU:</span>
                  <span>{sku}</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-medium">Category:</span>
                  <span>{category}</span>
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <label className="font-medium block">Color:</label>
                <div className="flex gap-3">
                  {["Turquoise", "Onyx", "Ruby", "Emerald"].map(
                    (color, idx) => (
                      <button
                        key={color}
                        className={`w-10 h-10 rounded-full border-2 ${
                          idx === 0 ? "ring-2 ring-offset-2 ring-blue-500" : ""
                        } ${
                          isDark ? "border-gray-600" : "border-gray-300"
                        } hover:scale-110 transition-transform`}
                        style={{ backgroundColor: color.toLowerCase() }}
                      />
                    )
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <label className="font-medium block">Quantity:</label>
                <div
                  className={`inline-flex items-center border ${
                    isDark ? "border-gray-600" : "border-gray-300"
                  } rounded-lg overflow-hidden`}
                >
                  <button
                    className={`px-4 py-3 ${
                      isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                    } transition-colors`}
                    onClick={() => handleQuantityChange(quantity - 1)}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span
                    className={`w-16 text-center py-2 font-medium ${
                      isDark
                        ? "bg-[#1e1e20] border-x border-gray-600"
                        : "bg-white border-x border-gray-300"
                    }`}
                  >
                    {quantity}
                  </span>
                  <button
                    className={`px-4 py-3 ${
                      isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                    } transition-colors`}
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Add to Cart Button - Disable if out of stock */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleAddToCart}
                disabled={stock === 0}
                className={`flex-1 py-3 px-6 rounded-lg cursor-pointer flex justify-center items-center gap-2 ${
                  stock === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : isDark
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white transition-colors`}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>{stock === 0 ? "Out of Stock" : "Add to Cart"}</span>
              </button>
              <button
                onClick={(e) => handleWishlistToggle(product, e)}
                className={`p-3 rounded-lg border cursor-pointer ${
                  isDark
                    ? "border-gray-600 hover:bg-gray-800"
                    : "border-gray-300 hover:bg-gray-100"
                } transition-colors`}
              >
                <Heart
                  size={20}
                  fill={isInWishlist(product.id) ? "red" : "none"}
                  stroke={isInWishlist(product.id) ? "red" : "currentColor"}
                  strokeWidth={1.5}
                  className={`${
                    isInWishlist(product.id) ? "text-primary" : "text-gray-500"
                  }`}
                />
              </button>
            </div>

            {/* Shipping Info */}
            <div
              className={`${
                isDark ? "bg-[#222222]" : "bg-gray-50"
              } p-4 rounded-lg mt-4`}
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${
                      isDark ? "bg-blue-900/20" : "bg-blue-100"
                    }`}
                  >
                    <span
                      className={`${
                        isDark ? "text-blue-400" : "text-blue-600"
                      }`}
                    >
                      <Truck />
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">Free Shipping</p>
                    <p
                      className={`text-sm ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      For orders over $50
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${
                      isDark ? "bg-green-900/20" : "bg-green-100"
                    }`}
                  >
                    <span
                      className={`${
                        isDark ? "text-green-400" : "text-green-600"
                      }`}
                    >
                      <RotateCcw />
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">Free Returns</p>
                    <p
                      className={`text-sm ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Within 30 days of purchase
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-2 flex items-center">
              <span className="font-semibold mr-3">Share:</span>
              <div className="inline-flex items-center space-x-4 rtl:space-x-reverse">
                <a
                  href="#"
                  className={`${
                    isDark
                      ? "text-gray-400 hover:text-blue-400"
                      : "text-gray-600 hover:text-blue-600"
                  } transition-colors`}
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className={`${
                    isDark
                      ? "text-gray-400 hover:text-blue-400"
                      : "text-gray-600 hover:text-blue-600"
                  } transition-colors`}
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className={`${
                    isDark
                      ? "text-gray-400 hover:text-blue-400"
                      : "text-gray-600 hover:text-blue-600"
                  } transition-colors`}
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className={`${
                    isDark
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-200 hover:bg-gray-300"
                  } p-2 rounded-full transition-colors`}
                >
                  <Share className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Product Information Tabs */}
        <div className="mt-16">
          <div
            className={`border-b ${
              isDark ? "border-gray-700" : "border-gray-200"
            } mb-8`}
          >
            <div className="flex gap-8">
              {["Description", "Reviews", "Additional Information"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-2 font-medium border-b-2 cursor-pointer relative ${
                      tab === activeTab
                        ? isDark
                          ? "border-blue-500 text-blue-500"
                          : "border-blue-600 text-blue-600"
                        : "border-transparent"
                    } hover:text-blue-600 transition-colors`}
                  >
                    {tab}
                    {tab === "Reviews" && (
                      <span
                        className={`absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium ${
                          isDark
                            ? "bg-blue-500 text-white"
                            : "bg-blue-600 text-white"
                        }`}
                      >
                        {reviews}
                      </span>
                    )}
                  </button>
                )
              )}
            </div>
          </div>

          <div
            className={`mt-8 ${
              isDark ? "bg-[#222222]" : "bg-white"
            } p-6 rounded-lg shadow-sm`}
          >
            {activeTab === "Description" && (
              <>
                <h2 className="text-xl font-semibold mb-4">
                  Product Description
                </h2>
                <p
                  className={`${
                    isDark ? "text-gray-300" : "text-gray-700"
                  } leading-relaxed`}
                >
                  {description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div
                    className={`${
                      isDark ? "bg-[#1e1e20]" : "bg-gray-50"
                    } p-4 rounded-lg`}
                  >
                    <h3 className="font-semibold mb-3">Product Features</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            isDark ? "bg-blue-500" : "bg-blue-600"
                          }`}
                        ></span>
                        <span>Exclusively handmade</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            isDark ? "bg-blue-500" : "bg-blue-600"
                          }`}
                        ></span>
                        <span>Artistic gold charm</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            isDark ? "bg-blue-500" : "bg-blue-600"
                          }`}
                        ></span>
                        <span>Smooth semi-circular gemstones</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            isDark ? "bg-blue-500" : "bg-blue-600"
                          }`}
                        ></span>
                        <span>8mm size beads</span>
                      </li>
                    </ul>
                  </div>
                  <div
                    className={`${
                      isDark ? "bg-[#1e1e20]" : "bg-gray-50"
                    } p-4 rounded-lg`}
                  >
                    <h3 className="font-semibold mb-3">Care Instructions</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            isDark ? "bg-blue-500" : "bg-blue-600"
                          }`}
                        ></span>
                        <span>Keep away from water and moisture</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            isDark ? "bg-blue-500" : "bg-blue-600"
                          }`}
                        ></span>
                        <span>Avoid contact with perfumes and chemicals</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            isDark ? "bg-blue-500" : "bg-blue-600"
                          }`}
                        ></span>
                        <span>Clean with a soft, dry cloth</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            isDark ? "bg-blue-500" : "bg-blue-600"
                          }`}
                        ></span>
                        <span>Store in a cool, dry place</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            )}

            {activeTab === "Reviews" && (
              <Reviews
                rating={rating}
                reviews={reviews}
                isDark={isDark}
                productId={id}
              />
            )}

            {activeTab === "Additional Information" && (
              <AdditionalInfo
                product={{ dimensions, weight, category, brand, sku }}
                isDark={isDark}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
