import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeContext from "../Context/ThemeContext";
import CartContext from "../Context/CartContext";
import ProductContext from "../Context/ProductsContext";
import { toast } from "react-toastify";

// دالة مساعدة لإرجاع إعدادات الثيم بناءً على الوضع (مظلم/فاتح)
const getStyles = (isDark) => {
  return {
    cartBg: isDark ? "bg-[#1e1e20]" : "bg-gray-100",
    title: isDark ? "text-white" : "text-[#1e1e20]",
    card: isDark ? "bg-[#292929]" : "bg-white",
    btn: isDark
      ? "border-2 border-white rounded-xl text-xl text-white"
      : "border-2 border-[#1e1e20] rounded-xl text-xl text-[#1e1e20]",
  };
};

export default function Cart() {
  const { theme } = useContext(ThemeContext);
  const { state, dispatch } = useContext(CartContext);
  const { products } = useContext(ProductContext);
  const navigate = useNavigate();
  const isDark = theme === "dark";
  const styles = getStyles(isDark);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const notify = () => {
    toast.success("Product successfully remove from cart");
    // You can also use toast.error, toast.info, etc.
  };

  const handleCheckoutClick = () => {
    setShowCheckoutModal(true);
  };

  const handleConfirmCheckout = () => {
    if (state.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    toast.success("Order placed successfully!");
    state.forEach((item) => {
      dispatch({ type: "remove", payload: item });
    });

    setShowCheckoutModal(false);
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  // تعديل حساب المجموع الكلي
  const total = state.reduce((acc, item) => {
    const product = products[item.id];
    return acc + (product?.price || 0) * item.quantity;
  }, 0);

  return (
    <div className={`${styles.cartBg} min-h-screen mt-16 p-4 md:p-8 lg:p-12`}>
      <h1
        className={`${styles.title} text-2xl md:text-2xl lg:text-4xl font-bold text-center mb-6`}
      >
        Shopping Cart
      </h1>

      <div className="max-w-380 mx-auto flex flex-col lg:flex-row gap-6">
        <div className="flex-grow">
          {state.length === 0 ? (
            <p className={`${styles.title} text-center text-xl`}>
              Your cart is empty
            </p>
          ) : (
            <div className="space-y-4">
              {state.map((item) => {
                const product = products[item.id];
                return (
                  <div
                    key={item.id}
                    className={`${styles.card} p-4 lg:p-6 rounded-lg flex flex-col sm:flex-row gap-4`}
                  >
                    <div className="w-full sm:w-24 h-24 lg:w-32 lg:h-32">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-grow space-y-2">
                      <h3
                        className={`${styles.title} font-semibold text-lg lg:text-xl line-clamp-1`}
                      >
                        {product.title}
                      </h3>
                      <p
                        className={`${styles.title} text-sm lg:text-base line-clamp-2`}
                      >
                        {product.description}
                      </p>
                      <div className="flex flex-wrap gap-4 items-center justify-between">
                        <p
                          className={`${styles.title} font-bold text-lg lg:text-xl`}
                        >
                          ${product.price}
                        </p>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              dispatch({
                                type: "removefromcart",
                                payload: item,
                              })
                            }
                            className={`${styles.btn} w-8 h-9 lg:w-9 lg:h-10 flex items-center justify-center`}
                          >
                            -
                          </button>
                          <span className={styles.title}>{item.quantity}</span>
                          <button
                            onClick={() =>
                              dispatch({
                                type: "addtocart",
                                payload: { id: item.id, quantity: 1 },
                              })
                            }
                            className={`${styles.btn} w-8 h-9 lg:w-9 lg:h-10 flex items-center justify-center`}
                          >
                            +
                          </button>
                          <button
                            onClick={() => {
                              dispatch({ type: "remove", payload: item });
                              notify();
                            }}
                            className="px-3 py-1 lg:px-4 lg:py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm lg:text-base"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {state.length > 0 && (
          <div
            className={`${styles.card} p-6 lg:p-8 rounded-lg h-fit lg:w-120`}
          >
            <h2
              className={`${styles.title} text-xl lg:text-2xl font-bold mb-4`}
            >
              Cart Summary
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className={styles.title}>Total Items:</span>
                <span className={styles.title}>{state.length}</span>
              </div>
              <div className="flex justify-between">
                <span className={styles.title}>Total Amount:</span>
                <span className={`${styles.title} font-bold`}>
                  ${total.toFixed(2)}
                </span>
              </div>
              <button
                onClick={handleCheckoutClick}
                className="w-full mt-4 bg-blue-600 text-white py-2 lg:py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 cursor-pointer"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={`${styles.card} p-6 rounded-lg max-w-md w-full mx-4`}>
            <h3 className={`${styles.title} text-xl font-bold mb-4`}>
              Confirm Order
            </h3>

            <div className="space-y-4">
              <div className={`${styles.title} space-y-2`}>
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>$5.00</span>
                </div>
                <div className="flex justify-between font-bold border-t pt-2">
                  <span>Total:</span>
                  <span>${(total + 5).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleConfirmCheckout}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Confirm Payment
                </button>
                <button
                  onClick={() => setShowCheckoutModal(false)}
                  className={
                    isDark
                      ? "w-full border text-white hover:text-[#1e1e20]  border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      : "w-full border text-[#1e1e20] hover:text-white  border-gray-300 py-2 rounded-lg hover:bg-[#1e1e20] transition-colors cursor-pointer"
                  }
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
