import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast, ToastContainer } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import CircularProgress from "@mui/material/CircularProgress";

const CheckoutForm = ({ productId, price, cartItems, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const isCartCheckout = Array.isArray(cartItems) && cartItems.length > 0;

  // Function to clear user's cart after successful payment
  const clearUserCart = async () => {
    try {
      await axiosSecure.delete(`/clear-cart?email=${user?.email}`);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  // Handle form submission and payment processing
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    if (!name.trim() || !email.trim() || !address.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      let endpoint, requestData;

      if (isCartCheckout) {
        endpoint = `/create-payment-intent-cart?email=${user?.email}`;
        requestData = {
          items: cartItems,
          buyerEmail: email,
          buyerName: name,
          buyerAddress: address,
        };
      } else {
        endpoint = `/create-payment-intent?email=${user?.email}`;
        requestData = {
          productId,
          price: parseFloat(price),
          buyerEmail: email,
          buyerName: name,
          buyerAddress: address,
        };
      }

      const { data } = await axiosSecure.post(endpoint, requestData);
      const clientSecret = data.clientSecret;

      // Get the CardElement for payment method
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        toast.error("Card info not found. Refresh the page.");
        setLoading(false);
        return;
      }

      // Confirm the card payment
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: { name, email },
          },
        }
      );

      if (error) {
        toast.error(error.message);
        setLoading(false);
        return;
      }

      //   handle successful payment
      if (paymentIntent.status === "succeeded") {
        const paymentData = {
          paymentIntentId: paymentIntent.id,
          amount: paymentIntent.amount / 100,
          currency: paymentIntent.currency,
          buyerName: name,
          buyerEmail: email,
          buyerAddress: address,
          items: isCartCheckout
            ? cartItems
            : [{ productId, price: parseFloat(price) }],
        };

        await axiosSecure.post(
          `/save-payment?email=${user?.email}`,
          paymentData
        );

        if (isCartCheckout) {
          await clearUserCart();
        }

        toast.success("Payment successful!", {
          autoClose: 3000,
          onClose: () => navigate("/dashboard/my-orders"),
        });

        onSuccess?.();
      }
    } catch (err) {
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Calculate total price for cart or single product
  const displayPrice = isCartCheckout
    ? cartItems.reduce(
        (total, item) => total + item.pricePerUnit * item.quantity,
        0
      )
    : parseFloat(price);

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 bg-white text-gray-600 rounded border-none focus-within:ring-2 focus-within:ring-accent"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 bg-white text-gray-600 rounded border-none focus-within:ring-2 focus-within:ring-accent"
          required
        />
        <textarea
          placeholder="Full Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full px-3 py-2 bg-white text-gray-600 rounded border-none focus-within:ring-2 focus-within:ring-accent"
          rows={3}
          required
        />
        <div className="w-full border bg-white border-gray-300 px-4 py-2 rounded focus-within:ring-2 focus-within:ring-accent">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#1C1C1C",
                  fontFamily: "inherit",
                  "::placeholder": { color: "#666666" },
                },
                invalid: { color: "#9e2146" },
              },
            }}
          />
        </div>
        <button
          type="submit"
          disabled={!stripe || loading}
          className="text-white px-10 py-2 rounded bg-accent hover:bg-secondary border border-white duration-300 transition-all font-semibold font-heading flex items-center gap-2 cursor-pointer"
        >
          {loading ? (
            <div className="flex gap-2 items-center justify-center">
              <CircularProgress size={20} sx={{ color: "white" }} />
              Processing...
            </div>
          ) : (
            `Pay $${displayPrice.toFixed(2)}`
          )}
        </button>
      </form>
      <ToastContainer />
    </>
  );
};

export default CheckoutForm;
