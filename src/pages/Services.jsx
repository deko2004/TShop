import { useContext } from "react";
import { Truck, Clock, Shield, RotateCcw } from "lucide-react";
import ThemeContext from "../Context/ThemeContext";

// Reusable Service Card Component
const ServiceCard = ({ icon: Icon, title, description }) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const styles = {
    card: `p-6 rounded-xl ${isDark ? "bg-[#1e1e20]" : "bg-white"}
           border ${isDark ? "border-white" : "border-gray-200"}
           hover:border-primary transition-all duration-300 group`,
    icon: isDark
      ? "w-8 h-8 group-hover:scale-110 transition-transform text-white"
      : "w-8 h-8 group-hover:scale-110 transition-transform text-gray-800",
    title: `text-lg font-semibold mb-2 ${
      isDark ? "text-white" : "text-gray-800"
    }`,
    description: `text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`,
  };

  return (
    <div className={styles.card}>
      <div className="mb-4 ">
        <Icon className={styles.icon} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

// Main Services Component
export default function Services() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const styles = {
    container: isDark ? "bg-[#1e1e20]" : "bg-white",
    heading: isDark ? "text-white" : "text-gray-900",
    subtext: isDark ? "text-gray-400" : "text-gray-600",
  };

  const services = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Free shipping on all orders over $50",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock customer support",
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Protected by industry-leading security",
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description: "30-day money-back guarantee",
    },
  ];

  return (
    <section className={styles.container}>
      <div className="container mx-auto px-4 py-16">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h1 className={`text-4xl font-bold mb-4 ${styles.heading}`}>
            Our Services
          </h1>
          <p className={`max-w-2xl mx-auto ${styles.subtext}`}>
            Discover our comprehensive range of services designed to provide you
            with the best audio experience
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
