import {
     createBrowserRouter,
     createRoutesFromElements,
     Route,
     RouterProvider,
} from "react-router-dom";
import { MainLayout } from "./layout";
import ShopPage from "./pages/home";
import LoginPage from "./pages/login";
import SignUpPage from "./pages/signup";
import ShopContextProvider from "./context/ShopContextProvider";
import CheckOut from "./pages/checkout";

const App = () => {
     const router = createBrowserRouter(
          createRoutesFromElements(
               <Route path="" element={<MainLayout />}>
                    <Route index element={<ShopPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/checkout" element={<CheckOut />} />
               </Route>
          )
     );
     return (
          <ShopContextProvider>
               <RouterProvider router={router} />
          </ShopContextProvider>
     );
};

export default App;
