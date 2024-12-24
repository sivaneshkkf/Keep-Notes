import { Input } from "postcss";
import React, { useContext } from "react";
import Btn from "../button/Btn.jsx";
import { LoginContext, ModalContext } from "../contextApi/NotesContext.jsx";
import { auth } from "../Firebase/config.js";
import { signOut } from "firebase/auth";
import {motion} from "motion/react"

const SignoutModal = () => {
  const {
    signInModalOpen,
    setSigninModalOpen,
    signOutModalOpen,
    setSignOutModalOpen,
  } = useContext(ModalContext);

  const { userDetails, setUserDetails } = useContext(LoginContext);

  const signOutUser = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
      setUserDetails(null);
      setSignOutModalOpen(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      {signOutModalOpen && (
        <motion.div
          className="w-96 bg-white text-white text-xs md:text-sm rounded-md relative"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <div className="flex flex-col items-center justify-center p-5 w-full">
            <div className="space-y-5 w-full">
              <p className="text-text font-semibold text-sm">
                Are you sure you want to sign out?
              </p>

              {/* {errorMsg && <p className="text-red-600 w-full text-center text-xs md:text-sm py-1">{errorMsg}</p>} */}
              <div className="flex gap-2 w-full">
                <Btn
                  text="Sign out"
                  loading={false}
                  onClick={() => signOutUser()}
                  className="w-full bg-primaryDark"
                />

                <Btn
                  text="Cancel"
                  loading={false}
                  onClick={() => setSignOutModalOpen(false)}
                  className="py-2 px-2 w-full bg-gray-500 text-white rounded"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default SignoutModal;
