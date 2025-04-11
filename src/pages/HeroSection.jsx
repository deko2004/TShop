import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import ThemeContext from "../Context/ThemeContext";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import img1 from "../assets/head2.png";
import img2 from "../assets/boat203-1.png";
import img3 from "../assets/laptop1.webp";

// Centralized color configuration defined inside the file.
const colorConfig = {
  dark: {
    textll: "text-white",
    mainContainer: "bg-[#1e1e20]",
    heroTitle: "text-white",
    heroSubtitle: "text-gray-300",
    sliderBg: "bg-gradient-to-b from-gray-100/5 to-transparent",
    sliderTitle: "text-white",
    sliderDesc: "text-gray-300",
    sliderPrice: "text-primary text-2xl font-bold text-white",
    statsCard: "bg-gradient-to-b from-gray-100/5 to-transparent text-white",
    statsLabel: "text-gray-400",
    btn: "bg-primary text-white px-4 py-2 flex items-center gap-1 border rounded-lg hover:scale-105 transition-transform",
  },
  light: {
    textll: "text-gray-800",
    mainContainer: "bg-gray-50",
    heroTitle: "text-gray-900",
    heroSubtitle: "text-gray-600",
    sliderBg: "bg-white",
    sliderTitle: "text-gray-900",
    sliderDesc: "text-gray-600",
    sliderPrice: "text-primary text-2xl font-bold",
    statsCard: "bg-white",
    statsLabel: "text-gray-500",
    btn: "bg-primary text-black px-4 py-2 flex items-center gap-1 border rounded-lg hover:scale-105 transition-transform",
  },
};

const categories = [
  {
    id: 1,
    name: "Premium Headphones",
    img: img1,
    description: "Immerse yourself in crystal-clear sound",
    price: "From $99",
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    img: img2,
    description: "Experience true wireless freedom",
    price: "From $79",
  },
  {
    id: 3,
    name: "Latest Laptops",
    img: img3,
    description: "Power and portability combined",
    price: "From $899",
  },
];

export default function HeroSection() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  // Use the color configuration based on the current theme.
  const colors = colorConfig[isDark ? "dark" : "light"];

  return (
    <div className={`${colors.mainContainer} pt-18 min-h-[calc(100vh-64px)] `}>
      <div className="container mx-auto px-4">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto py-4 md:py-8 space-y-2 md:space-y-4">
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-bold ${colors.heroTitle}`}
          >
            Discover the Latest in
            <span className="text-primary block mt-1 md:mt-2">
              Modern Technology
            </span>
          </h1>
          <p className={`text-base md:text-lg ${colors.heroSubtitle} px-2`}>
            Explore our curated collection of premium products designed for your
            lifestyle
          </p>
        </div>

        {/* Featured Products Slider */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          className="mt-4 md:mt-8 rounded-xl md:rounded-2xl overflow-hidden"
        >
          {categories.map((category) => (
            <SwiperSlide key={category.id}>
              <div
                className={`${colors.sliderBg} relative overflow-hidden group`}
              >
                <div className="flex flex-col md:flex-row items-center p-4 md:p-8 lg:p-12">
                  <div className="w-full md:w-1/2 flex flex-col items-center md:items-start space-y-3 md:space-y-4">
                    <h2
                      className={`text-2xl sm:text-3xl md:text-4xl font-bold ${colors.sliderTitle} text-center md:text-left`}
                    >
                      {category.name}
                    </h2>
                    <p
                      className={`${colors.sliderDesc} text-sm sm:text-base md:text-lg text-center md:text-left`}
                    >
                      {category.description}
                    </p>
                    <p className={`${colors.sliderPrice} text-xl md:text-2xl`}>
                      {category.price}
                    </p>
                    <div className="w-full flex justify-center md:justify-start mt-2">
                      <Link to="/shop">
                        <button
                          className={`${colors.btn} text-sm md:text-base px-3 py-1.5 md:px-4 md:py-2`}
                        >
                          <span className="font-medium">Shop Now</span>
                          <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 flex justify-center mt-6 md:mt-0">
                    <img
                      src={category.img}
                      alt={category.name}
                      className="h-32 sm:h-40 md:h-60 lg:h-80 object-contain transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Stats Section */}
        <div className="grid grid-cols-3 sm:grid-cols-3 gap-3 md:gap-4 mt-8 md:mt-12">
          {[
            { number: "10K+", label: "Products" },
            { number: "15K+", label: "Customers" },
            { number: "4.9/5", label: "Rating" },
          ].map((stat, index) => (
            <div
              key={index}
              className={`${colors.statsCard} p-3 md:p-4 rounded-xl shadow-sm text-center`}
            >
              <div className="text-xl md:text-2xl font-bold text-primary">
                {stat.number}
              </div>
              <div className={`text-xs md:text-sm ${colors.statsLabel}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
