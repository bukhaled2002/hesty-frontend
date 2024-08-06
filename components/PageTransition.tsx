"use client";
import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
};

function PageTransition({ children }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
      className="overflow-hidden"
    >
      {children}
    </motion.div>
  );
}

export default PageTransition;
