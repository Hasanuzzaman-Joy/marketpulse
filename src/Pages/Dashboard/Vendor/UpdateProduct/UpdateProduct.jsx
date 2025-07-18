import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Button from "../../../shared/Button";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const UpdateProduct = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "priceHistory",
  });

  // ✅ GET the product details
  const { data: product = {}, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${productId}`);
      const productData = res.data;

      // Set form values from the fetched product
      setValue("title", productData.title);
      setValue("description", productData.description);
      setValue("price", productData.price);
      setValue("location", productData.location);
      setValue("priceHistory", productData.priceHistory || []);

      return productData;
    },
    enabled: !!productId,
  });

  // ✅ UPDATE product mutation
  const { mutateAsync } = useMutation({
    mutationFn: async (updatedProduct) => {
      const res = await axiosSecure.put(`/update-product/${productId}`, updatedProduct);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Product updated successfully");
      navigate("/dashboard/my-products");
    },
    onError: (error) => {
      toast.error("Failed to update product");
      console.error(error);
    },
  });

  const onSubmit = async (data) => {
    const updatedProduct = {
      title: data.title,
      description: data.description,
      price: parseFloat(data.price),
      location: data.location,
      priceHistory: data.priceHistory,
      updatedAt: new Date(),
      updatedBy: user?.email,
    };

    await mutateAsync(updatedProduct);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Update Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="input input-bordered w-full"
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            className="textarea textarea-bordered w-full"
          ></textarea>
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Price</label>
          <input
            type="number"
            step="0.01"
            {...register("price", { required: "Price is required" })}
            className="input input-bordered w-full"
          />
          {errors.price && <p className="text-red-500">{errors.price.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Location</label>
          <input
            type="text"
            {...register("location", { required: "Location is required" })}
            className="input input-bordered w-full"
          />
          {errors.location && <p className="text-red-500">{errors.location.message}</p>}
        </div>

        {/* ✅ Dynamic Price History */}
        <div>
          <label className="block font-medium">Price History</label>
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="flex flex-col md:flex-row md:items-center gap-2">
                <DatePicker
                  selected={field.date ? new Date(field.date) : new Date()}
                  onChange={(date) => setValue(`priceHistory.${index}.date`, date)}
                  className="input input-bordered"
                  placeholderText="Select Date"
                />
                <input
                  type="number"
                  step="0.01"
                  placeholder="Price"
                  {...register(`priceHistory.${index}.price`, { required: true })}
                  className="input input-bordered w-full"
                />
                <button
                  type="button"
                  className="btn btn-sm btn-error"
                  onClick={() => remove(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-sm btn-outline"
              onClick={() => append({ date: "", price: "" })}
            >
              Add Price History
            </button>
          </div>
        </div>

        <Button type="submit" label="Update Product" />
      </form>
    </div>
  );
};

export default UpdateProduct;
