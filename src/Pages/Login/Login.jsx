import React, { useEffect } from "react";
import { useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import useSuccessAlert from "../../hooks/useSuccessAlert";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";

const Login = () => {
  const { loading, setLoading, googleSign, login } = useAuth();
  const axiosInstance = useAxios();
  const successSwal = useSuccessAlert();
  const location = useLocation();
  const from = location.state?.from || "/";

  useEffect(() => {
    document.title = "MarketPulse - Login";
  }, []);

  // Google login handler
  const handleGoogle = () => {
    setLoading(true);
    googleSign()
      .then(async (userCredential) => {
        const user = userCredential.user;
        try {
          await axiosInstance.patch("/update-last-login", { email: user.email });
          successSwal({ title: "Login Successful 🎉", text: "Welcome back!", redirectTo: from });
        } catch (updateError) {
          if (updateError.response?.status === 404) {
            await axiosInstance.post("/register", {
              name: user?.displayName,
              email: user?.email,
              photo: user?.photoURL,
            });
            successSwal({ title: "Registration Complete 🎉", text: "Welcome!", redirectTo: from });
          } else throw updateError;
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  // Form login handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;

    login(email, password)
      .then(() => axiosInstance.patch("/update-last-login", { email }))
      .then(() => axiosInstance.post("/jwt", { email }))
      .then((res) => {
        localStorage.setItem("token", res.data?.token);
        successSwal({ title: "Login Successful 🎉", text: "Welcome back!", redirectTo: from });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen grid md:grid-cols-1 lg:grid-cols-2 font-body">
      <LeftSection />
      <RightSection handleGoogle={handleGoogle} handleSubmit={handleSubmit} loading={loading} />
    </div>
  );
};

export default Login;
