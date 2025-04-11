import { useContext, useState, useEffect } from "react";
import ThemeContext from "../Context/ThemeContext";
import {
  User,
  ShoppingBag,
  Settings,
  Edit,
  Camera,
  Search,
  Bell,
  Heart,
  LogOut,
  CreditCard,
  Shield,
  Clock,
  Download,
  ExternalLink,
} from "lucide-react";
import avatar from "../assets/avatar.jpg";

export default function ProfilePage() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editedUser, setEditedUser] = useState(null);
  const [notification, setNotification] = useState(null);

  // Dummy user data - in a real app this would come from your auth context/API
  const user = {
    name: "deko midorea",
    email: "deko19@gmail.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, Anytown, ST 12345",
    joined: "January 2024",
    profileCompletion: 70,
    orders: [
      {
        id: "#12345",
        date: "2024-03-10",
        total: "$299.99",
        status: "Delivered",
        items: 3,
        trackingNumber: "TRK72891234",
      },
      {
        id: "#12347",
        date: "2024-03-18",
        total: "$148.99",
        status: "Processing",
        items: 2,
        trackingNumber: "TRK72891236",
      },
      {
        id: "#12348",
        date: "2024-03-19",
        total: "$78.99",
        status: "Processing",
        items: 1,
        trackingNumber: "TRK72891237",
      },
    ],
    wishlist: [
      { id: "wl1", name: "Smart Watch", price: "$199.99" },
      { id: "wl2", name: "Wireless Headphones", price: "$149.99" },
    ],
    savedAddresses: [
      {
        id: "addr1",
        label: "Home",
        address: "123 Main Street, Anytown, ST 12345",
      },
      {
        id: "addr2",
        label: "Work",
        address: "456 Office Blvd, Worktown, ST 12345",
      },
    ],
    paymentMethods: [
      { id: "pm1", type: "Visa", last4: "4242", expiry: "12/25" },
      { id: "pm2", type: "Mastercard", last4: "8888", expiry: "06/26" },
    ],
  };

  useEffect(() => {
    if (user && !editedUser) {
      setEditedUser({ ...user });
    }
  }, [user]);

  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "orders", label: "Orders", icon: ShoppingBag },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "payment", label: "Payment", icon: CreditCard },
    { id: "security", label: "Security", icon: Shield },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const styles = {
    container: isDark ? "bg-[#1e1e20] text-white" : "bg-gray-50 text-gray-900",
    card: isDark ? "bg-[#292929]" : "bg-white",
    input: isDark
      ? "bg-[#1e1e20] border-gray-700 text-white"
      : "bg-white border-gray-300 text-gray-900",
    tab: (isActive) =>
      `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
        isActive
          ? isDark
            ? "bg-blue-600 text-white"
            : "bg-blue-600 text-white"
          : isDark
          ? "text-gray-400 hover:text-white"
          : "text-gray-600 hover:text-gray-900"
      }`,
    button: isDark
      ? "bg-blue-600 hover:bg-blue-700 text-white"
      : "bg-blue-600 hover:bg-blue-700 text-white",
    secondaryButton: isDark
      ? "bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white"
      : "bg-gray-200 hover:bg-gray-300 text-gray-800",
    progressBg: isDark ? "bg-gray-700" : "bg-gray-200",
    progressFill: "bg-blue-600",
  };

  const handleSaveChanges = () => {
    // In real app, would call API to update user info
    setIsEditMode(false);
    showNotification("Profile information updated successfully!");
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const filterOrders = () => {
    if (!searchTerm) return user.orders;
    return user.orders.filter(
      (order) =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.date.includes(searchTerm) ||
        order.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className={`min-h-screen pt-20 pb-12 ${styles.container}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Notification */}
        {notification && (
          <div className="fixed top-24 right-4 max-w-sm bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg z-50 animate-fade-in-out">
            {notification}
          </div>
        )}

        {/* Profile Header */}
        <div className={`${styles.card} rounded-xl p-6 mb-6 shadow-sm`}>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative">
              <img
                src={avatar}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-blue-600"
              />
              <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <div className="mt-2 sm:mt-0 flex items-center space-x-2">
                  <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                    <Bell className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                {user.email}
              </p>
              <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                Member since {user.joined}
              </p>

              <div className="mt-3">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">
                    Profile Completion
                  </span>
                  <span className="text-sm">{user.profileCompletion}%</span>
                </div>
                <div className={`w-full h-2 rounded-full ${styles.progressBg}`}>
                  <div
                    className={`h-2 rounded-full ${styles.progressFill}`}
                    style={{ width: `${user.profileCompletion}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <nav className={`${styles.card} rounded-xl p-4 shadow-sm`}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${styles.tab(
                    activeTab === tab.id
                  )} w-full mb-2 cursor-pointer`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <div className={`${styles.card} rounded-xl p-6 shadow-sm`}>
              {activeTab === "personal" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                      Personal Information
                    </h2>
                    {!isEditMode ? (
                      <button
                        onClick={() => setIsEditMode(true)}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => setIsEditMode(false)}
                          className={`px-3 py-1 rounded-lg ${styles.secondaryButton}`}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveChanges}
                          className={`px-3 py-1 rounded-lg ${styles.button}`}
                        >
                          Save Changes
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        className={isDark ? "text-gray-400" : "text-gray-600"}
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={editedUser?.name || ""}
                        onChange={(e) =>
                          setEditedUser({ ...editedUser, name: e.target.value })
                        }
                        className={`${styles.input} w-full mt-1 p-2 rounded-lg border`}
                        readOnly={!isEditMode}
                      />
                    </div>
                    <div>
                      <label
                        className={isDark ? "text-gray-400" : "text-gray-600"}
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        value={editedUser?.email || ""}
                        onChange={(e) =>
                          setEditedUser({
                            ...editedUser,
                            email: e.target.value,
                          })
                        }
                        className={`${styles.input} w-full mt-1 p-2 rounded-lg border`}
                        readOnly={!isEditMode}
                      />
                    </div>
                    <div>
                      <label
                        className={isDark ? "text-gray-400" : "text-gray-600"}
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={editedUser?.phone || ""}
                        onChange={(e) =>
                          setEditedUser({
                            ...editedUser,
                            phone: e.target.value,
                          })
                        }
                        className={`${styles.input} w-full mt-1 p-2 rounded-lg border`}
                        readOnly={!isEditMode}
                      />
                    </div>
                    <div>
                      <label
                        className={isDark ? "text-gray-400" : "text-gray-600"}
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        value={editedUser?.address || ""}
                        onChange={(e) =>
                          setEditedUser({
                            ...editedUser,
                            address: e.target.value,
                          })
                        }
                        className={`${styles.input} w-full mt-1 p-2 rounded-lg border`}
                        readOnly={!isEditMode}
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-semibold mb-3">Saved Addresses</h3>
                    <div className="space-y-3">
                      {user.savedAddresses.map((address) => (
                        <div
                          key={address.id}
                          className={`p-3 rounded-lg border ${
                            isDark ? "border-gray-700" : "border-gray-300"
                          }`}
                        >
                          <div className="flex justify-between">
                            <span className="font-medium">{address.label}</span>
                            <button className="text-blue-600">
                              <Edit className="w-4 h-4" />
                            </button>
                          </div>
                          <p
                            className={`mt-1 ${
                              isDark ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            {address.address}
                          </p>
                        </div>
                      ))}
                      <button
                        className={`w-full py-2 mt-3 rounded-lg border border-dashed ${
                          isDark
                            ? "border-gray-700 hover:border-gray-500"
                            : "border-gray-300 hover:border-gray-400"
                        } flex items-center justify-center`}
                      >
                        <span>Add New Address</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "orders" && (
                <div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                    <h2 className="text-xl font-semibold">Order History</h2>
                    <div className="mt-2 sm:mt-0 relative">
                      <input
                        type="text"
                        placeholder="Search orders"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={`${styles.input} pl-9 pr-3 py-2 rounded-lg border`}
                      />
                      <Search className="absolute left-3 top-2.5 w-4 h-4" />
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr
                          className={isDark ? "text-gray-400" : "text-gray-600"}
                        >
                          <th className="text-left py-3">Order ID</th>
                          <th className="text-left py-3">Date</th>
                          <th className="text-left py-3">Items</th>
                          <th className="text-left py-3">Total</th>
                          <th className="text-left py-3">Status</th>
                          <th className="text-left py-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filterOrders().map((order) => (
                          <tr
                            key={order.id}
                            className={`border-t ${
                              isDark ? "border-gray-700" : "border-gray-200"
                            }`}
                          >
                            <td className="py-3">{order.id}</td>
                            <td className="py-3">{order.date}</td>
                            <td className="py-3">{order.items} items</td>
                            <td className="py-3">{order.total}</td>
                            <td className="py-3">
                              <span
                                className={`px-2 py-1 rounded-full text-sm ${
                                  order.status === "Delivered"
                                    ? "bg-green-100 text-green-800"
                                    : order.status === "Processing"
                                    ? "bg-blue-100 text-blue-800"
                                    : order.status === "Cancelled"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {order.status}
                              </span>
                            </td>
                            <td className="py-3">
                              <div className="flex space-x-2">
                                <button
                                  className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                                  title="Track Order"
                                >
                                  <Clock className="w-4 h-4" />
                                </button>
                                <button
                                  className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                                  title="Download Invoice"
                                >
                                  <Download className="w-4 h-4" />
                                </button>
                                <button
                                  className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                                  title="View Details"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {filterOrders().length === 0 && (
                    <div className="text-center py-8">
                      <p>No orders found matching your search.</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "wishlist" && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">My Wishlist</h2>
                  {user.wishlist.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {user.wishlist.map((item) => (
                        <div
                          key={item.id}
                          className={`flex justify-between items-center p-4 rounded-lg ${
                            isDark
                              ? "border border-gray-700"
                              : "border border-gray-200"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-12 h-12 rounded ${
                                isDark ? "bg-gray-700" : "bg-gray-200"
                              } flex items-center justify-center`}
                            >
                              <ShoppingBag className="w-6 h-6" />
                            </div>
                            <div>
                              <h3 className="font-medium">{item.name}</h3>
                              <p
                                className={
                                  isDark ? "text-gray-400" : "text-gray-600"
                                }
                              >
                                {item.price}
                              </p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              className={`px-3 py-1 rounded-lg ${styles.button}`}
                            >
                              Add to Cart
                            </button>
                            <button
                              className={`p-1 rounded-lg ${
                                isDark
                                  ? "bg-gray-700 hover:bg-gray-600"
                                  : "bg-gray-200 hover:bg-gray-300"
                              }`}
                            >
                              <Heart
                                className="w-5 h-5 text-red-500"
                                fill="currentColor"
                              />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p>Your wishlist is empty.</p>
                      <button
                        className={`mt-4 px-4 py-2 rounded-lg ${styles.button}`}
                      >
                        Browse Products
                      </button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "payment" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Payment Methods
                  </h2>
                  <div className="space-y-4">
                    {user.paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className={`flex justify-between items-center p-4 rounded-lg ${
                          isDark
                            ? "border border-gray-700"
                            : "border border-gray-200"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-12 h-8 rounded ${
                              isDark ? "bg-gray-700" : "bg-gray-200"
                            } flex items-center justify-center`}
                          >
                            <span className="font-bold">{method.type}</span>
                          </div>
                          <div>
                            <h3 className="font-medium">
                              **** **** **** {method.last4}
                            </h3>
                            <p
                              className={
                                isDark ? "text-gray-400" : "text-gray-600"
                              }
                            >
                              Expires {method.expiry}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-blue-600">
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      className={`w-full py-3 mt-3 rounded-lg border border-dashed ${
                        isDark
                          ? "border-gray-700 hover:border-gray-500"
                          : "border-gray-300 hover:border-gray-400"
                      } flex items-center justify-center`}
                    >
                      <CreditCard className="w-5 h-5 mr-2" />
                      <span>Add New Payment Method</span>
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "security" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Security Settings
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">Change Password</h3>
                      <div className="space-y-3">
                        <div>
                          <label
                            className={
                              isDark ? "text-gray-400" : "text-gray-600"
                            }
                          >
                            Current Password
                          </label>
                          <input
                            type="password"
                            className={`${styles.input} w-full mt-1 p-2 rounded-lg border`}
                          />
                        </div>
                        <div>
                          <label
                            className={
                              isDark ? "text-gray-400" : "text-gray-600"
                            }
                          >
                            New Password
                          </label>
                          <input
                            type="password"
                            className={`${styles.input} w-full mt-1 p-2 rounded-lg border`}
                          />
                        </div>
                        <div>
                          <label
                            className={
                              isDark ? "text-gray-400" : "text-gray-600"
                            }
                          >
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            className={`${styles.input} w-full mt-1 p-2 rounded-lg border`}
                          />
                        </div>
                        <button
                          className={`px-4 py-2 rounded-lg ${styles.button} mt-2`}
                        >
                          Update Password
                        </button>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-300 dark:border-gray-700">
                      <h3 className="font-medium mb-3">Security Options</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">
                              Two-Factor Authentication
                            </h4>
                            <p
                              className={
                                isDark ? "text-gray-400" : "text-gray-600"
                              }
                            >
                              Add an extra layer of security to your account
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Login Notifications</h4>
                            <p
                              className={
                                isDark ? "text-gray-400" : "text-gray-600"
                              }
                            >
                              Receive notifications for new logins to your
                              account
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              defaultChecked
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-300 dark:border-gray-700">
                      <h3 className="font-medium mb-3 text-red-500">
                        Danger Zone
                      </h3>
                      <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                        Once you delete your account, there is no going back.
                        Please be certain.
                      </p>
                      <button className="px-4 py-2 mt-3 rounded-lg bg-red-600 hover:bg-red-700 text-white">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "settings" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-4">Settings</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Email Notifications</h3>
                        <p
                          className={isDark ? "text-gray-400" : "text-gray-600"}
                        >
                          Receive emails about your orders and account
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">
                          Marketing Communications
                        </h3>
                        <p
                          className={isDark ? "text-gray-400" : "text-gray-600"}
                        >
                          Receive updates on new products and promotions
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Order Status Updates</h3>
                        <p
                          className={isDark ? "text-gray-400" : "text-gray-600"}
                        >
                          Receive SMS notifications about your orders
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked
                        />
                        <div
                          className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5
                        after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                        ></div>
                      </label>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-300 dark:border-gray-700">
                    <h3 className="font-medium mb-3">Language Preferences</h3>
                    <select
                      className={`${styles.input} w-full mt-1 p-2 rounded-lg border`}
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                  <div className="pt-4 border-t border-gray-300 dark:border-gray-700">
                    <h3 className="font-medium mb-3">Theme Preferences</h3>
                    <select
                      className={`${styles.input} w-full mt-1 p-2 rounded-lg border`}
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="system">System Default</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
