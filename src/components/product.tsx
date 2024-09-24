import { useContext } from "react";
import { IProduct } from "../hook/useFetch";
import { shopContext } from "../context/ShopContextProvider";

const ProductCard = ({ item }: { item: IProduct }) => {
     const { addItemToCart, user, cartItems } = useContext(shopContext);
     return (
          <div className="w-full flex flex-col gap-y-2 items-center">
               <div className="w-full bg-white p-5 rounded-lg relative">
                    <img
                         src={item.image}
                         className="w-3/5 object-contain mx-auto"
                         alt={item.title}
                    />
                    <span
                         className={`absolute bg-black text-white text-sm top-5 right-5 p-2 rounded-lg font-bold`}
                    >
                         {item.brand}
                    </span>
               </div>
               <div className="flex flex-col gap-y-1 items-center">
                    <p className="text-sm">
                         {item.title.length > 20
                              ? item.title.substring(0, 20) + "..."
                              : item.title}
                    </p>
                    <p className="bg-slate-300 p-2 text-sm rounded-md font-bold">
                         ${item.price}
                    </p>
                    <button
                         onClick={
                              user
                                   ? () => addItemToCart(item._id)
                                   : () => alert("Log in first")
                         }
                         className="px-5 py-3 bg-yellow-300 font-semibold rounded-full mx-auto w-max"
                    >
                         {item.quantity === 0
                              ? "Out of stock"
                              : `Add to cart ${
                                     cartItems[item._id]
                                          ? `(${cartItems[item._id]})`
                                          : ""
                                }`}
                    </button>
               </div>
          </div>
     );
};

export default ProductCard;
