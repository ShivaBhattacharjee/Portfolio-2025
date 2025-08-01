"use client"
import { useEffect, useRef, useState } from 'react';

const SPRITE_SETS = {
  idle: [[-3, -3]],
  alert: [[-7, -3]],
  scratchSelf: [[-5, 0], [-6, 0], [-7, 0]],
  scratchWallN: [[0, 0], [0, -1]],
  scratchWallS: [[-7, -1], [-6, -2]],
  scratchWallE: [[-2, -2], [-2, -3]],
  scratchWallW: [[-4, 0], [-4, -1]],
  tired: [[-3, -2]],
  sleeping: [[-2, 0], [-2, -1]],
  N: [[-1, -2], [-1, -3]],
  NE: [[0, -2], [0, -3]],
  E: [[-3, 0], [-3, -1]],
  SE: [[-5, -1], [-5, -2]],
  S: [[-6, -3], [-7, -2]],
  SW: [[-5, -3], [-6, -1]],
  W: [[-4, -2], [-4, -3]],
  NW: [[-1, 0], [-1, -1]],
};

const NEKO_SPEED = 15;

export default function OnekoCat() {
  const nekoRef = useRef(null);
  const [nekoPos, setNekoPos] = useState({ x: 32, y: 32 }); // Default position
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [frameCount, setFrameCount] = useState(0);
  const [idleTime, setIdleTime] = useState(0);
  const [idleAnimation, setIdleAnimation] = useState(null);
  const [idleAnimationFrame, setIdleAnimationFrame] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const lastFrameTimestamp = useRef(null);
  const animationFrameId = useRef(null);

  const setSprite = (name, frame) => {
    if (!nekoRef.current) return;
    const sprite = SPRITE_SETS[name][frame % SPRITE_SETS[name].length];
    nekoRef.current.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
  };

  const resetIdleAnimation = () => {
    setIdleAnimation(null);
    setIdleAnimationFrame(0);
  };

  useEffect(() => {
    // Initialize position based on screen size after component mounts
    if (!isInitialized && typeof window !== 'undefined') {
      const isMobile = window.innerWidth <= 768;
      const initialX = isMobile ? window.innerWidth - 64 : 32;
      const initialY = 32;
      
      setNekoPos({ x: initialX, y: initialY });
      setIsInitialized(true);
    }

    const handleMouseMove = (event) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    const handleResize = () => {
      // Reposition cat on screen resize to avoid UI conflicts
      const isMobile = window.innerWidth <= 768;
      setNekoPos(prev => ({
        x: Math.min(Math.max(16, prev.x), window.innerWidth - 16),
        y: Math.min(Math.max(16, prev.y), window.innerHeight - 16)
      }));
    };

    const handleIdleLocal = () => {
      setIdleTime(prev => prev + 1);

      if (idleTime > 10 && Math.floor(Math.random() * 200) === 0 && !idleAnimation) {
        const availableIdleAnimations = ["sleeping", "scratchSelf"];
        if (nekoPos.x < 32) availableIdleAnimations.push("scratchWallW");
        if (nekoPos.y < 32) availableIdleAnimations.push("scratchWallN");
        if (nekoPos.x > window.innerWidth - 32) availableIdleAnimations.push("scratchWallE");
        if (nekoPos.y > window.innerHeight - 32) availableIdleAnimations.push("scratchWallS");

        setIdleAnimation(availableIdleAnimations[Math.floor(Math.random() * availableIdleAnimations.length)]);
      }

      switch (idleAnimation) {
        case "sleeping":
          if (idleAnimationFrame < 8) {
            setSprite("tired", 0);
            break;
          }
          setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
          if (idleAnimationFrame > 192) resetIdleAnimation();
          break;
        case "scratchWallN":
        case "scratchWallS":
        case "scratchWallE":
        case "scratchWallW":
        case "scratchSelf":
          setSprite(idleAnimation, idleAnimationFrame);
          if (idleAnimationFrame > 9) resetIdleAnimation();
          break;
        default:
          setSprite("idle", 0);
          return;
      }
      setIdleAnimationFrame(prev => prev + 1);
    };

    const handleFrameLocal = () => {
      if (!nekoRef.current) return;

      setFrameCount(prev => prev + 1);
      const diffX = nekoPos.x - mousePos.x;
      const diffY = nekoPos.y - mousePos.y;
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

      if (distance < NEKO_SPEED || distance < 48) {
        handleIdleLocal();
        return;
      }

      setIdleAnimation(null);
      setIdleAnimationFrame(0);

      if (idleTime > 1) {
        setSprite("alert", 0);
        setIdleTime(prev => Math.max(prev - 1, 0));
        return;
      }

      let direction = "";
      direction += diffY / distance > 0.5 ? "N" : "";
      direction += diffY / distance < -0.5 ? "S" : "";
      direction += diffX / distance > 0.5 ? "W" : "";
      direction += diffX / distance < -0.5 ? "E" : "";
      setSprite(direction, frameCount);

      const newX = nekoPos.x - (diffX / distance) * NEKO_SPEED;
      const newY = nekoPos.y - (diffY / distance) * NEKO_SPEED;

      setNekoPos({
        x: Math.min(Math.max(16, newX), window.innerWidth - 16),
        y: Math.min(Math.max(16, newY), window.innerHeight - 16)
      });
    };

    const animate = (timestamp) => {
      if (!lastFrameTimestamp.current) {
        lastFrameTimestamp.current = timestamp;
      }

      if (timestamp - lastFrameTimestamp.current > 100) {
        lastFrameTimestamp.current = timestamp;
        handleFrameLocal();
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Check for reduced motion preference
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isReducedMotion) {
      document.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('resize', handleResize);
      animationFrameId.current = requestAnimationFrame(animate);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [nekoPos, mousePos, frameCount, idleTime, idleAnimation, idleAnimationFrame, isInitialized]);

  return (
    <div
      ref={nekoRef}
      aria-hidden="true"
      style={{
        width: '32px',
        height: '32px',
        position: 'fixed',
        pointerEvents: 'none',
        imageRendering: 'pixelated',
        left: `${nekoPos.x - 16}px`,
        top: `${nekoPos.y - 16}px`,
        zIndex: 2147483647,
        backgroundImage: 'url(/oneko.gif)',
      }}
    />
  );
}