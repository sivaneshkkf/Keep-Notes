import { Input } from "postcss";
import React, { useContext } from "react";
import InputEl from "../components/InputEl";
import Btn from "../button/Btn";
import { IoMdClose } from "react-icons/io";
import { ModalContext } from "../contextApi/NotesContext";
import loginBg from "../images/loginBg.png";
import { FcGoogle } from "react-icons/fc";
import i2logo from "../images/i2logo.webp"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../Firebase/config.js";
import {motion} from "motion/react"


const SigninModal = () => {
  const { signInModalOpen, setSigninModalOpen, signOutModal, setSignOutModal } =
    useContext(ModalContext);


    const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    console.log("User Info:", user);
    setSigninModalOpen(false)
    // You can now use the user information
    // e.g., user.displayName, user.email, user.photoURL
  } catch (error) {
    console.error("Error during Google Sign-In:", error);
  }
};


  return (
    <>
      {signInModalOpen && (
        <motion.div className="rounded-lg bg-white w-[700px] overflow-hidden flex relative h-[300px]"
        initial={{y:100 , opacity:0}}
        animate={{y:0 , opacity: 1}}
        transition={{duration: 0.8, type:"spring"}}>
          <img src={loginBg} alt="loginImg" className="object-cover w-1/2" />
          {/* <div className="space-y-3 p-5">
            <InputEl id="email" label="Email" type="email" />
            <InputEl id="pw" label="Password" type="text" />
          </div> */}
          <div className="mx-auto flex flex-col items-center justify-center px-5 pb-5 w-1/2 space-y-4">
          <img src={i2logo} alt="i2global" className="h-16"/>
            <p className="text-lg text-text font-bold">Welcome!</p>
            <p className="text-sm text-text font-medium">Let's get Started</p>
            <div className="border-2 border-zinc-300 flex gap-2 p-1 rounded cursor-pointer"
            onClick={signInWithGoogle}>
              <FcGoogle className="w-6 h-6" />
              <p className="text-nowrap text-sm font-medium text-text">
                Sign in with Google
              </p>
            </div>
          </div>

          <IoMdClose
            className="absolute right-2 top-2 w-6 h-6 text-gray-400 cursor-pointer"
            onClick={() => setSigninModalOpen(false)}
          />
        </motion.div>
      )}
    </>
  );
};

export default SigninModal;
