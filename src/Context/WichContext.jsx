import React, { createContext, useReducer, useEffect } from "react";

// الحالة الابتدائية لعربة التسوق (مصفوفة فارغة)
const initialState = JSON.parse(localStorage.getItem("Wish") || "[]");

// الدالة المُخفضة (Reducer) لمعالجة إجراءات إضافة وإزالة المنتجات
const reducer = (state, action) => {
  switch (action.type) {
    case "addtoWish": {
      const product = action.payload;
      // Check if the product already exists in the state
      const exists = state.find((item) => item.id === product.id);
      if (exists) {
        // If it exists, remove it (toggle off)
        return state.filter((item) => item.id !== product.id);
      } else {
        // If not, add the product to the state
        return [...state, { ...product }];
      }
    }

    default:
      return state;
  }
};

// إنشاء سياق عربة التسوق
const WishContext = createContext();

// مزود سياق عربة التسوق الذي يغلف التطبيق ويوفر الحالة والدالة dispatch
export const WishProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("Wish", JSON.stringify(state));
  }, [state]);

  return (
    <WishContext.Provider value={{ state, dispatch }}>
      {children}
    </WishContext.Provider>
  );
};

export default WishContext;
