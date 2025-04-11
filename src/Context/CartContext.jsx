import React, { createContext, useReducer, useEffect } from "react";

// الحالة الابتدائية لعربة التسوق (مصفوفة فارغة)
const initialState = JSON.parse(localStorage.getItem("cart") || "[]");

// الدالة المُخفضة (Reducer) لمعالجة إجراءات إضافة وإزالة المنتجات
const reducer = (state, action) => {
  switch (action.type) {
    case "addtocart": {
      const { id, quantity } = action.payload;
      // التأكد من أن الكمية رقم موجب
      const validQuantity = Math.max(1, parseInt(quantity) || 1);

      const existingItemIndex = state.findIndex(
        (item) => item.id === parseInt(id)
      );

      if (existingItemIndex !== -1) {
        // تحديث الكمية للمنتج الموجود
        const updatedState = [...state];
        updatedState[existingItemIndex] = {
          ...updatedState[existingItemIndex],
          quantity: updatedState[existingItemIndex].quantity + validQuantity,
        };
        return updatedState;
      }

      // إضافة منتج جديد
      return [...state, { id: parseInt(id), quantity: validQuantity }];
    }

    case "removefromcart": {
      const { id } = action.payload;
      const existingItem = state.find((item) => item.id === parseInt(id));

      if (!existingItem) return state;

      if (existingItem.quantity <= 1) {
        return state.filter((item) => item.id !== parseInt(id));
      }

      return state.map((item) =>
        item.id === parseInt(id)
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    }

    case "remove": {
      const { id } = action.payload;
      return state.filter((item) => item.id !== parseInt(id));
    }

    default:
      return state;
  }
};

// إنشاء سياق عربة التسوق
const CartContext = createContext();

// مزود سياق عربة التسوق الذي يغلف التطبيق ويوفر الحالة والدالة dispatch
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
