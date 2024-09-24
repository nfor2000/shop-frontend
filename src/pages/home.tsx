import ProductCard from "../components/product";
import useFetch from "../hook/useFetch";
import { ContainerLayout } from "../layout";

const ShopPage = () => {
     const { loading, error, data } = useFetch();
     return (
          <main className="p-5 bg-slate-100 pt-20">
               <ContainerLayout>
                    {loading ? (
                         <p>Loading...</p>
                    ) : error ? (
                         <p>{error}</p>
                    ) : (
                         <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                              {data.map((item) => (
                                   <ProductCard key={item._id} item={item} />
                              ))}
                         </div>
                    )}
               </ContainerLayout>
          </main>
     );
};

export default ShopPage;
