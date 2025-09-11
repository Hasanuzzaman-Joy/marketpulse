import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import CheckoutForm from "./CheckoutForm";
import Loading from "../shared/Loading";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);

const PaymentPage = () => {
  const { user, loading } = useAuth();
  const { productId } = useParams();
  const axiosSecure = useAxiosSecure();

  // Fetch single product
  const { data: product, isLoading } = useQuery({
    queryKey: ["paymentProduct", productId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/single-product/${productId}`);
      return res.data;
    },
    enabled: user?.email && !!productId,
  });

  if (!product) {
    toast.error("Product not found.");
    return null;
  }

  const price = parseFloat(product.pricePerUnit);
  if (isNaN(price)) {
    toast.error("Invalid price.");
    return null;
  }

  if (!user && loading && isLoading) return <Loading />;

  return (
    <section className="w-full bg-gray-100 py-10">
      <div className="w-full md:w-[700px] mx-auto px-4 bg-secondary py-10">
        <h2 className="text-3xl font-heading text-center font-bold mb-6 text-white">
          Pay for: {product.itemName}
        </h2>

        <Elements stripe={stripePromise}>
          <CheckoutForm productId={productId} price={price} />
        </Elements>
      </div>
    </section>
  );
};

export default PaymentPage;
