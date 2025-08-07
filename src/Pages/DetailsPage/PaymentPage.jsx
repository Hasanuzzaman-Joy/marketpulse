import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import CheckoutForm from "./CheckoutForm";
import Loading from "../shared/Loading";
import Container from "../shared/Container";
import { toast } from "react-toastify";

const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);

const PaymentPage = () => {
  const { productId } = useParams();
  const axiosSecure = useAxiosSecure();

  // Fetch single product
  const { data: product, isLoading } = useQuery({
    queryKey: ["paymentProduct", productId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/single-product/${productId}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  if (!product) {
    toast.error("Product not found.");
    return null;
  }

  const price = parseFloat(product.pricePerUnit);
  if (isNaN(price)) {
    toast.error("Invalid price.");
    return null;
  }

  return (
      <div className="max-w-xl mx-auto p-6 bg-[#efefef] rounded shadow-md">
        <h2 className="text-3xl font-heading text-center font-bold mb-6 text-primary">
          Pay for: {product.itemName}
        </h2>

        <Elements stripe={stripePromise}>
          <CheckoutForm
            productId={productId}
            price={price}
          />
        </Elements>
      </div>
  );
};

export default PaymentPage;
