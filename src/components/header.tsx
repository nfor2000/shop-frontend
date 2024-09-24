import { MdSearch, MdShoppingCart } from "react-icons/md";
import logo from "../assets/logo.png";
import { ContainerLayout } from "../layout";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { shopContext } from "../context/ShopContextProvider";
import Profile from "./profile";

const Navbar = () => {
     const { user, cartItems } = useContext(shopContext);
     return (
          <header className="bg-gray-900 backdrop-blur-sm px-5 sticky top-0 left-0 z-10">
               <ContainerLayout>
                    <nav className="bg-slate-900 flex items-center justify-between">
                         <Link to={"/"} className="flex items-center gap-2">
                              <img src={logo} alt="eshop" className="w-32" />
                         </Link>
                         <div className="flex items-center gap-5">
                              <button className="block md:hidden">
                                   <MdSearch className="text-4xl text-white" />
                              </button>
                              <div className="items-center shrink-0 w-72 bg-slate-100 rounded-full h-10 px-5 hidden md:flex">
                                   <input
                                        type="text"
                                        className="flex-1 h-full outline-none bg-transparent"
                                        placeholder="search..."
                                   />
                                   <button>
                                        <MdSearch className="text-3xl" />
                                   </button>
                              </div>
                              {user ? (
                                   <>
                                        <Link
                                             to={"/checkout"}
                                             className="relative text-white"
                                        >
                                             <MdShoppingCart className="text-4xl" />
                                             <span className="absolute -right-4 -top-4 bg-yellow-300 w-8 h-8 rounded-full text-center leading-8 text-black text-sm">
                                                  {
                                                       Object.keys(cartItems)
                                                            .length
                                                  }
                                             </span>
                                        </Link>
                                        <Profile userInfo={user} />
                                   </>
                              ) : (
                                   <Link
                                        to={"/login"}
                                        className="text-white font-bold"
                                   >
                                        Login
                                   </Link>
                              )}
                         </div>
                    </nav>
               </ContainerLayout>
          </header>
     );
};

export default Navbar;
