import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useRole from "../../hooks/useRole";
import Loading from "../shared/Loading";
import {
  FaStore,
  FaCalendarAlt,
  FaUser,
  FaCartPlus,
  FaHeart,
  FaStar,
  FaRegStar,
} from "react-icons/fa";
import Button from "../shared/Button";
import Container from "../shared/Container";
import useAuth from "../../hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";
import PriceComparisonChart from "./PriceComparisonChart";

const ProductDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { userRole, authLoading } = useRole();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Product data fetch
  const { data: product, isLoading } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/single-product/${id}`);
      return res.data;
    },
    enabled: !authLoading,
  });

  // Wishlist mutation
  const addToWishlistMutation = useMutation({
    mutationFn: ({ productId }) =>
      axiosSecure.post(`/wishlist?email=${user?.email}`, { productId }),

    onSuccess: () => {
      toast.success("Added to wishlist");
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },

    onError: () => {
      toast.error("Failed to add to wishlist");
    },
  });

  const handleAddToWishlist = (productId) => {
    if (!user?.email) {
      toast.error("Please login first to add to wishlist");
      return;
    }
    addToWishlistMutation.mutate({ productId });
  };

  // Comments state
  const [rating, setRating] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  // Fetch comments on product load
  useEffect(() => {
    if (product?._id) {
      axiosSecure
        .get(`/comments?productId=${product._id}&email=${user?.email}`)
        .then((res) => setComments(res.data))
        .catch(() => setComments([]));
    }
  }, [product, axiosSecure, user?.email]);

  // Post comment mutation
  const postCommentMutation = useMutation({
    mutationFn: (newComment) =>
      axiosSecure.post(`/comments?email=${user?.email}`, newComment),

    onSuccess: (res, variables) => {
      toast.success("Comment added");
      // Add new comment at the top of comments list
      setComments((prev) => [variables, ...prev]);
      setRating(0);
      setCommentText("");
    },

    onError: () => {
      toast.error("Failed to add comment");
    },
  });

  const handleSubmitComment = (e) => {
    e.preventDefault();

    if (!user?.email) {
      toast.error("Please login to comment");
      return;
    }

    if (rating === 0) {
      toast.error("Please give a rating");
      return;
    }

    if (commentText.trim() === "") {
      toast.error("Comment text cannot be empty");
      return;
    }

    const newComment = {
      productId: product._id,
      userEmail: user.email,
      userName: user.displayName || user.email,
      rating,
      comment: commentText.trim(),
      date: new Date().toISOString(),
    };

    postCommentMutation.mutate(newComment);
  };

  // Render star rating for comments
  const renderStars = (starCount) => {
    return [...Array(5)].map((_, i) =>
      i < starCount ? (
        <FaStar key={i} className="text-yellow-400 w-4 h-4" />
      ) : (
        <FaRegStar key={i} className="text-gray-300 w-4 h-4" />
      )
    );
  };

  const [selectedDate, setSelectedDate] = useState("");
  const [comparisonData, setComparisonData] = useState([]);

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

  const formatDate = (d) => new Date(d).toISOString().split("T")[0];

  useEffect(() => {
    if (!selectedDate || !prices?.length || !date) return;

    const todayPrice = prices.find(p => formatDate(p.date) === formatDate(date));
    const prevPrice = prices.find(p => formatDate(p.date) === selectedDate);

    if (todayPrice && prevPrice) {
      setComparisonData([
        {
          name: new Date(selectedDate).toLocaleDateString(),
          price: parseFloat(prevPrice.price),
        },
        {
          name: new Date(date).toLocaleDateString(),
          price: parseFloat(todayPrice.price),
        },
      ]);
    } else {
      setComparisonData([]);
    }
  }, [selectedDate, prices, date]);

  const availableDates = prices
    ?.map((p) => p.date)
    .filter((d) => d !== date);

  if (isLoading || authLoading) return <Loading />

  return (
    <Container>
      {/* Product Card */}
      <div className="w-full bg-[#f4f3f3] rounded-xl shadow-lg border border-gray-200 overflow-hidden grid lg:grid-cols-2">
        {/* Product Image Section */}
        <div className="bg-bg-alt flex items-center justify-center p-6">
          <img
            src={image}
            alt={itemName}
            className="max-h-[300px] w-auto object-contain"
          />
        </div>

        <div className="p-8 flex flex-col justify-center space-y-5 text-base text-left text-primary">
          <h2 className="text-3xl md:text-4xl font-bold">{itemName}</h2>

          {/* Product Info */}
          <div className="flex flex-col gap-3">
            <p className="flex items-center gap-2 text-main">
              <FaStore className="text-accent" />
              <span className="font-semibold text-main">Market:</span>{" "}
              {marketName}
            </p>
            <p className="flex items-center gap-2 text-main">
              <FaCalendarAlt className="text-accent" />
              <span className="font-semibold text-main">Date:</span>{" "}
              {new Date(date).toLocaleDateString()}
            </p>
            <p className="flex items-center gap-2 text-main">
              <FaUser className="text-accent" />
              <span className="font-semibold text-main">Vendor:</span>{" "}
              {vendorName} ({vendorEmail})
            </p>
            <p className="flex items-center gap-2 text-main">
              <FaCartPlus className="text-accent" />
              <span className="font-semibold text-main">Price/Unit:</span> $
              {parseFloat(pricePerUnit).toFixed(2)}
            </p>
          </div>

          {/* Descriptions */}
          <div className="leading-relaxed space-y-2 pt-2 text-text-secondary">
            <p>
              <span className="font-semibold text-secondary">
                Item Description:
              </span>{" "}
              {itemDescription}
            </p>
            <p>
              <span className="font-semibold text-secondary">Market Note:</span>{" "}
              {marketDescription}
            </p>
          </div>

          {/* Price History */}
          <div>
            <h4 className="font-semibold mt-4 mb-2 text-secondary">
              Price History
            </h4>
            <ul className="list-disc ml-5 text-text-secondary">
              {prices?.map((p, idx) => (
                <li key={idx}>
                  {itemName} — ${parseFloat(p.price).toFixed(2)}/kg ({p.date})
                </li>
              ))}
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-4">
            <Button
              onClick={() => handleAddToWishlist(product._id)}
              disabled={
                addToWishlistMutation.isLoading ||
                userRole === "admin" ||
                userRole === "vendor"
              }
              className={`flex items-center gap-2 ${addToWishlistMutation.isLoading ||
                userRole === "admin" ||
                userRole === "vendor"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-yellow-500"
                }`}
              aria-label="Add to Watchlist"
            >
              <FaHeart /> Add to Watchlist
            </Button>

            <Button
              onClick={() => navigate(`/payment/${product._id}`)}
              className="flex items-center gap-2 bg-accent hover:bg-yellow-500"
            >
              <FaCartPlus /> Buy Product
            </Button>
          </div>
        </div>
      </div>

      {/* CHART */}
      <div className="mt-20 mx-auto">
        {availableDates?.length > 0 && (
          <div className="mt-8">
            <h4 className="font-semibold text-3xl mb-2 text-secondary">
              Compare Price with Previous Date
            </h4>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded focus:outline-none cursor-pointer"
            >
              <option value="">Select a Previous Date</option>
              {availableDates.map((d, idx) => (
                <option key={idx} value={d}>
                  {new Date(d).toLocaleDateString()}
                </option>
              ))}
            </select>

            {comparisonData.length > 0 && (
              <PriceComparisonChart data={comparisonData} />
            )}
          </div>
        )}
      </div>

      {/* COMMENT SECTION BELOW CARD */}
      <div className="mt-10 mx-auto">
        <h3 className="text-2xl font-semibold mb-4">Comments & Ratings</h3>

        {/* Comment submission form */}
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
              />
            </div>

            <Button type="submit" disabled={postCommentMutation.isLoading}>
              {postCommentMutation.isLoading ? "Posting..." : "Submit Comment"}
            </Button>
          </form>
        )}

        {/* Comments list */}
        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-gray-500">No comments yet.</p>
          ) : (
            comments.map((c) => (
              <div
                key={c._id}
                className="border border-gray-200 rounded p-4 bg-white shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold">
                    {c.userName} ({c.userEmail})
                  </p>
                  <div className="flex">{renderStars(c.rating)}</div>
                </div>
                <p className="text-gray-700">{c.comment}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(c.date).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      <ToastContainer />
    </Container>
  );
};

export default ProductDetails;
