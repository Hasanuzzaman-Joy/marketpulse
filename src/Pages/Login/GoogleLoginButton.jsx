import React from "react";
import Button from "../shared/Button";
import { FcGoogle } from "react-icons/fc";

const GoogleLoginButton = ({ handleGoogle, loading }) => (
  <Button
    type="button"
    className="w-full flex items-center justify-center gap-3 mb-6"
    aria-label="Sign in with Google"
    onClick={handleGoogle}
    disabled={loading}
  >
    <FcGoogle size={24} />
    <span className="text-white font-medium">Sign in with Google</span>
  </Button>
);

export default GoogleLoginButton;
