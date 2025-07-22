import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useRole from "../../hooks/useRole";
import Loading from "../shared/Loading";
import { FaStore, FaCalendarAlt, FaUser, FaCartPlus, FaHeart, FaComment } from "react-icons/fa";
import Button from "../shared/Button";

const ProductDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { userRole, authLoading } = useRole();

  const { data: product, isLoading } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/single-product/${id}`);
      return res.data;
    },
    enabled: !authLoading,
  });

  if (isLoading || authLoading) return <Loading />;

  const {
    itemName,
    pricePerUnit,
    image,
    marketName,
    vendorName,
    vendorEmail,
    date,
    prices,
    marketDescription,
    itemDescription,
  } = product || {};

  return (
    <div className="min-h-screen grid md:grid-cols-1 lg:grid-cols-2 font-body">
      {/* Left: Product Image */}
      <div className="bg-[var(--color-bg-alt)] flex items-center justify-center p-6">
        <img
          src={image}
          alt={itemName}
          className="max-h-[500px] w-auto rounded-2xl shadow-lg"
        />
      </div>

      {/* Right: Info Panel */}
      <div className="bg-white px-8 py-10 flex flex-col justify-center">
        <div className="space-y-5 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-[var(--color-primary)] mb-4">
            {itemName}
          </h2>

          {/* 2-column info grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[var(--color-main)]">
            <p className="flex items-center gap-2">
              <FaStore className="text-[var(--color-accent)]" />{" "}
              <span className="font-medium">Market:</span> {marketName}
            </p>
            <p className="flex items-center gap-2">
              <FaCalendarAlt className="text-[var(--color-accent)]" />{" "}
              <span className="font-medium">Date:</span> {new Date(date).toLocaleDateString()}
            </p>
            <p className="flex items-center gap-2">
              <FaUser className="text-[var(--color-accent)]" />{" "}
              <span className="font-medium">Vendor:</span> {vendorName} ({vendorEmail})
            </p>
            <p className="flex items-center gap-2">
              <FaCartPlus className="text-[var(--color-accent)]" />{" "}
              <span className="font-medium">Price/Unit:</span> ৳{pricePerUnit}
            </p>
          </div>

          {/* Description Sections */}
          <div className="mt-6 space-y-2 text-text-secondary text-sm leading-relaxed">
            <p>
              <span className="font-semibold text-[var(--color-main)]">Item Description:</span>{" "}
              {itemDescription}
            </p>
            <p>
              <span className="font-semibold text-[var(--color-main)]">Market Note:</span>{" "}
              {marketDescription}
            </p>
          </div>

          {/* Price History */}
          <div className="mt-6">
            <h4 className="text-xl font-heading mb-2">Price History</h4>
            <ul className="text-text-secondary list-disc ml-5 text-sm">
              {prices?.map((p, idx) => (
                <li key={idx}>
                  {itemName} — ৳{p.price}/kg ({p.date})
                </li>
              ))}
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-6">
            {userRole !== "admin" && userRole !== "vendor" && (
              <Button className="flex items-center gap-2" aria-label="Add to Watchlist">
                <FaHeart /> Add to Watchlist
              </Button>
            )}
            <Button
              className="flex items-center gap-2 bg-accent hover:bg-yellow-500"
              aria-label="Buy Product"
            >
              <FaCartPlus /> Buy Product
            </Button>
          </div>

          {/* Comments */}
          <div className="mt-10">
            <h4 className="text-xl font-heading mb-2 flex items-center gap-2">
              <FaComment /> User Comments
            </h4>
            <p className="text-sm text-text-secondary">Feature coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
