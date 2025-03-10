"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Skull } from "lucide-react";

const FloatingSkull = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIframe = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Skull Button - Fixed position that doesn't affect layout */}
      <motion.div
        className="fixed bottom-8 bg-black/5 dark:bg-white/10 p-3 rounded-full right-8 z-10 cursor-pointer"
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        onClick={toggleIframe}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Skull />
      </motion.div>

      {/* Iframe Container - Portal that doesn't affect layout */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="relative h-3/4 w-full max-w-4xl overflow-hidden rounded-lg bg-black"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <button
                className="absolute right-4 top-4 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white"
                onClick={toggleIframe}
              >
                ×
              </button>
              <iframe
                src="https://jcw87.github.io/c2-sans-fight/"
                className="h-full w-full border-0"
                title="Sans Fight"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingSkull;
