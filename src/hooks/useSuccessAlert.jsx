import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const useSuccessAlert = () => {
  const navigate = useNavigate();

  const showSuccess = ({ title, text, redirectTo}) => {
    Swal.fire({
      icon: "success",
      title: title || "Success 🎉",
      text: text || "Operation completed successfully.",
      background: "#ffffff",
      color: "#083925",
      confirmButtonColor: "#a8b324",
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
      customClass: {
        popup: "p-6 rounded-lg",
        title: "text-2xl font-bold font-heading",
        content: "text-lg font-medium font-body",
      },
    });

    setTimeout(() => {
      navigate(redirectTo, { replace: true });
    }, 2200);
  };

  return showSuccess;
};

export default useSuccessAlert;
