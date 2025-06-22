import { createContext } from "react";
import img1 from "../assets/headphone1.webp";
import img2 from "../assets/headphone2.webp";
import head2 from "../assets/head2.png";
import head3 from "../assets/Airpods3.webp";

import img3 from "../assets/headphone4.webp";
import img4 from "../assets/airpod1.webp";
import img5 from "../assets/boat203-1.png";
import img6 from "../assets/sony10.png";
import img7 from "../assets/keyboard1.webp";
import g512 from "../assets/souris1.webp";
import img9 from "../assets/laptop1.webp";
import img10 from "../assets/key1.png";
import img11 from "../assets/laptop2.png";
import img12 from "../assets/laptop3.png";
import img13 from "../assets/lapptop4.png";
import img14 from "../assets/soris1.png";
import img15 from "../assets/robot1.png";
import g5121 from "../assets/g502-1.jpg";
import g5122 from "../assets/g502-2.jpg";
import g5123 from "../assets/g502-3.jpg";
import h1 from "../assets/h1.png";
import swatch from "../assets/smartwatch.png";
import mac from "../assets/macbook_image.png";
import canon from "../assets/canon.png";
import ps5 from "../assets/ps5.png";
import proj from "../assets/proj.png";

const products = [
  {
    id: 0,
    title: "Apple AirPods Pro 2nd gen",
    image: h1,
    images: [h1],
    type: "headphone",
    description:
      "Apple AirPods Pro (2nd Gen) with MagSafe Case (USB-C) provide excellent sound, active noise cancellation, and a comfortable fit. The USB-C case ensures quick charging, and they pair seamlessly with Apple devices for an effortless audio experience..",
    price: 49.99,
    brand: "Apple",
    category: "Audio & Headphones",
    rating: 4.8,
    stock: 5,
    sku: "APMX-100",
    dimensions: "7.4 x 3.3 x 6.6 in",
    weight: "0.85 lbs",
    reviews: 10,
  },
  {
    id: 1,
    title: "HOCO EW54 Noise-Cancelling",
    image: img2,
    images: [img2, img1, head2, head3],
    type: "headphone",
    description:
      "Immerse yourself in pure sound with our HOCO EW54 noise-cancelling headphones.",
    price: 69.99,
    brand: "HOCO",
    category: "Audio & Headphones",
    rating: 4.4,
    stock: 12,
    sku: "HOCO-54",
    dimensions: "6.8 x 3.0 x 7.1 in",
    weight: "0.70 lbs",
    reviews: 8,
  },
  {
    id: 2,
    title: "AirPods 3 True Wireless Earbuds",
    image: img3,
    images: [img3],
    type: "headphone",
    description:
      "Enjoy seamless music streaming with our AirPods 3 true wireless earbuds.",
    price: 99.99,
    brand: "Apple",
    category: "Earbuds",
    rating: 4.7,
    stock: 20,
    sku: "AP3-001",
    dimensions: "1.2 x 0.9 x 1.8 in",
    weight: "0.10 lbs",
    reviews: 15,
  },
  {
    id: 3,
    title: "HOCO EW61 Over-Ear Headphones",
    image: img4,
    images: [img4],
    type: "airphone",
    description:
      "Get lost in your favorite tunes with our HOCO EW61 over-ear headphones.",
    price: 79.99,
    brand: "HOCO",
    category: "Audio & Headphones",
    rating: 4.3,
    stock: 7,
    sku: "HOCO-61",
    dimensions: "7.5 x 3.2 x 6.8 in",
    weight: "0.75 lbs",
    reviews: 4,
  },
  {
    id: 4,
    title: "HOCO EW54 Sports Headphones",
    image: img5,
    images: [img5],
    type: "airphone",
    description:
      "Stay motivated during your workouts with our HOCO EW54 sports headphones.",
    price: 59.99,
    brand: "HOCO",
    category: "Audio & Headphones",
    rating: 4.1,
    stock: 15,
    sku: "HOCO-54SP",
    dimensions: "6.5 x 2.9 x 7.0 in",
    weight: "0.65 lbs",
    reviews: 6,
  },
  {
    id: 5,
    title: "Sony Wireless Headphones",
    image: img6,
    images: [img6],
    type: "airphone",
    description:
      "Experience immersive sound with our Sony wireless headphones.",
    price: 39.99,
    brand: "Sony",
    category: "Audio & Headphones",
    rating: 4.2,
    stock: 9,
    sku: "SONY-WH",
    dimensions: "7.0 x 3.0 x 7.5 in",
    weight: "0.80 lbs",
    reviews: 12,
  },
  {
    id: 6,
    title: "Gaming Keyboard",
    image: img7,
    images: [img7],
    type: "accessories",
    description:
      "Improve your gaming performance with our high-quality gaming keyboard.",
    price: 129.99,
    brand: "Logitech",
    category: "Accessories",
    rating: 4.6,
    stock: 10,
    sku: "LG-GKB",
    dimensions: "17.5 x 5.0 x 1.5 in",
    weight: "1.25 lbs",
    reviews: 14,
  },
  {
    id: 7,
    title: "Gaming Mouse",
    image: g512,
    images: [g512, g5121, g5123, g5122],
    type: "accessories",
    description:
      "Improve your gaming performance with our high-quality gaming mouse.",
    price: 129.99,
    brand: "Logitech",
    category: "Accessories",
    rating: 4.7,
    stock: 16,
    sku: "LG-GM",
    dimensions: "5.0 x 2.5 x 1.5 in",
    weight: "0.20 lbs",
    reviews: 11,
  },
  {
    id: 8,
    title: "Dell Inspiron 15",
    image: img9,
    images: [img9],
    type: "laptop",
    description:
      "Improve your gaming performance with our high-quality gaming laptop.",
    price: 1489.99,
    brand: "Asus",
    category: "Laptop",
    rating: 4.8,
    stock: 5,
    sku: "ASUS-GL",
    dimensions: "14.2 x 10.5 x 0.9 in",
    weight: "4.5 lbs",
    reviews: 20,
  },
  {
    id: 9,
    title: "Gaming Keyboard",
    image: img10,
    images: [img10],
    type: "accessories",
    description:
      "Improve your gaming performance with our high-quality gaming keyboard.",
    price: 159.99,
    brand: "Razer",
    category: "Accessories",
    rating: 4.5,
    stock: 8,
    sku: "RZR-GKB",
    dimensions: "18.0 x 6.0 x 1.4 in",
    weight: "1.30 lbs",
    reviews: 9,
  },

  {
    id: 10,
    title: "MacBook Pro 16-inch",
    image: img11,
    images: [img11],
    type: "laptop",
    description:
      "The MacBook Pro 16-inch delivers powerful performance with the Apple M2 Pro or M2 Max chip, a stunning Retina display, and long battery life.",
    price: 2399.99,
    brand: "Apple",
    category: "Laptop",
    rating: 4.9,
    stock: 8,
    sku: "MBP-16-M2",
    dimensions: "14.01 x 9.77 x 0.66 in",
    weight: "4.7 lbs",
    reviews: 35,
  },

  {
    id: 11,
    title: "Asus ROG Zephyrus G14",
    image: img12,
    images: [img12],
    type: "laptop",
    description:
      "The Asus ROG Zephyrus G14 gaming laptop features an AMD Ryzen 9 processor, NVIDIA RTX 4060 graphics, and a 165Hz display for ultra-smooth performance.",
    price: 1699.99,
    brand: "Asus",
    category: "Gaming Laptop",
    rating: 4.7,
    stock: 10,
    sku: "ROG-G14-4060",
    dimensions: "12.76 x 8.66 x 0.78 in",
    weight: "3.64 lbs",
    reviews: 50,
  },

  {
    id: 12,
    title: "MacBook Air 13-inch",
    image: img13,
    images: [img13],
    type: "laptop",
    description:
      "The MacBook Air 13-inch with the M2 chip offers fast performance, a sleek design, and a high-resolution Liquid Retina display.",
    price: 1199.99,
    brand: "Apple",
    category: "Laptop",
    rating: 4.8,
    stock: 12,
    sku: "MBA-13-M2",
    dimensions: "11.97 x 8.46 x 0.44 in",
    weight: "2.7 lbs",
    reviews: 40,
  },
  {
    id: 13,
    title: "Logitech MX Master 3S",
    image: img14,
    images: [img14],
    type: "accessories",
    description:
      "Advanced wireless mouse with ergonomic design and precise tracking.",
    price: 99.99,
    brand: "Logitech",
    category: "Accessories",
    rating: 4.8,
    stock: 20,
    sku: "LOG-MX3S",
    dimensions: "4.9 x 3.3 x 2.0 in",
    weight: "0.3 lbs",
    reviews: 45,
  },
  {
    id: 14,
    title: "Eilic Robot",
    image: img15,
    images: [img15],
    type: "accessories",
    description:
      " Smart robot with advanced AI features and interactive capabilities.",
    price: 299.99,
    brand: "Logitech",
    category: "Accessories",
    rating: 5,
    stock: 10,
    sku: "LOG-MX3S",
    dimensions: "4.9 x 3.3 x 2.0 in",
    weight: "0.2 lbs",
    reviews: 25,
  },
  {
    id: 15,
    title: "Garmin Venu 2",
    image: swatch,
    images: [swatch],
    type: "accessories",
    description:
      " The Garmin Venu 2 smartwatch blends advanced fitness tracking with sophisticated design, offering a wealth of features such as heart rate monitoring, GPS, and sleep tracking. Built with a 24-hour battery life, this watch is ideal for fitness enthusiasts and anyone looking to enhance their daily lifestyle. With a stunning AMOLED display and customizable watch faces, the Venu 2 combines technology with style seamlessly.",
    price: 349.99,
    brand: "Garmin",
    category: "Accessories",
    rating: 4.5,
    stock: 10,
    sku: "LOG-MX3S",
    dimensions: "4.9 x 3.3 x 2.0 in",
    weight: "0.2 lbs",
    reviews: 13,
  },
  {
    id: 16,
    title: "MacBook Pro 16",
    image: mac,
    images: [mac],
    type: "Laptop",
    description:
      " The MacBook Pro 16, powered by Apple's M2 Pro chip, offers outstanding performance with 16GB RAM and a 512GB SSD. Whether you're editing high-resolution video, developing software, or multitasking with ease, this laptop can handle the toughest tasks. It features a stunning Retina display with True Tone technology, making it a top choice for professionals in creative industries or anyone who demands premium performance in a portable form.",
    price: 2249.99,
    brand: "Apple",
    category: "Laptop",
    rating: 4.5,
    stock: 10,
    sku: "LOG-MX3S",
    dimensions: "4.9 x 3.3 x 2.0 in",
    weight: "0.2 lbs",
    reviews: 13,
  },
  {
    id: 17,
    title: "Canon EOS R5",
    image: canon,
    images: [canon],
    type: "Accessories",
    description:
      " The Canon EOS R5 is a game-changing mirrorless camera with a 45MP full-frame sensor, offering ultra-high resolution and the ability to shoot 8K video. Whether you're capturing professional-quality stills or cinematic video footage, this camera delivers exceptional clarity, speed, and color accuracy. With advanced autofocus and in-body stabilization, the R5 is ideal for photographers and videographers alike.",
    price: 1499.99,
    brand: "Canon",
    category: "camera",
    rating: 4.5,
    stock: 10,
    sku: "LOG-MX3S",
    dimensions: "4.9 x 3.3 x 2.0 in",
    weight: "0.2 lbs",
    reviews: 13,
  },
  {
    id: 18,
    title: "PlayStation 5",
    image: ps5,
    images: [ps5],
    type: "Laptop",
    description:
      "The PlayStation 5 takes gaming to the next level with ultra-HD graphics, a powerful 825GB SSD, and ray tracing technology for realistic visuals. Whether you're into high-action games or immersive storytelling, the PS5 delivers fast loading times, seamless gameplay, and stunning visuals. It's a must-have for any serious gamer looking for the ultimate gaming experience.",
    price: 599.99,
    brand: "Sony",
    category: "Laptop",
    rating: 4.5,
    stock: 10,
    sku: "LOG-MX3S",
    dimensions: "4.9 x 3.3 x 2.0 in",
    weight: "0.2 lbs",
    reviews: 13,
  },
  {
    id: 19,
    title: "Samsung Projector 4k",
    image: proj,
    images: [proj],
    type: "Accessories",
    description:
      "The Samsung 4K Projector offers an immersive cinematic experience with ultra-high-definition visuals and realistic color accuracy. Equipped with a built-in speaker, it delivers rich sound quality to complement its stunning 4K resolution. Perfect for movie nights, gaming, or presentations, this projector is the ultimate choice for creating an at-home theater experience or professional setting.",
    price: 79.99,
    brand: "Samsung",
    category: "Accessories",
    rating: 4.5,
    stock: 10,
    sku: "LOG-MX3S",
    dimensions: "4.9 x 3.3 x 2.0 in",
    weight: "0.2 lbs",
    reviews: 13,
  },
];

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
