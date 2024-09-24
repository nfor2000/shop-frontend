import React, { createContext, useEffect, useState } from "react";
import AxiosProvider from "../utils/axiosInstance";
export type User = {
     username: string;
     email: string;
};
interface IShopContext {
     user: User | null;
     cartItems: any;
     addItemToCart: (id: string) => void;
     removeItemFromCart: (id: string) => void;
     clearCart: () => void;
}

const defaultVal = {
     user: null,
     cartItems: [],
     addItemToCart: () => null,
     removeItemFromCart: () => null,
     clearCart: () => null,
};

const saveToLocalStorage = (cartItems: any) => {
     localStorage.setItem("cart", JSON.stringify(cartItems));
};

const getItemFromLocalStorage = (): any => {
     if (localStorage.getItem("cart") !== null) {
          return JSON.parse(localStorage.getItem("cart") ?? "");
     }
     return {};
};
export const shopContext = createContext<IShopContext>(defaultVal);

const ShopContextProvider = ({ children }: { children: React.ReactNode }) => {
     const [user, setUser] = useState<User | null>(null);
     const { axiosInstance } = AxiosProvider();
     const [cartItems, setCartItems] = useState<any>(getItemFromLocalStorage());

     const getUser = async () => {
          try {
               const response = await axiosInstance.get("user/");
               console.log(response.data);
               setUser(response.data);
          } catch (error) {
               console.log(error);
               console.log("no token");
          }
     };

     useEffect(() => {
          getUser();
     }, []);
     const addItemToCart = (id: string) => {
          let newCartItems;
          if (!cartItems[id]) {
               newCartItems = { ...cartItems, [id]: 1 };
          } else {
               newCartItems = { ...cartItems, [id]: cartItems[id] + 1 };
          }
          setCartItems(newCartItems);
          saveToLocalStorage(newCartItems);
     };

     const removeItemFromCart = (id: string) => {
          let newCartItems;
          if (!cartItems[id]) return;
          if (cartItems[id] < 2) {
               const { [id]: removedItem, ...rest } = cartItems;
               newCartItems = rest;
          } else {
               newCartItems = { ...cartItems, [id]: cartItems[id] - 1 };
          }

          setCartItems(newCartItems);
          saveToLocalStorage(newCartItems);
     };

     const clearCart = () => {
          setCartItems({});
          saveToLocalStorage({});
     };

     return (
          <shopContext.Provider
               value={{
                    user,
                    cartItems,
                    addItemToCart,
                    removeItemFromCart,
                    clearCart,
               }}
          >
               {children}
          </shopContext.Provider>
     );
};

export default ShopContextProvider;
