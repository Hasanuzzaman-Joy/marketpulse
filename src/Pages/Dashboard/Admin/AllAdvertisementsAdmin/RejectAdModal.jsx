import { useForm } from "react-hook-form";
import Modal from "../../../shared/Modal";
import Button from "../../../shared/Button";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useSuccessAlert from "../../../../hooks/useSuccessAlert";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";

const RejectAdModal = ({ ad, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const showSuccess = useSuccessAlert();

  const { mutate, isLoading } = useMutation({
    mutationFn: async ({ adId, reason, feedback }) => {
      const res = await axiosSecure.patch(
        `/reject-advertisement/${adId}?email=${user?.email}`,
        { reason, feedback }
      );

      if (!res?.data) {
        throw new Error(res?.data?.message || "Failed to reject ad");
      }

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-advertisements"]);
      reset();
      onClose();
      showSuccess({
        title: "Advertisement Rejected",
        text: "The advertisement has been successfully rejected.",
        redirectTo: "/dashboard/all-advertisement"
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Rejection Failed ❌",
        text: "Something went wrong. Please try again.",
        showConfirmButton: false,
        timer: 2000,
      });
    },
  });

  const onSubmit = (data) => {
    mutate({ adId: ad._id, ...data });
  };

  if (!ad) return null;

  return (
    <Modal isOpen={!!ad} onClose={onClose}>
      <div className="text-main font-body space-y-3">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-center text-primary">
          Reject Advertisement
        </h2>
        <p className="text-center text-text-secondary">
          Provide a reason and feedback to reject{" "}
          <strong>{ad.title}</strong>.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Reason Input */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Reason
            </label>
            <input
              type="text"
              placeholder="Enter reason for rejection"
              {...register("reason", { required: "Reason is required" })}
              className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-main ${
                errors.reason ? "border-accent" : "border-border"
              }`}
            />
            {errors.reason && (
              <p className="text-red-600 text-sm mt-1">
                {errors.reason.message}
              </p>
            )}
          </div>

          {/* Feedback Input */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Feedback
            </label>
            <textarea
              rows={4}
              placeholder="Optional detailed feedback..."
              {...register("feedback", {
                required: "Feedback is required",
              })}
              className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-main resize-none ${
                errors.feedback ? "border-accent" : "border-border"
              }`}
            ></textarea>
            {errors.feedback && (
              <p className="text-red-600 text-sm mt-1">
                {errors.feedback.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit Rejection"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default RejectAdModal;
