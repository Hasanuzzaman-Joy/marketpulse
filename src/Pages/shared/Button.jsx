import { motion } from "motion/react";

const Button = ({
  type = "button",
  children,
  disabled,
  onClick,
  className = "",
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1}}
      whileTap={{ scale: 0.8 }}
      transition={{ duration: "0.3", ease:"linear" }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`text-white px-3 py-2 rounded bg-secondary hover:bg-accent transition font-semibold
        ${disabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-secondary hover:bg-accent cursor-pointer"
        } 
        ${className}`}
    >
      {children}
    </motion.button>
  );
};

export default Button;
