import { motion } from "motion/react";

const ZoomIn = ({children}) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ amount: 0.2 }}
        >
            {children}
        </motion.div>
    );
};

export default ZoomIn;