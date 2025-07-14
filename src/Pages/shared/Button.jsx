import React from "react";

const Button = ({
  type = "button",
  children,
  disabled,
  onClick,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`text-white px-3 py-2 rounded bg-secondary hover:bg-accent transition font-semibold
        ${
          disabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-secondary hover:bg-accent cursor-pointer"
        } 
        ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
