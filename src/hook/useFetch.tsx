import { useEffect, useState } from "react";
import AxiosProvider from "../utils/axiosInstance";
export interface IProduct {
     _id: string;
     title: string;
     image: string;
     price: number;
     description: string;
     brand: string;
     model: string;
     color: string;
     category: string;
     quantity: number;
}

const useFetch = () => {
     const [loading, setLoading] = useState(true);
     const [data, setData] = useState<IProduct[]>([]);
     const [error, setError] = useState<string | null>(null);
     const { axiosInstance } = AxiosProvider();
     const fetchData = async () => {
          try {
               const response = await axiosInstance.get("products/");
               setData(response.data);
          } catch (error) {
               console.log(error);
               setError("Failed to retrieve products");
          } finally {
               setLoading(false);
          }
     };

     useEffect(() => {
          fetchData();
     }, []);
     return { loading, error, data };
};

export default useFetch;
