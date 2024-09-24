import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AxiosProvider from "../utils/axiosInstance";
import { useCookies } from "react-cookie";

const SignUpPage = () => {
     const { axiosInstance } = AxiosProvider();
     const navigate = useNavigate();
     const [_, setCookie] = useCookies();
     const [user, setUser] = useState({
          username: "",
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
               const response = await axiosInstance.post("user/register", user);
               setCookie("accessToken", response.data.token);
               localStorage.setItem("userId", response.data.id);
               setUser({
                    username: "",
                    email: "",
                    password: "",
               });
               navigate("/");
          } catch (error: any) {
               console.log(error);
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
                              Sign Up
                         </h1>
                         <div className="flex flex-col gap-1 w-full md:w-[420px]">
                              <label htmlFor="username">Username</label>
                              <input
                                   type="text"
                                   id="username"
                                   placeholder="Karen.."
                                   className="px-5 py-3 outline-none border border-slate-200 rounded-sm"
                                   value={user.username}
                                   onChange={handleChange}
                              />
                         </div>
                         <div className="flex flex-col gap-1 w-full md:w-[420px]">
                              <label htmlFor="email">Email</label>
                              <input
                                   type="text"
                                   id="email"
                                   placeholder="karen@gmail.."
                                   className="px-5 py-3 outline-none border border-slate-200 rounded-sm"
                                   value={user.email}
                                   onChange={handleChange}
                              />
                         </div>
                         <div className="flex flex-col gap-1 w-full md:w-[420px]">
                              <label htmlFor="password">Password</label>
                              <input
                                   type="text"
                                   id="password"
                                   className="px-5 py-3 outline-none border border-slate-200 rounded-sm"
                                   placeholder="***"
                                   value={user.password}
                                   onChange={handleChange}
                              />
                         </div>

                         <button className="bg-yellow-400 w-max px-5 py-3 rounded-lg">
                              Sign Up
                         </button>
                         <p>
                              Already have an account?{" "}
                              <Link
                                   to={"/login"}
                                   className="underline text-yellow-300"
                              >
                                   log in
                              </Link>
                         </p>
                    </form>
               </div>
          </main>
     );
};

export default SignUpPage;
