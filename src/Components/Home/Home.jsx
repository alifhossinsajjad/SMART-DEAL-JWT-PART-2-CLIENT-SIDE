import { Suspense, useEffect, useState } from "react";
import LatestProduts from "../LatestProducts/LatestProduts";
import Loading from "../Loading/Loading";

const Home = () => {
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    fetch("https://smart-deals-server-steel.vercel.app/latest-products")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLatestProducts(data);
      });
  }, []);

  return (
    <div>
      <h3 className="color-primary">this is home</h3>
      <Suspense fallback={<Loading />}>
        <LatestProduts latestProducts={latestProducts} />
      </Suspense>
    </div>
  );
};

export default Home;
