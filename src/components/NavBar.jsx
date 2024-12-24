import React, { useContext, useState } from "react";
import { FaHome } from "react-icons/fa";
import { FaNoteSticky } from "react-icons/fa6";
import { IoLogIn } from "react-icons/io5";
import { IoLogOutSharp } from "react-icons/io5";
import {
  LoginContext,
  ModalContext,
  NotesContext,
} from "../contextApi/NotesContext";
import { FaNotesMedical } from "react-icons/fa";
import logo from "../images/logoNotes.png";
import { Link } from "react-router";
import { se } from "date-fns/locale";

const NavBar = () => {
  const { selectedMenu, setSelectedMenu } = useContext(NotesContext);
  const {
    signInModalOpen,
    setSigninModalOpen,
    signOutModalOpen,
    setSignOutModalOpen,
    addNoteModalOpen,
    setAddNoteModalOpen,
  } = useContext(ModalContext);
  const { userDetails } = useContext(LoginContext);

  return (
    <div className="bg-primary flex flex-col items-center pt-5 pb-8 h-screen w-fit gap-12">
      <div className="bg-primaryDark w-12 h-12 pr-2 py-3 pl-1 flex justify-center items-center rounded-full border border-blue-950 shadow-md">
        <img src={logo} alt="logo" className="w-10" />
      </div>
      <div className="flex flex-col h-full justify-between items-center w-full">
        <div className="flex flex-col justify-center text-white font-bold text-sm">
          <LiEl
            text="Home"
            link="/"
            id="home"
            selectedMenu={selectedMenu}
            onClick={() => setSelectedMenu("home")}
          >
            <FaHome className="w-5 h-5" />
          </LiEl>
          <LiEl
            text="Notes"
            link="/notes"
            id="notes"
            selectedMenu={selectedMenu}
            onClick={() => setSelectedMenu("notes")}
          >
            <FaNoteSticky className="w-5 h-5" />
          </LiEl>
          <LiEl
            text="Add"
            link="/notes"
            id="add"
            onClick={() => {
              setSelectedMenu("add");
              if (!userDetails) {
                setSigninModalOpen(true);
              } else {
                setAddNoteModalOpen(true);
              }
            }}
            selectedMenu={selectedMenu}
            setSelectedMenu={setSelectedMenu}
          >
            <FaNotesMedical className="w-5 h-5" />
          </LiEl>
        </div>
        <div className="text-white flex flex-col items-center gap-2">
          {userDetails ? (
            <>
              <img
                src={userDetails?.photoURL || "/default-avatar.png"}
                alt={userDetails.displayName || "User Avatar"}
                className="w-10 h-10 rounded-full shadow-lg"
              />
              <p className="text-sm font-semibold text-nowrap">
                {userDetails.displayName}
              </p>
              <div
                className="flex items-center justify-center cursor-pointer gap-1"
                onClick={() => {
                  console.log("login");
                  setSigninModalOpen(false);
                  setSignOutModalOpen(true);
                }}
              >
                <IoLogIn className="w-6 h-6" />
                <p className="text-sm text-nowrap">Sign out</p>
              </div>
            </>
          ) : (
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => {
                console.log("logout");
                setSignOutModalOpen(false);
                setSigninModalOpen(true);
              }}
            >
              <IoLogOutSharp className="w-6 h-6" title="Logout" />
              <p className="text-sm font-semibold">Signin</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const LiEl = ({ text, children, onClick, link, selectedMenu, id }) => {
  return (
    <Link
      to={link}
      className={`flex items-center gap-2 cursor-pointer hover:text-gray-300 px-4 py-2 ${
        selectedMenu === id ? "bg-primaryDark" : ""
      }`}
      onClick={onClick}
    >
      {children && <span>{children}</span>}
      <span className="text-sm font-medium">{text}</span>
      <div
        className={`w-2 h-2 bg-white rounded-full ${
          selectedMenu === id ? "visible" : "invisible"
        }`}
      ></div>
    </Link>
  );
};

export default NavBar;
