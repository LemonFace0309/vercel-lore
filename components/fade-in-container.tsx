"use client";

import { motion } from "framer-motion";

type FadeInContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function FadeInContainer({ children, className }: FadeInContainerProps) {
  return (
    <motion.div
      variants={{
        initial: {
          opacity: 0,
          display: "none",
        },
        visible: {
          opacity: 1,
          display: "flex",
        },
      }}
      initial="initial"
      animate="visible"
      transition={{
        duration: 1.0,
        delay: 2.4,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
