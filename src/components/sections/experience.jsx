"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ExperienceCard = ({ role, company, year, responsibilities }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIsOpen((prev) => !prev);
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    }
  };

  return (
    <>
      <motion.header initial={false} onClick={handleToggle}>
        <div className="w-full border-2 cursor-pointer select-none border-primary rounded-md mb-2 p-4 hover:bg-primary hover:text-secondary">
          <h1>{role}</h1>
          <p className="text-sm">{year}</p>
        </div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.section
              key="content"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: "auto" },
                collapsed: { opacity: 0, height: 0 },
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className="overflow-hidden"
            >
              <div className="p-4">
                <div className="border-l-2 border-primary px-8 py-4">
                  <div className="mb-6 space-y-1">
                    <p className="font-cera font-bold text-xl">{role}</p>
                    <p className="text-sm">{company}</p>
                    <p className="text-sm">{year}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-cera font-medium text-lg">
                      Key Responsibilities
                    </p>
                    <ul className="list-disc list-inside">
                      {responsibilities.map((responsibility, index) => (
                        <li key={index}>{responsibility}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default ExperienceCard;
