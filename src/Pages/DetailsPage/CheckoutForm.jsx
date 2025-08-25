import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Button from "../shared/Button";
import { toast, ToastContainer } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

const CheckoutForm = ({ productId, price, onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(user?.displayName || "");
    const [email, setEmail] = useState(user?.email || "");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;
        if (!name.trim() || !email.trim()) {
            toast.error("Please enter your name and email");
            return;
        }

        setLoading(true);

        try {
            const numericPrice = parseFloat(price);
            if (isNaN(numericPrice)) {
                toast.error("Invalid price.");
                setLoading(false);
                return;
            }

            // Step 1: create payment intent from backend
            const { data: clientSecret } = await axiosSecure.post("/create-payment-intent", {
                productId,
                price: numericPrice,
                buyerName: name,
                buyerEmail: email,
            });

            // Step 2: confirm payment on client
            const cardElement = elements.getElement(CardElement);
            const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name,
                        email,
                    },
                },
            });

            if (error) {
                toast.error(error.message);
                setLoading(false);
                return;
            }

            if (paymentIntent.status === "succeeded") {
                toast.success("Payment successful!", {
                    autoClose: 3000,
                    onClose: () => {
                        navigate("/dashboard/my-orders");
                    },
                });
                onSuccess?.();
            }
        } catch (err) {
            toast.error("Payment failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

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
                    {loading ? "Processing..." : `Pay $${parseFloat(price).toFixed(2)}`}
                </button>
            </form>
            <ToastContainer />
        </>
    );
};

export default CheckoutForm;
