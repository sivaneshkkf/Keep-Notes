import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Notes from "./pages/Notes";
import {
  LoginContext,
  ModalContext,
  NotesContext,
} from "./contextApi/NotesContext";
import SigninModal from "./modal/SigninModal";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase/config";
import SignoutModal from "./modal/SignoutModal";
import AddNoteModal from "./modal/AddNoteModal";
import EditNoteModal from "./modal/EditNoteModal";
import TheHeader from "./components/TheHeader";
import { Outlet } from "react-router";

const App = () => {
  const [notesList, setNotesList] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [signOutModalOpen, setSignOutModalOpen] = useState(false);
  const [signInModalOpen, setSigninModalOpen] = useState(false);
  const [addNoteModalOpen, setAddNoteModalOpen] = useState(false);
  const [editNoteModalOpen, setEditNoteModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        console.log("User signed in:", user);
        setUserDetails(user);
      } else {
        // User is signed out
        console.log("No user is signed in");
      }
    });
  }, [userDetails]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!userDetails) {
        setSigninModalOpen(true); 
      }
    }, 3000); 
  
    return () => clearTimeout(timeout); 
  }, [userDetails, setSigninModalOpen]);
  

  return (
    <ModalContext.Provider
      value={{
        signOutModalOpen,
        setSignOutModalOpen,
        signInModalOpen,
        setSigninModalOpen,
        addNoteModalOpen,
        setAddNoteModalOpen,
        editNoteModalOpen,
        setEditNoteModalOpen,
      }}
    >
      <LoginContext.Provider value={{ userDetails, setUserDetails }}>
        <NotesContext.Provider
          value={{
            notesList,
            setNotesList,
            selectedNote, setSelectedNote
          }}
        >
          <div className="bg-bg flex h-screen overflow-hidden">
            <NavBar />
            <div>
              <Outlet />
            </div>
            

            {(signInModalOpen || signOutModalOpen || addNoteModalOpen || editNoteModalOpen) && (
              <div className="bg-black h-screen w-full absolute inset-0 bg-opacity-30 flex items-center justify-center z-50">
                <SigninModal />
                <SignoutModal />
                <AddNoteModal/>
                <EditNoteModal/>
              </div>
            )}
          </div>
        </NotesContext.Provider>
      </LoginContext.Provider>
    </ModalContext.Provider>
  );
};

export default App;
