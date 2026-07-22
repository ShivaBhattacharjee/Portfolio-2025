"use client";

import { motion } from "motion/react";

// Animated chevrons that flip between collapse/expand states based on `open`.
export function ChevronsUpDownIcon({ open = false, duration = 0.15, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <motion.path
        initial={false}
        animate={{ d: open ? "M7 20L12 15L17 20" : "M7 15L12 20L17 15" }}
        transition={{ duration }}
      />
      <motion.path
        initial={false}
        animate={{ d: open ? "M7 4L12 9L17 4" : "M7 9L12 4L17 9" }}
        transition={{ duration }}
      />
    </svg>
  );
}
