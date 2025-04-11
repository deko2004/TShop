import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import ThemeContext from "../Context/ThemeContext";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  MoveUp,
} from "lucide-react";

const paymentMethods = [
  {
    name: "PayPal",
    icon: "https://www.paypalobjects.com/digitalassets/c/website/logo/full-text/pp_fc_hl.svg",
  },
  {
    name: "Stripe",
    icon: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg",
  },
  {
    name: "Wise",
    icon: "https://wise.com/public-resources/assets/logos/wise/brand_logo.svg",
  },
];

const FooterSection = ({ title, children }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div>
      <h3
        className={`${
          theme === "dark" ? "text-white" : "text-gray-800"
        } text-lg font-semibold mb-4`}
      >
        {title}
      </h3>
      {children}
    </div>
  );
};

export default function Footer() {
  const { theme } = useContext(ThemeContext);
  const isdark = theme === "dark";
  const styles = {
    container:
      theme === "dark"
        ? "bg-[#1e1e20] text-gray-400"
        : "bg-gray-50 text-gray-600",
    input:
      theme === "dark"
        ? "bg-[#1e1e20] border-1 "
        : "bg-white border border-gray-200",
    heading: theme === "dark" ? "text-white" : "text-gray-800",
    border: theme === "dark" ? "border-gray-800" : "border-gray-200",
    link: `hover:text-primary transition-colors`,
    socialIcon: "w-5 h-5 hover:text-primary transition-colors",
    paymentIcon: theme === "dark" ? "bg-gray-600" : "bg-gray-200",
    paymentMethod: "p-2 rounded-lg hover:opacity-80 transition-opacity",
  };
  const moveupbtn = isdark
    ? "fixed bottom-8 right-8 cursor-pointer xl:hidden bg-[#262626] text-white p-3 rounded-full shadow-lg hover:bg-white hover:text-[#262662] transition-all flex items-center justify-center"
    : "fixed bottom-8 right-8  cursor-pointer xl:hidden bg-white text-[#262662] p-3 rounded-full shadow-lg hover:bg-[#1e1e20] hover:text-white transition-all flex items-center justify-center";
  const quickLinks = [
    { to: "/shop", label: "Products" },
    { to: "/categories", label: "Categories" },
    { to: "/deals", label: "Special Deals" },
    { to: "/trending", label: "Trending" },
    { to: "/new-arrivals", label: "New Arrivals" },
  ];

  const customerLinks = [
    { to: "/contact", label: "Contact Us" },
    { to: "/shipping", label: "Shipping Policy" },
    { to: "/returns", label: "Returns & Exchanges" },
    { to: "/faq", label: "FAQs" },
    { to: "/about", label: "About Us" },
  ];

  // State for newsletter subscription message
  const [newsletterMsg, setNewsletterMsg] = useState("");

  // Handle newsletter subscription without page refresh
  const handleSubscribe = (e) => {
    e.preventDefault();
    // Simulate an async subscription process
    setNewsletterMsg("Subscription successful!");
    e.target.reset();
    // Clear the message after 5 seconds
    setTimeout(() => {
      setNewsletterMsg("");
    }, 5000);
  };

  return (
    <footer className={styles.container}>
      {/* Newsletter Section */}
      <div className={`border-b ${styles.border}`}>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className={`${styles.heading} text-xl font-semibold`}>
                Subscribe to our Newsletter
              </h3>
              <p className="text-sm mt-1">Get the latest updates and offers</p>
            </div>
            <div className="w-full md:w-auto">
              <form
                className="flex gap-2 flex-wrap md:flex-nowrap"
                onSubmit={handleSubscribe}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`${styles.input} px-4 py-2 rounded-lg flex-1 md:w-[300px] focus:outline-none focus:ring-1 focus:ring-primary`}
                  required
                />
                <button className="bg-primary px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                  Subscribe
                </button>
              </form>
              {/* Display success message */}
              {newsletterMsg && (
                <p className="mt-2 text-sm text-green-600">{newsletterMsg}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <FooterSection title="AudioTech">
            <p className="text-sm mb-4">
              Your one-stop destination for premium audio equipment.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+1 234 567 890</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span className="text-sm">support@audiotech.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">123 Audio Street, NY 10001</span>
              </div>
            </div>
          </FooterSection>

          {/* Quick Links */}
          <FooterSection title="Quick Links">
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={`text-sm ${styles.link}`}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterSection>

          {/* Customer Service */}
          <FooterSection title="Customer Service">
            <ul className="space-y-2">
              {customerLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={`text-sm ${styles.link}`}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterSection>

          {/* Connect */}
          <FooterSection title="Connect With Us">
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <a key={index} href="#" className={styles.socialIcon}>
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            <div className="mt-6">
              <h4 className={`${styles.heading} text-md font-semibold mb-4`}>
                Secured Payment Methods
              </h4>
              <div className="flex flex-wrap gap-3">
                {paymentMethods.map((method) => (
                  <div
                    key={method.name}
                    className={styles.paymentMethod}
                    title={method.name}
                  >
                    <img
                      src={method.icon}
                      alt={method.name}
                      className="h-6 w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
            <button
              className={moveupbtn}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              title="Back to Top"
            >
              <MoveUp className="w-5 h-5" />
            </button>
          </FooterSection>
        </div>

        {/* Bottom Bar */}
        <div
          className={`mt-12 pt-4 border-t ${styles.border} text-center text-sm`}
        >
          <p>© 2024 Tshop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
