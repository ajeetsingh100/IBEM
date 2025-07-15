import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const total = cart.reduce((sum, p) => sum + p.price * p.qty, 0);

  const placeOrder = async () => {
    try {
      await axios.post("http://localhost:5000/api/orders", {
        userId: user.id,
        products: cart.map((p) => ({ productId: p._id, qty: p.qty })),
        totalAmount: total,
        address,
      });
      clearCart();
      alert("Order placed!");
      navigate("/orders");
    } catch (err) {
      alert("Failed to place order");
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-3">Checkout</h2>
      <textarea
        placeholder="Enter your delivery address"
        className="w-full border p-2 mb-3"
        rows={3}
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      ></textarea>
      <p className="mb-2">Total: ₹{total}</p>
      <button
        onClick={placeOrder}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Place Order
      </button>
    </div>
  );
}

export default Checkout;
