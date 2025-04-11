"use client";

import React, { useState, useContext } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import ThemeContext from "../Context/ThemeContext";

// Example contact info array (adapt as needed)
const contactInfo = [
  { icon: Phone, text: "+1 234 567 890", label: "Phone" },
  { icon: Mail, text: "support@example.com", label: "Email" },
  { icon: MapPin, text: "123 Main Street, NY 10001", label: "Address" },
  { icon: Clock, text: "Mon-Fri: 9AM - 6PM", label: "Hours" },
];

export default function ContactPage() {
  // Theme handling
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  // Local state for submission and success messages
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Theme-based styles
  const styles = {
    container: isDark ? "bg-[#1e1e20] text-white" : "bg-white text-gray-900",
    card: isDark
      ? "bg-[#292929] hover:ring-2 ring-gray-700"
      : "bg-white border-gray-200",
    input: isDark
      ? "bg-[#222222]  text-white border-1"
      : "bg-white border-gray-300 text-gray-900 border-1",
    label: isDark ? "text-gray-300" : "text-gray-700",
    text: isDark ? "text-gray-400" : "text-gray-500",
    button: isDark
      ? "bg-[#1e1e20] border border-white text-white hover:bg-white hover:text-[#1e1e20]"
      : "bg-white border border-[#1e1e20] text-[#1e1e20] hover:bg-[#1e1e20] hover:text-white",
    successMsg: isDark
      ? "bg-green-900/20 text-green-400"
      : "bg-green-100 text-green-800",
  };

  // InfoCard component for each contact info item
  function InfoCard({ icon: Icon, title, content }) {
    return (
      <div
        className={`flex flex-col justify-center rounded-lg border p-4 shadow-sm transition-all duration-300 ${styles.card}`}
      >
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5" />
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <p className={`mt-1 text-sm ${styles.text}`}>{content}</p>
      </div>
    );
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    setIsSubmitting(true);

    // Simulate an async operation (e.g., an API call)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      e.target.reset();

      // Hide success message after 5s (optional)
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div
      className={`min-h-screen w-full flex flex-col pt-20 items-center ${styles.container}`}
    >
      {/* Page Header */}
      <div className="mb-12 m-5 text-center">
        <h1 className="mb-4 text-3xl font-bold md:text-4xl">Contact Us</h1>
        <p className={`mx-auto max-w-md ${styles.text}`}>
          Have questions or need assistance? We're here to help. Reach out to
          our team.
        </p>
      </div>

      <main className="container mx-auto mb-16 max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Left Column: Contact Form */}
          <div className={`rounded-lg border p-6 shadow-sm ${styles.card}`}>
            <h2 className="mb-1 text-2xl font-semibold">Send us a message</h2>
            <p className={`mb-6 text-sm ${styles.text}`}>
              Fill out the form below and we'll get back to you as soon as
              possible.
            </p>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Name Fields */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className={`mb-1 block text-sm font-medium ${styles.label}`}
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    placeholder="John"
                    className={`w-full rounded px-3 py-2 focus:outline-none focus:ring-2  ${styles.input}`}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className={`mb-1 block text-sm font-medium ${styles.label}`}
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    placeholder="Doe"
                    className={`w-full rounded px-3 py-2 focus:outline-none focus:ring-2  ${styles.input}`}
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className={`mb-1 block text-sm font-medium ${styles.label}`}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="john.doe@example.com"
                  className={`w-full rounded px-3 py-2 focus:outline-none focus:ring-2  ${styles.input}`}
                  required
                />
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className={`mb-1 block text-sm font-medium ${styles.label}`}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  placeholder="How can we help you?"
                  className={`w-full resize-none rounded px-3 py-2 focus:outline-none focus:ring-2  ${styles.input}`}
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex w-full items-center justify-center rounded px-4 py-2 focus:outline-none focus:ring-2  ${styles.button}`}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Send Message
                  </span>
                )}
              </button>
            </form>

            {/* Success Message */}
            {isSuccess && (
              <div
                className={`mt-4 flex items-center gap-2 rounded-lg p-4 ${styles.successMsg}`}
                role="alert"
                aria-live="polite"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <p className="font-medium">Message sent successfully!</p>
                  <p className="text-sm">
                    We'll get back to you as soon as possible.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Contact Info & Map */}
          <div className="space-y-6">
            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {contactInfo.map((item, index) => (
                <InfoCard
                  key={index}
                  icon={item.icon}
                  title={item.label}
                  content={item.text}
                />
              ))}
            </div>

            {/* Map Card */}
            <div className={`rounded-lg border shadow-sm ${styles.card}`}>
              <div className="px-6 pt-6">
                <h2 className="mb-1 text-xl font-semibold">Visit Our Store</h2>
                <p className={`mb-4 text-sm ${styles.text}`}>
                  Find us at our flagship location
                </p>
              </div>
              <div className="relative h-72 w-full overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425872426698!3d40.74076987138443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1710856896045!5m2!1sen!2sus"
                  className="absolute inset-0 h-full w-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Store Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
