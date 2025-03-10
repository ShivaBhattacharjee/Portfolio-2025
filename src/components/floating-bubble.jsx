import React, { useState, useEffect } from "react";
import { intros } from "@/constants";

const FloatingBubble = () => {
  const [randomText, setRandomText] = useState("");

  useEffect(() => {
    setRandomText(getRandomIntro());
  }, []);

  const getRandomIntro = () => {
    return intros[Math.floor(Math.random() * intros.length)];
  };

  const handleMouseEnter = () => {
    setRandomText(getRandomIntro());
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      className="w-[150px] transform cursor-pointer rounded-base border-2 border-primary bg-background p-2 duration-75 ease-in hover:scale-125 hover:bg-primary hover:text-secondary hover:outline-secondary"
    >
      <p className="text-center font-cera text-sm font-bold">{randomText}</p>
    </div>
  );
};

export default FloatingBubble;
