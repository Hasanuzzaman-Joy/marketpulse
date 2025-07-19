import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import CircularProgress from "@mui/material/CircularProgress";
import { toast, ToastContainer } from "react-toastify";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Button from "../../../shared/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import useSuccessAlert from "../../../../hooks/useSuccessAlert";
import useImageUpload from "../../../../hooks/useImageUpload";
import useRole from "../../../../hooks/useRole";
import Loading from "../../../shared/Loading";

const UpdateProduct = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const showSuccess = useSuccessAlert();
  const queryClient = useQueryClient();
  const { imgURL, imgLoading, handleImageUpload, setImgURL } = useImageUpload();
  const { userRole, roleLoading } = useRole();

  const [date, setDate] = useState(new Date());

  const formatDate = (dateObj) => {
    if (!dateObj) return "";
    const d = new Date(dateObj);
    return d.toISOString().split("T")[0];
  };

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      prices: [{ date: formatDate(new Date()), price: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "prices",
  });

  //  Fetch product data
  const { data: productData, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/single-product/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // Prefill form after product is fetched
  useEffect(() => {
    if (productData) {
      setDate(new Date(productData.date));
      setImgURL(productData.image);

      reset({
        marketName: productData.marketName,
        itemName: productData.itemName,
        pricePerUnit: productData.pricePerUnit,
        marketDescription: productData.marketDescription,
        itemDescription: productData.itemDescription || "",
        prices: productData.prices || [{ date: formatDate(new Date()), price: "" }],
      });
    }
  }, [productData, reset, setImgURL]);

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async (updatedData) => {
      return await axiosSecure.patch(`/modify-product/${id}?email=${user?.email}`, updatedData);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["product", id]);

      if (userRole && !roleLoading) {
        const redirectPath = userRole === "admin"
          ? "/dashboard/all-products"
          : "/dashboard/my-products";

        showSuccess({
          title: "Updated Successfully",
          text: "Your product has been successfully updated.",
          redirectTo: redirectPath,
        });
      }
    },
    onError: () => {
      toast.error("Failed to update product. Try again.");
    },
  });

  const onSubmit = async (data) => {
    if (!imgURL) {
      toast.error("Please upload an image.");
      return;
    }

    const updatedProduct = {
      marketName: data.marketName,
      date,
      itemName: data.itemName,
      pricePerUnit: data.pricePerUnit,
      image: imgURL,
      marketDescription: data.marketDescription,
      itemDescription: data.itemDescription,
      prices: data.prices.map((entry) => ({
        date: entry.date,
        price: parseFloat(entry.price),
      })),
    };

    updateMutation.mutate(updatedProduct);
  };

  if (isLoading) return <Loading />

  return (
    <div className="w-full mx-auto p-6 md:p-12 bg-white rounded shadow-xl text-main font-body">
      <h3 className="text-3xl font-heading font-bold mb-2 text-secondary">
        Update Product
      </h3>
      <p className="text-text-secondary mb-8 leading-relaxed">
        Edit the product details and submit updates for review.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="mb-1 text-text-secondary font-medium">
              Vendor Email
            </label>
            <input
              value={productData?.vendorEmail || ""}
              readOnly
              className="w-full border border-border bg-gray-100 cursor-not-allowed rounded-md px-6 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-text-secondary font-medium">
              Vendor Name
            </label>
            <input
              value={productData?.vendorName || ""}
              readOnly
              className="w-full border border-border bg-gray-100 cursor-not-allowed rounded-md px-6 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-text-secondary font-medium">Market Name</label>
            <input
              {...register("marketName", { required: "Market name is required" })}
              className="w-full border border-border rounded-md px-6 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
            />
            {errors.marketName && (
              <span className="text-red-500 text-sm">{errors.marketName.message}</span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-text-secondary font-medium">Date</label>
            <DatePicker
              selected={date}
              onChange={(d) => setDate(d)}
              dateFormat="yyyy-MM-dd"
              className="w-full border border-border rounded-md px-6 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-text-secondary font-medium">Item Name</label>
            <input
              {...register("itemName", { required: "Item name is required" })}
              className="w-full border border-border rounded-md px-6 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-text-secondary font-medium">
              Price per Unit
            </label>
            <input
              {...register("pricePerUnit", { required: "Price per unit is required" })}
              className="w-full border border-border rounded-md px-6 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div className="flex flex-col md:col-span-2">
            <label className="mb-1 text-text-secondary font-medium">Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={imgLoading}
              className="file:bg-secondary file:text-white file:cursor-pointer file:px-6 file:py-2 file:border-0 file:mr-3 w-full border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
            />
            {imgLoading ? (
              <div className="flex gap-2 text-secondary mt-2">
                <CircularProgress size={20} sx={{ color: "#0a472e" }} />
                Uploading image...
              </div>
            ) : (
              (imgURL || productData?.image) && (
                <img
                  src={imgURL || productData.image}
                  alt="Preview"
                  className="mt-4 w-32 h-32 object-cover border rounded"
                />
              )
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-text-secondary font-medium">Market Description</label>
          <textarea
            {...register("marketDescription", {
              required: "Market description is required",
            })}
            rows={4}
            className="w-full border border-border rounded-md px-6 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div className="space-y-4">
          <label className="text-text-secondary font-medium">Price History</label>
          {fields.map((field, index) => (
            <div key={field.id} className="flex flex-col md:flex-row gap-4 mt-1">
              <div className="w-full">
                <DatePicker
                  selected={new Date(field.date)}
                  onChange={(date) =>
                    setValue(`prices.${index}.date`, date, { shouldValidate: true })
                  }
                  dateFormat="yyyy-MM-dd"
                  className="w-full border border-border rounded-md px-6 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div className="flex w-full items-center gap-2">
                <input
                  {...register(`prices.${index}.price`, {
                    required: "Price is required",
                  })}
                  className="w-full border border-border rounded-md px-6 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
                />
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-secondary font-bold text-xl"
                  >
                    &times;
                  </button>
                )}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => append({ date: formatDate(new Date()), price: "" })}
            className="text-secondary hover:text-accent font-medium"
          >
            + Add Price Entry
          </button>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-text-secondary font-medium">
            Item Description (optional)
          </label>
          <textarea
            {...register("itemDescription")}
            rows={3}
            className="w-full border border-border rounded-md px-6 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <Button type="submit" disabled={isSubmitting || updateMutation.isPending}>
          {isSubmitting || updateMutation.isPending ? (
            <div className="flex gap-2 items-center justify-center">
              <CircularProgress size={20} sx={{ color: "white" }} />
              Updating...
            </div>
          ) : (
            "Update Product"
          )}
        </Button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UpdateProduct;
