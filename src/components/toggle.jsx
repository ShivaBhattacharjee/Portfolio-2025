import React, { useState } from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import MoonIcon from "./icons/moon";
import SunIcon from "./icons/sun";

const Toggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleMode = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <Button
      variant="ghost"
      onClick={toggleMode}
      className="relative h-12 w-12 overflow-hidden"
    >
      <motion.div
        initial={{ y: 0, opacity: 1 }}
        animate={darkMode ? { y: -40, opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="absolute"
      >
        <SunIcon className="h-6 w-6 text-primary" />
      </motion.div>

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={darkMode ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="absolute"
      >
        <MoonIcon className="h-6 w-6 text-primary" />
      </motion.div>
    </Button>
  );
};

export default Toggle;
