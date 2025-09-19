"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import Toggle from "@/components/toggle";

import { FaArrowRight, FaBars, FaXmark } from "react-icons/fa6";
import { navLinks } from "@/constants";
import {Press_Start_2P, Zen_Dots} from "next/font/google"
const pressStartFont = Press_Start_2P({subsets: ["latin"], weight : "400"});
const zenDots = Zen_Dots({subsets: ["latin"], weight : "400"});
const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navMenuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (isMenuOpen && window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isMenuOpen &&
        navMenuRef.current &&
        !navMenuRef.current.contains(e.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <>
      <div className="container z-20 flex justify-between gap-5 py-8">
        <Toggle />
        <nav className="max-container flex items-center justify-end">
          <div className="hidden md:block">
            <ul className= {` flex flex-1 items-center gap-14 max-lg:hidden`}>
              {navLinks.map((navLink, index) => {
                return (
                  <li key={index} className={` ${pressStartFont.className} uppercase`}>
                    <Link href={navLink.path}>
                      <p className="text-md font-cera">{navLink.name}</p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <Button
            variant="ghost"
            className="hidden max-lg:block"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FaXmark size="20px" /> : <FaBars size="20px" />}
          </Button>
        </nav>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            ref={navMenuRef}
            initial={{ translateX: "100%" }}
            animate={{ translateX: "0%" }}
            exit={{ translateX: "100%" }}
            transition={{
              duration: 0.3,
              type: "tween",
              ease: "easeInOut",
            }}
            style={{ overflow: "hidden" }}
            className="fixed right-0 z-10 flex h-screen w-[100%] border-primary bg-background"
          >
            <ul className="mx-auto flex h-full flex-col items-center justify-center gap-10 lg:hidden">
              {navLinks.map((navLink, index) => {
                return (
                  <li key={index} className={`${pressStartFont.className}  uppercase`}>
                    <Link href={navLink.path}>
                      <p
                        className="font-cera text-2xl"
                        onClick={() => {
                          setIsMenuOpen(false);
                        }}
                      >
                        {navLink.name}
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavigationBar;
