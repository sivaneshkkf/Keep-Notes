import React from "react";
import homeBg from "../images/homeBg.webp";
import { motion } from "motion/react";
import { FadeIn } from "../Motion/VarientAnim";

const Home = () => {
  return (
    <div className="h-screen w-screen relative">
      <img
        src={homeBg}
        alt="homebg"
        className="object-cover object-right w-full h-full absolute top-0 left-0 z-0"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black to-transparent z-10 opacity-80"></div>
      <div className="absolute top-1/4 left-20 right-96 z-10 space-y-5">
        <motion.h1
          className="font-bold text-4xl text-white tracking-widest"
          variants={FadeIn("left", 0.3, 0)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true }}
        >
          KEEP NOTES
        </motion.h1>
        <motion.p className="text-zinc-200 text-sm"
        variants={FadeIn("left", 0.5, 0)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true }}>
          Keep Notes is a sleek and intuitive note-taking app designed to help
          you capture, organize, and manage your thoughts and ideas
          effortlessly. Whether you're jotting down detailed plans or important
          to-dos, Keep Notes makes it easy to keep everything in one place. With
          its clean and user-friendly interface, you can easily create, edit,
          and categorize your notes.
        </motion.p>
      </div>
    </div>
  );
};

export default Home;
