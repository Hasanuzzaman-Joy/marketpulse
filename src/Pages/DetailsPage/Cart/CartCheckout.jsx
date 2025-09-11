import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import { useLocation } from "react-router";
import CheckoutForm from "../CheckoutForm";
import { useEffect } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);

const CartCheckout = () => {
  useEffect(() => {
    document.title = "MarketPulse - Payment";
  }, []);

  const location = useLocation();
  const { cartItems, totalPrice } = location.state || {};

  if (!cartItems || cartItems.length === 0) {
    toast.error("No items in cart to checkout.");
    return null;
  }

  return (
    <section className="w-full bg-gray-100 py-10">
      <div className="w-full md:w-1/2 mx-auto px-4 bg-secondary py-10">
        <h2 className="text-3xl font-heading text-center font-bold mb-6 text-white">
          Checkout: {cartItems.length} Item(s)
        </h2>

        <Elements stripe={stripePromise}>
          <CheckoutForm cartItems={cartItems} price={totalPrice} />
        </Elements>
      </div>
    </section>
  );
};

export default CartCheckout;
