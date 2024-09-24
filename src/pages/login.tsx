import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AxiosProvider from "../utils/axiosInstance";
import { useCookies } from "react-cookie";

const LoginPage = () => {
     const navigate = useNavigate();
     const { axiosInstance } = AxiosProvider();
     const [_, setCookie] = useCookies();
     const [user, setUser] = useState({
          email: "",
          password: "",
     });

     const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
          const { value, id } = e.target;
          setUser((prev) => {
               return { ...prev, [id]: value };
          });
     };

     const handleSubmit = async (e: SyntheticEvent) => {
          e.preventDefault();

          try {
               const response = await axiosInstance.post("user/login", user);
               setCookie("accessToken", response.data.token);
               localStorage.setItem("userId", response.data.id);
               setUser({
                    email: "",
                    password: "",
               });
               navigate("/");
          } catch (error: any) {
               alert(error.response.data.type);
          }
     };
     return (
          <main className="h-full flex">
               <div className="mx-auto bg-white p-10 mt-40">
                    <form
                         onSubmit={handleSubmit}
                         className="flex flex-col items-left gap-[10px]"
                    >
                         <h1 className="text-3xl text-yellow-300 font-bold">
                              Login
                         </h1>

                         <div className="flex flex-col gap-1 w-full md:w-[420px]">
                              <label htmlFor="email">Email</label>
                              <input
                                   type="text"
                                   id="email"
                                   placeholder="karen@gmail.."
                                   value={user.email}
                                   className="px-5 py-3 outline-none border border-slate-200 rounded-sm"
                                   onChange={handleChange}
                              />
                         </div>
                         <div className="flex flex-col gap-1 w-full md:w-[420px]">
                              <label htmlFor="password">Password</label>
                              <input
                                   type="text"
                                   id="password"
                                   className="px-5 py-3 outline-none border border-slate-200 rounded-sm"
                                   value={user.password}
                                   placeholder="***"
                                   onChange={handleChange}
                              />
                         </div>

                         <button className="bg-yellow-300 w-max px-5 py-3 rounded-lg">
                              Login
                         </button>
                         <p>
                              Don't have an account?{" "}
                              <Link
                                   to={"/signup"}
                                   className="underline text-yellow-300"
                              >
                                   create one
                              </Link>
                         </p>
                    </form>
               </div>
          </main>
     );
};

export default LoginPage;
