import { motion } from "motion/react";

// Fade In
export const FadeIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: false, amount: 0.2 }}
  >
    {children}
  </motion.div>
);

// Zoom In
export const ZoomIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: false, amount: 0.2 }}
  >
    {children}
  </motion.div>
);

// Slide Up
export const SlideUp = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: false, amount: 0.2 }}
  >
    {children}
  </motion.div>
);

// Slide Left
export const SlideLeft = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: false, amount: 0.2 }}
  >
    {children}
  </motion.div>
);

// Slide Right
export const SlideRight = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: false, amount: 0.2 }}
  >
    {children}
  </motion.div>
);

// Stagger Wrapper
export const StaggerWrapper = ({ children }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    variants={{
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.2,
        },
      },
    }}
    viewport={{ once: false, amount: 0.2 }}
  >
    {children}
  </motion.div>
);
