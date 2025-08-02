"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const emojis = ["🎉", "✨", "🚀", "💖", "🔥", "🤩"];

const FunEffects = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
      {emojis.map((emoji, i) => {
        const x = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = 5 + Math.random() * 5;

        return (
          <motion.div
            key={i}
            initial={{ top: "-10%", x: `${x}vw`, opacity: 1 }}
            animate={{ top: "110%" }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
            }}
            style={{ position: "absolute", fontSize: "2rem" }}
          >
            {emoji}
          </motion.div>
        );
      })}
    </div>
  );
};

export default FunEffects;
