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
    const {user} = useAuth();

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState( user?.displayName  || "" );
    const [email, setEmail] = useState( user?.email || "");

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
                    autoClose: 3000, // duration in ms
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
                    className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                    required
                />
                <input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                    required
                />
                <div className="w-full border border-gray-300 px-4 py-2 rounded focus-within:ring-2 focus-within:ring-accent">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: "16px",
                                    color: "#424770",
                                    "::placeholder": {
                                        color: "#aab7c4",
                                    },
                                },
                                invalid: {
                                    color: "#9e2146",
                                },
                            },
                        }}
                    />
                </div>
                <Button
                    type="submit"
                    disabled={!stripe || loading}
                    className="bg-accent hover:bg-yellow-500 flex items-center gap-2"
                >
                    {loading ? "Processing..." : `Pay $${parseFloat(price).toFixed(2)}`}
                </Button>
            </form>
            <ToastContainer />
        </>
    );
};

export default CheckoutForm;
