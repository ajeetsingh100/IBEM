import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function Cart() {
  const { cart, updateQty, removeFromCart } = useContext(CartContext);
  const total = cart.reduce((sum, p) => sum + p.price * p.qty, 0);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center mb-3 border p-3 rounded"
            >
              <div>
                <h4>{item.title}</h4>
                <p>₹{item.price} x</p>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  min="1"
                  value={item.qty}
                  onChange={(e) => updateQty(item._id, Number(e.target.value))}
                  className="w-16 border text-center"
                />
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="mt-4">
            <h3 className="font-bold">Total: ₹{total}</h3>
            <Link
              to="/checkout"
              className="inline-block mt-2 bg-green-600 text-white px-4 py-2 rounded"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
