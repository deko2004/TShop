import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Star, ShoppingCart } from "lucide-react";
import ThemeContext from "../Context/ThemeContext";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import img1 from "../assets/headphone1.webp";
import img2 from "../assets/headphone2.webp";
import img3 from "../assets/headphone4.webp";
import img4 from "../assets/airpod1.webp";
import img5 from "../assets/boat203-1.png";
import img6 from "../assets/sony10.png";

const products = [
  {
    id: 1,
    title: "Hoco EW61 Wireless Headphones",
    image: img1,
    description:
      "Experience crystal-clear sound with our Hoco EW61 wireless headphones.",
    price: 49.99,
  },
  {
    id: 2,
    title: "HOCO EW54 Noise-Cancelling Headphones",
    image: img2,
    description:
      "Immerse yourself in pure sound with our HOCO EW54 noise-cancelling headphones.",
    price: 69.99,
  },
  {
    id: 3,
    title: "AirPods 3 True Wireless Earbuds",
    image: img3,
    description:
      "Enjoy seamless music streaming with our AirPods 3 true wireless earbuds.",
    price: 99.99,
  },
  {
    id: 4,
    title: "HOCO EW61 Over-Ear Headphones",
    image: img4,
    description:
      "Get lost in your favorite tunes with our HOCO EW61 over-ear headphones.",
    price: 79.99,
  },
  {
    id: 5,
    title: "HOCO EW54 Sports Headphones",
    image: img5,
    description:
      "Stay motivated during your workouts with our HOCO EW54 sports headphones.",
    price: 59.99,
  },
  {
    id: 6,
    title: "Sony Wireless Headphones",
    image: img6,
    description:
      "Experience immersive sound with our Sony wireless headphones.",
    price: 39.99,
  },
  {
    id: 7,
    title: "Hoco EW61 Pro",
    image: img4,
    description:
      "Enjoy crystal-clear sound with our Hoco EW61 Pro wireless headphones.",
    price: 49.99,
  },
];

const FeutureSlider = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const styles = {
    container: isDark ? "bg-[#1e1e20]" : "bg-gray-50",
    card: isDark
      ? "bg-gradient-to-b from-gray-100/5 to-transparent"
      : "bg-gradient-to-b from-gray-100/5 to-transparent",
    imageContainer: isDark
      ? "bg-gradient-to-b from-gray-800/30 via-gray-800/20 to-transparent"
      : "bg-gradient-to-b from-gray-100/50 via-gray-50/30 to-transparent",
    title: isDark ? "text-white" : "text-gray-900",
    description: isDark ? "text-gray-300" : "text-gray-600",
    price: isDark ? "text-white" : "text-gray-900",
  };

  return (
    <div className={`${styles.container} py-16`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold ${styles.title} mb-4`}>
            Featured Products
          </h2>
          <p className={styles.description}>
            Discover our most popular audio devices
          </p>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 20 },
            640: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 40 },
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          loop={true}
          autoplay={{ delay: 1800, disableOnInteraction: false }}
          className="pb-12"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div
                className={`${styles.card} rounded-2xl overflow-hidden shadow-lg
                             transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
              >
                {/* Product Image */}
                <div className="relative group p-6 bg-gradient-to-b from-gray-100/5 to-transparent">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-48 w-full object-contain transform transition-transform duration-500 
                             group-hover:scale-110"
                  />
                </div>

                {/* Product Info */}
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3
                      className={`${styles.title} font-semibold truncate flex-1`}
                    >
                      {product.title}
                    </h3>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm">4.5</span>
                    </div>
                  </div>

                  <p className={`${styles.description} text-sm line-clamp-2`}>
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <div className="space-y-1">
                      <p className={`${styles.price} text-lg font-bold`}>
                        ${product.price}
                      </p>
                      <p className="text-green-500 text-xs">In Stock</p>
                    </div>
                    <button
                      className="bg-primary p-2 rounded-full text-white
                                     hover:bg-primary/90 transition-colors"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FeutureSlider;
