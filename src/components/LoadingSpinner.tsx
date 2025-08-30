
"use client";

import { motion } from "framer-motion";
import { Compass } from "lucide-react";

const spinnerVariants = {
  animate: {
    rotate: 360,
    transition: {
      loop: Infinity,
      duration: 2,
      ease: "linear",
    },
  },
};

export const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center gap-4">
    <motion.div variants={spinnerVariants} animate="animate">
      <Compass className="h-12 w-12 text-primary" />
    </motion.div>
    <p className="text-muted-foreground animate-pulse">Loading your dashboard...</p>
  </div>
);
