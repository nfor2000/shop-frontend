import { useContext } from "react";
import { IProduct } from "../hook/useFetch";
import { shopContext } from "../context/ShopContextProvider";

const CartProduct = ({ product }: { product: IProduct }) => {
     const { cartItems, addItemToCart, removeItemFromCart } =
          useContext(shopContext);
     return (
          <div
               key={product._id}
               className="flex items-center justify-between bg-white p-5 rounded-lg shadow-sm"
          >
               <div className="flex items-center  gap-5">
                    <div className="w-auto">
                         <img
                              src={product.image}
                              alt={product.title}
                              className="h-40"
                         />
                    </div>
                    <div className="grid gap-2">
                         <p className="max-w-sm text-slate-900">
                              {product.title}
                         </p>
                         <p className="font-bold text-slate-700">
                              $
                              {(cartItems[product._id] * product.price).toFixed(
                                   2
                              )}
                         </p>
                    </div>
               </div>
               <div className="flex flex-col gap-2 items-center">
                    <button
                         className="bg-yellow-400 w-8 h-8 rounded-full text-lg"
                         onClick={() => addItemToCart(product._id)}
                    >
                         +
                    </button>
                    <p>{cartItems[product._id]}</p>
                    <button
                         className="bg-slate-100 shadow-sm w-8 h-8 rounded-full text-lg"
                         onClick={() => removeItemFromCart(product._id)}
                    >
                         -
                    </button>
               </div>
          </div>
     );
};

export default CartProduct;
