import { Outlet } from "react-router-dom";
import Navbar from "../components/header";
import React from "react";
type props = {
     children: React.ReactNode;
};
export const MainLayout = () => {
     return (
          <>
               <Navbar />
               <Outlet />
          </>
     );
};

export const ContainerLayout = ({ children }: props) => {
     return <section className="max-w-6xl mx-auto">{children}</section>;
};
