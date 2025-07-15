import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function Orders() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5000/api/orders/${user.id}`)
        .then((res) => setOrders(res.data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  if (!user) return <p className="p-4">Please login to view your orders.</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="border p-4 rounded mb-4">
            <p>
              <strong>Order Date:</strong>{" "}
              {new Date(order.date).toLocaleString()}
            </p>
            <p>
              <strong>Total:</strong> ₹{order.totalAmount}
            </p>
            <p>
              <strong>Address:</strong> {order.address}
            </p>
            <div className="mt-2">
              <p className="font-semibold mb-1">Items:</p>
              <ul className="list-disc list-inside text-sm">
                {order.products.map((item, i) => (
                  <li key={i}>
                    Product ID: {item.productId} — Qty: {item.qty}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
