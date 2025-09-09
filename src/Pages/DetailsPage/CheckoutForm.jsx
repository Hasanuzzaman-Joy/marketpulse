import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast, ToastContainer } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import Loading from "../shared/Loading";

const CheckoutForm = ({ productId, price, cartItems, onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { user, loading, setLoading } = useAuth();
    const [address, setAddress] = useState("");

    // Determine the mode: single product or cart
    const isCartCheckout = Array.isArray(cartItems) && cartItems.length > 0;

    // Function to clear user's cart AFTER successful payment
    const clearUserCart = async () => {
        try {
            await axiosSecure.delete(`/clear-cart?email=${user?.email}`);
        } catch (error) {
            // console.error('Error clearing cart:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setLoading(true);

        try {
            let clientSecret;
            let endpoint;
            let requestData;

            if (isCartCheckout) {
                // --- CART CHECKOUT FLOW ---
                endpoint = `/create-payment-intent-cart?email=${user?.email}`;
                requestData = {
                    items: cartItems,
                    buyerEmail: user?.email,
                    buyerName: user?.displayName,
                    buyerAddress: address
                };
            } else {
                // --- SINGLE PRODUCT CHECKOUT FLOW ---
                endpoint = `/create-payment-intent?email=${user?.email}`;
                const numericPrice = parseFloat(price);
                if (isNaN(numericPrice)) {
                    toast.error("Invalid price.");
                    setLoading(false);
                    return;
                }
                requestData = {
                    productId,
                    price: numericPrice,
                    buyerEmail: user?.email,
                    buyerName: user?.displayName,
                    buyerAddress: address
                };
            }

            // Create payment intent
            const { data } = await axiosSecure.post(endpoint, requestData);
            clientSecret = data.clientSecret;

            // Confirm payment
            const cardElement = elements.getElement(CardElement);
            const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: user?.displayName,
                        email: user?.email,
                    },
                },
            });

            if (error) {
                toast.error(error.message);
                setLoading(false);
                return;
            }

            if (paymentIntent.status === "succeeded") {
                if (isCartCheckout) {
                    await clearUserCart();
                }

                let successMessage = "Payment successful";
                toast.success(successMessage, {
                    autoClose: 3000,
                    onClose: () => {
                        navigate("/dashboard/my-orders");
                    },
                });
                onSuccess?.();
            }
        } catch (err) {
            console.error("Payment error:", err);
            toast.error("Payment failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Calculate display price
    const displayPrice = isCartCheckout
        ? cartItems.reduce((total, item) => total + item.pricePerUnit * item.quantity, 0)
        : parseFloat(price);

    if (loading && !user) return <Loading />;

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Your Name"
                    value={user?.displayName}
                    className="w-full px-3 py-2 bg-white text-gray-600 rounded border-none focus-within:ring-2 focus-within:ring-accent"
                    required
                />
                <input
                    type="email"
                    placeholder="Your Email"
                    value={user?.email}
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
                                    "::placeholder": {
                                        color: "#666666",
                                    },
                                    backgroundColor: "#FFFFFF",
                                },
                                invalid: {
                                    color: "#9e2146",
                                },
                            },
                        }}
                    />
                </div>
                <button
                    type="submit"
                    disabled={!stripe || loading}
                    className="text-white px-10 py-2 rounded bg-accent hover:bg-secondary transition font-semibold font-heading border-[1px] border-white flex items-center gap-2 cursor-pointer"
                >
                    {loading ? "Processing..." : `Pay $${displayPrice.toFixed(2)}`}
                </button>
            </form>
            <ToastContainer />
        </>
    );
};

export default CheckoutForm;