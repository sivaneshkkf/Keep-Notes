import React, { useContext } from "react";
import homeBg from "../images/homeBg.webp";
import { motion } from "motion/react";
import { FadeIn } from "../Motion/VarientAnim";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useNavigate } from "react-router";
import { NotesContext } from "../contextApi/NotesContext";

const Home = () => {
     const {selectedMenu, setSelectedMenu} = useContext(NotesContext);
    const navigate = useNavigate()
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
        <motion.p
          className="text-zinc-200 text-sm pb-5"
          variants={FadeIn("left", 0.5, 0)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true }}
        >
          Keep Notes is a sleek and intuitive note-taking app designed to help
          you capture, organize, and manage your thoughts and ideas
          effortlessly. Whether you're jotting down detailed plans or important
          to-dos, Keep Notes makes it easy to keep everything in one place. With
          its clean and user-friendly interface, you can easily create, edit,
          and categorize your notes.
        </motion.p>

        <motion.div
          className="border-2 border-zinc-200 rounded-md py-2 px-3 text-center w-fit mx-auto flex items-center gap-2 cursor-pointer"
          variants={FadeIn("up", 0.8, 0)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true }}
          onClick={() => {
            navigate("/notes")
            setSelectedMenu("notes")
        }} // Use navigate function here
        >
          <p className="text-white text-sm font-semibold">Get Start</p>
          <FaLongArrowAltRight className="w-5 h-5 text-white" />
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
