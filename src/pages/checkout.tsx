import { useContext } from "react";
import useFetch from "../hook/useFetch";
import { ContainerLayout } from "../layout";
import { shopContext } from "../context/ShopContextProvider";
import CartProduct from "../components/cartProduct";
import AxiosProvider from "../utils/axiosInstance";

const CheckOut = () => {
     const { loading, error, data } = useFetch();
     const { cartItems, clearCart } = useContext(shopContext);
     let totalPrice = 0;
     const products = data.filter((item) => {
          for (const _id in cartItems) {
               if (item._id === _id) {
                    totalPrice += item.price * cartItems[_id];
                    return item;
               }
          }
     });

     const { axiosInstance } = AxiosProvider();

     const handleCheckout = async () => {
          try {
               const response = await axiosInstance.post(
                    "products/checkout",
                    cartItems
               );
               console.log(response.data);
               clearCart();
               alert("checkout successfull");
          } catch (error: any) {
               console.log(error);
               alert(error?.response?.data?.type);
          }
     };

     return (
          <main className="p-5">
               <ContainerLayout>
                    <div className="grid grid-cols-1 gap-y-5">
                         {loading ? (
                              <p>Loading</p>
                         ) : error ? (
                              <p>{error}</p>
                         ) : (
                              products.length > 0 &&
                              products.map((product) => (
                                   <CartProduct
                                        key={product._id}
                                        product={product}
                                   />
                              ))
                         )}
                         <h2 className="text-center font-bold text-slate-700 text-3xl">
                              Total: ${totalPrice}
                         </h2>
                         <button
                              className="bg-yellow-400 w-max px-20 py-5 mx-auto rounded-full shadow-lg"
                              onClick={handleCheckout}
                         >
                              Checkout
                         </button>
                    </div>
               </ContainerLayout>
          </main>
     );
};

export default CheckOut;
