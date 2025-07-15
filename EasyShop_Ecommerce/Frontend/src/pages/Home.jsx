import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products") // Use Render URL after deployment
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p._id} className="p-4 border rounded shadow">
            <img
              src={p.image}
              alt={p.title}
              className="h-40 w-full object-cover mb-2"
            />
            <h2 className="text-lg font-semibold">{p.title}</h2>
            <p className="text-sm text-gray-500">₹{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
