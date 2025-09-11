import React from "react";
import Button from "../../shared/Button";
import { FcGoogle } from "react-icons/fc";

const GoogleSignUpButton = ({ handleGoogle }) => {
  return (
    <Button
      onClick={handleGoogle}
      type="button"
      className="w-full flex items-center justify-center gap-3 mb-6"
      aria-label="Sign up with Google"
    >
      <FcGoogle size={24} />
      <span className="text-white font-medium">Sign up with Google</span>
    </Button>
  );
};

export default GoogleSignUpButton;
