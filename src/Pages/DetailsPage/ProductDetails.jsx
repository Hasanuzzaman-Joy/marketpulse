import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import { format, isSameDay, parseISO } from "date-fns";
import CircularProgress from "@mui/material/CircularProgress";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import useRole from "../../hooks/useRole";
import useAuth from "../../hooks/useAuth";

import Loading from "../shared/Loading";
import Button from "../shared/Button";
import PriceComparisonChart from "./PriceComparisonChart";

import {
  FaStore,
  FaCalendarAlt,
  FaUser,
  FaCartPlus,
  FaShoppingBag,
  FaStar,
  FaRegStar,
} from "react-icons/fa";

const ProductDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { authLoading } = useRole();
  const navigate = useNavigate();

  // Utilities
  const formatDate = (dateString) =>
    format(new Date(dateString), "dd MMMM, yyyy");
  const formatDateTime = (dateString) =>
    format(new Date(dateString), "dd MMMM, yyyy - hh:mm a");

  const renderStars = (starCount) =>
    [...Array(5)].map((_, i) =>
      i < starCount ? (
        <FaStar key={i} className="text-yellow-400 w-4 h-4" />
      ) : (
        <FaRegStar key={i} className="text-gray-300 w-4 h-4" />
      )
    );

  // State
  const [rating, setRating] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [comparisonData, setComparisonData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Data Fetching
  const { data: product, isLoading } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/single-product/${id}`);
      return res.data;
    },
    enabled: !authLoading,
  });

  useEffect(() => {
    if (product?._id) {
      axiosSecure
        .get(`/comments?productId=${product._id}&email=${user?.email}`)
        .then((res) => setComments(res.data))
        .catch(() => setComments([]));
    }
  }, [product, axiosSecure, user?.email]);

  // Comment Handling
  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!user?.email) return toast.error("Please login to comment");
    if (rating === 0) return toast.error("Please give a rating");
    if (commentText.trim() === "")
      return toast.error("Comment text cannot be empty");

    const newComment = {
      productId: product._id,
      userEmail: user.email,
      userName: user.displayName || user.email,
      rating,
      comment: commentText.trim(),
      date: new Date().toISOString(),
    };

    try {
      setLoading(true);
      const response = await axiosSecure.post(
        `/comments?email=${user?.email}`,
        newComment
      );
      setComments((prev) => [response.data, ...prev]);
      setRating(0);
      setCommentText("");
      toast.success("Comment added");
    } catch (error) {
      toast.error("Failed to add comment");
    } finally {
      setLoading(false);
    }
  };

  // Price Comparison
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

  useEffect(() => {
    if (!selectedDate || !prices?.length) return;

    const selected = parseISO(selectedDate);

    // Use latest price in the prices array as "today"
    const todayPrice = prices[prices.length - 1];
    const prevPrice = prices.find((p) => isSameDay(parseISO(p.date), selected));

    if (prevPrice && todayPrice) {
      setComparisonData([
        {
          name: format(parseISO(prevPrice.date), "dd MMMM, yyyy"),
          price: parseFloat(prevPrice.price),
        },
        {
          name: format(parseISO(todayPrice.date), "dd MMMM, yyyy"),
          price: parseFloat(todayPrice.price),
        },
      ]);
    } else {
      setComparisonData([]);
    }
  }, [selectedDate, prices]);

  const availableDates = prices?.map((p) => p.date).filter((d) => d !== date);

  // Cart Handling
  const addToCartMutation = useMutation({
    mutationFn: (cartItem) =>
      axiosSecure.post(`/cart?email=${user?.email}`, cartItem),
    onSuccess: () => toast.success("Added to Cart"),
    onError: () => toast.error("Failed to add to cart"),
  });

  const handleAddToCart = () => {
    if (!user?.email) return toast.error("Please login to add items to cart");

    const cartItem = {
      productId: product._id,
      itemName,
      pricePerUnit,
      image,
      buyerEmail: user?.email,
      date: new Date().toISOString(),
    };
    addToCartMutation.mutate(cartItem);
  };

  // Loading
  if (isLoading || authLoading) return <Loading />;

  return (
    <section className="w-full md:max-w-screen-xl mx-auto px-4 py-10">
      {/* Product Card */}
      <div className="w-full bg-secondary rounded shadow-lg border border-gray-200 overflow-hidden grid lg:grid-cols-2">
        {/* Image */}
        <div className="bg-bg-alt flex items-center justify-center p-6">
          <img
            src={image}
            alt={itemName}
            className="max-h-[300px] w-auto object-contain"
          />
        </div>

        {/* Product Details */}
        <div className="p-8 flex flex-col justify-center space-y-5 text-base text-left text-white">
          <h2 className="text-2xl md:text-4xl font-bold font-heading">
            {itemName}
          </h2>

          {/* Product Info */}
          <div className="flex flex-col gap-3">
            <p className="flex items-center text-lg gap-2">
              <FaStore className="text-accent" />
              <span className="font-semibold">Market:</span> {marketName}
            </p>
            <p className="flex items-center text-lg gap-2">
              <FaCalendarAlt className="text-accent" />
              <span className="font-semibold">Date:</span> {formatDate(date)}
            </p>
            <p className="flex items-center text-lg gap-2">
              <FaUser className="text-accent" />
              <span className="font-semibold">Vendor:</span> {vendorName} (
              {vendorEmail})
            </p>
            <p className="flex items-center text-lg gap-2">
              <FaCartPlus className="text-accent" />
              <span className="font-semibold">Price/Unit:</span> $
              {parseFloat(pricePerUnit).toFixed(2)}
            </p>
          </div>

          {/* Descriptions */}
          <div className="leading-relaxed space-y-2 pt-2">
            <p className="text-lg">
              <span className="font-semibold">Item Description:</span>{" "}
              {itemDescription}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Market Note:</span>{" "}
              {marketDescription}
            </p>
          </div>

          {/* Price History */}
          {/* <div>
            <h4 className="font-semibold text-lg mt-4 mb-2">
              Price History
            </h4>
            <ul className="list-disc ml-5">
              {prices?.map((p, idx) => (
                <li className="text-lg" key={idx}>
                  {itemName} — ${parseFloat(p.price).toFixed(2)}/kg (
                  {formatDate(p.date)})
                </li>
              ))}
            </ul>
          </div> */}

          {/* Buttons */}
          {user && (
            <div className="flex flex-wrap gap-4 mt-4">
              <Button
                onClick={handleAddToCart}
                className="flex items-center gap-2 bg-yellow-500 hover:bg-accent duration-300 transition-all"
                aria-label="Add to Cart"
              >
                <FaCartPlus /> Add to Cart
              </Button>
              <Button
                onClick={() => navigate(`/payment/${product._id}`)}
                className="flex items-center gap-2 bg-yellow-500 hover:bg-accent duration-300 transition-all"
              >
                <FaShoppingBag /> Buy Product
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Price Comparison Chart */}
      {availableDates?.length > 0 && (
        <div className="mt-16 mx-auto">
          <h4 className="text-2xl md:text-3xl text-primary font-bold mb-4">
            Compare Price with Previous Date
          </h4>
          <div className="relative w-64">
            <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2c2b2b]" />
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-gray-300 border-[1px] rounded text-[#2c2b2b] text-base font-medium focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
            >
              <option value="">Select a Previous Date</option>
              {availableDates.map((d, idx) => (
                <option key={idx} value={d}>
                  {formatDate(d)}
                </option>
              ))}
            </select>
          </div>

          {comparisonData.length > 0 && (
            <PriceComparisonChart data={comparisonData} />
          )}
        </div>
      )}

      {/* Comments Section */}
      <div className="mt-10 mx-auto">
        <h3 className="text-2xl md:text-3xl text-primary font-bold mb-4">
          Comments & Ratings
        </h3>

        {user && (
          <form onSubmit={handleSubmitComment} className="mb-6 space-y-4">
            <div>
              <label className="block font-semibold mb-1">Your Rating:</label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none cursor-pointer"
                    aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                  >
                    {star <= rating ? (
                      <FaStar className="text-yellow-400 w-6 h-6" />
                    ) : (
                      <FaRegStar className="text-gray-300 w-6 h-6" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="comment" className="block font-semibold mb-1">
                Your Comment:
              </label>
              <textarea
                id="comment"
                rows={4}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 resize-y focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Write your comment here..."
                required
                disabled={loading}
              />
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? (
                <div className="flex gap-2 items-center justify-center">
                  <CircularProgress size={20} sx={{ color: "white" }} />
                  Posting...
                </div>
              ) : (
                "Submit Comment"
              )}
            </Button>
          </form>
        )}

        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-gray-500">No comments yet.</p>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {comments.map((c) => (
                <div
                  key={c._id}
                  className="border border-gray-200 rounded p-4 bg-white shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold text-lg text-secondary">
                      {c.userName}
                    </p>
                    <div className="flex">{renderStars(c.rating)}</div>
                  </div>
                  <p className="text-gray-700 text-base font-normal">
                    {c.comment}
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    {formatDateTime(c.date)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <ToastContainer />
    </section>
  );
};

export default ProductDetails;
