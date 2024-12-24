import { motion } from "framer-motion";

export const FadeIn = (direction, delay, opacity) => {
    return {
      hidden: {
        y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
        x: direction === "right" ? 40 : direction === "left" ? -40 : 0,
        opacity: opacity,
      },
      show: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          type: "tween",
          duration: 0.5,
          delay: delay,
          ease: [0.25, 0.25, 0.25, 0.75],
        },
      },
    };
  };