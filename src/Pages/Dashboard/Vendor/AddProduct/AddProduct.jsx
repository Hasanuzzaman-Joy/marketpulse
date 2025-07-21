import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Button from "../../../shared/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import useImageUpload from "../../../../hooks/useImageUpload";
import useSuccessAlert from "../../../../hooks/useSuccessAlert";

const AddProduct = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const showSuccess = useSuccessAlert();
  const { imgURL, imgLoading, handleImageUpload } = useImageUpload();
  const [date, setDate] = useState(new Date());

  const formatDate = (dateObj) => {
    if (!dateObj) return "";
    const d = new Date(dateObj);
    return d.toISOString().split("T")[0];
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setValue,
    watch
  } = useForm({
    defaultValues: {
      prices: [{ date: formatDate(new Date()), price: "" }],
    },
  });


  const prices = watch("prices");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "prices",
  });

  const onSubmit = async (data) => {
    if (!imgURL) {
      toast.error("Please upload an image first.");
      return;
    }

    const product = {
      vendorEmail: user?.email,
      vendorName: user?.displayName,
      marketName: data.marketName,
      date,
      marketDescription: data.marketDescription,
      itemName: data.itemName,
      status: "pending",
      image: imgURL,
      pricePerUnit: data.pricePerUnit,
      prices: data.prices.map((entry) => ({
        date: entry.date,
        price: parseFloat(entry.price),
      })),
      itemDescription: data.itemDescription,
    };

    try {
      await axiosSecure.post(`/add-products?email=${user?.email}`, product);
      showSuccess({
        title: "Product Added 🎉",
        text: "Your product was successfully submitted and is pending approval.",
        redirectTo: "/dashboard/my-products",
      });
    } catch {
      toast.error("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="w-full mx-auto p-6 md:p-12 bg-white rounded shadow-xl text-main font-body">
      <h3 className="text-3xl font-heading font-bold mb-2 text-secondary">
        Add Market Product
      </h3>
      <p className="text-text-secondary mb-8 leading-relaxed">
        Submit daily price updates for local items to keep users informed and
        improve transparency in your local market.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Vendor Email */}
          <div className="flex flex-col">
            <label className="mb-1 text-text-secondary font-medium">
              Vendor Email
            </label>
            <input
              value={user?.email || ""}
              readOnly
              className="w-full border border-border bg-gray-100 cursor-not-allowed rounded-md px-6 py-3 text-main text-base focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Vendor Name */}
          <div className="flex flex-col">
            <label className="mb-1 text-text-secondary font-medium">
              Vendor Name
            </label>
            <input
              value={user?.displayName || ""}
              readOnly
              className="w-full border border-border bg-gray-100 cursor-not-allowed rounded-md px-6 py-3 text-main text-base focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Market Name */}
          <div className="flex flex-col">
            <label className="mb-1 text-text-secondary font-medium">
              Market Name
            </label>
            <input
              {...register("marketName", {
                required: "Market name is required",
              })}
              placeholder="e.g., Karwan Bazar"
              className="w-full border border-border rounded-md px-6 py-3 text-main text-base focus:outline-none focus:ring-2 focus:ring-accent"
            />
            {errors.marketName && (
              <span className="text-sm text-red-500 mt-1">
                {errors.marketName.message}
              </span>
            )}
          </div>

          {/* Date */}
          <div className="flex flex-col">
            <label className="mb-1 text-text-secondary font-medium">Date</label>
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              dateFormat="yyyy-MM-dd"
              className="w-full border border-border rounded-md px-6 py-3 text-main text-base focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Item Name */}
          <div className="flex flex-col">
            <label className="mb-1 text-text-secondary font-medium">
              Item Name
            </label>
            <input
              {...register("itemName", {
                required: "Item name is required",
              })}
              placeholder="e.g., Onion"
              className="w-full border border-border rounded-md px-6 py-3 text-main text-base focus:outline-none focus:ring-2 focus:ring-accent"
            />
            {errors.itemName && (
              <span className="text-sm text-red-500 mt-1">
                {errors.itemName.message}
              </span>
            )}
          </div>

          {/* Price Per Unit */}
          <div className="flex flex-col">
            <label className="mb-1 text-text-secondary font-medium">
              Price per Unit
            </label>
            <input
              {...register("pricePerUnit", {
                required: "Price per unit is required",
              })}
              placeholder="e.g., $30 per kg"
              className="w-full border border-border rounded-md px-6 py-3 text-main text-base focus:outline-none focus:ring-2 focus:ring-accent"
            />
            {errors.pricePerUnit && (
              <span className="text-sm text-red-500 mt-1">
                {errors.pricePerUnit.message}
              </span>
            )}
          </div>

          {/* Image Upload */}
          <div className="flex flex-col md:col-span-2">
            <label className="mb-1 text-text-secondary font-medium">
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={imgLoading}
              className="file:bg-secondary file:text-white file:cursor-pointer file:px-6 file:py-3 file:border-0 file:mr-3 w-full border border-border rounded-md text-main text-base focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
              required
            />
            {imgLoading && (
              <div className="flex gap-2 text-secondary mt-2">
                <CircularProgress size={20} sx={{ color: "#0a472e" }} />
                Uploading image...
              </div>
            )}
          </div>
        </div>

        {/* Market Description */}
        <div className="flex flex-col">
          <label className="mb-1 text-text-secondary font-medium">
            Market Description
          </label>
          <textarea
            {...register("marketDescription", {
              required: "Market description is required",
            })}
            rows={4}
            placeholder="Describe market location, history, etc."
            className="w-full border border-border rounded-md px-6 py-3 text-main text-base resize-none focus:outline-none focus:ring-2 focus:ring-accent"
          />
          {errors.marketDescription && (
            <span className="text-sm text-red-500 mt-1">
              {errors.marketDescription.message}
            </span>
          )}
        </div>

        {/* Price History Inputs */}
        <div className="space-y-4">
          <label className="text-text-secondary font-medium">Price History</label>

          {fields.map((field, index) => {
            const priceDate = prices?.[index]?.date || new Date();
            return (
              <div
                key={field.id}
                className="flex flex-col w-full md:flex-row md:items-center md:gap-4 gap-2 mt-1"
              >
                {/* Date Picker Field */}
                <div className="w-full">
                  <DatePicker
                    selected={priceDate ? new Date(priceDate) : new Date()}
                    onChange={(date) => {
                      setValue(`prices.${index}.date`, date.toISOString().split("T")[0], {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }}
                    dateFormat="yyyy-MM-dd"
                    wrapperClassName="w-full"
                    className="w-full border border-border rounded-md px-6 py-3 text-main text-base focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <input
                    type="hidden"
                    {...register(`prices.${index}.date`, {
                      required: "Date is required",
                    })}
                  />
                </div>

                {/* Price input with remove button */}
                <div className="flex w-full items-center gap-2">
                  <input
                    {...register(`prices.${index}.price`, {
                      required: "Price is required",
                    })}
                    placeholder="e.g., $30 per kg"
                    className="w-full border border-border rounded-md px-6 py-3 text-main text-base focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-secondary font-bold text-xl cursor-pointer"
                    >
                      &times;
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          <button
            type="button"
            onClick={() => append({ date: formatDate(new Date()), price: "" })}
            className="text-secondary hover:text-accent font-medium cursor-pointer"
          >
            + Add Price Entry
          </button>
        </div>

        {/* Item Description */}
        <div className="flex flex-col">
          <label className="mb-1 text-text-secondary font-medium">
            Item Description (optional)
          </label>
          <textarea
            {...register("itemDescription")}
            rows={3}
            placeholder="Fresh, high-quality onions..."
            className="w-full border border-border rounded-md px-6 py-3 text-main text-base resize-none focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Submit Button */}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <div className="flex gap-2 items-center justify-center">
              <CircularProgress size={20} sx={{ color: "white" }} />
              Submitting...
            </div>
          ) : (
            "Submit Product"
          )}
        </Button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default AddProduct;