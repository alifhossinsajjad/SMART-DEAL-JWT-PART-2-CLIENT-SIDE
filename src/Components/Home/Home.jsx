import { Suspense } from "react";
import LatestProduts from "../LatestProducts/LatestProduts";
import Loading from "../Loading/Loading";

const latestProductsPromise = fetch(
  "https://smart-deals-server-steel.vercel.app/latest-products"
).then((res) => res.json());

const Home = () => {
  return (
    <div>
      <h3 className="color-primary">this is home</h3>
      <Suspense fallback={<Loading />}>
        <LatestProduts latestProductsPromise={latestProductsPromise} />
      </Suspense>
    </div>
  );
};

export default Home;
