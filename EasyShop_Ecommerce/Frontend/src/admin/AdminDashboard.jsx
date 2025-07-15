import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    category: "",
  });

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
    }
    fetchProducts();
  }, [user]);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/products", form);
      setForm({
        title: "",
        description: "",
        price: "",
        image: "",
        category: "",
      });
      fetchProducts();
    } catch (err) {
      alert(err.response.data.msg || "Error");
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      {/* Add Product Form */}
      <form onSubmit={handleAdd} className="mb-8 space-y-3 border p-4 rounded">
        <h3 className="text-lg font-semibold">Add New Product</h3>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Product
        </button>
      </form>

      {/* Product List */}
      <div>
        <h3 className="text-lg font-semibold mb-2">All Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((p) => (
            <div key={p._id} className="border p-4 rounded shadow">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-40 object-cover mb-2"
              />
              <h4 className="font-bold">{p.title}</h4>
              <p>₹{p.price}</p>
              <button
                onClick={() => handleDelete(p._id)}
                className="mt-2 text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
