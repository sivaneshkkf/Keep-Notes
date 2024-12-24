import React, { useContext, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import {
  LoginContext,
  ModalContext,
  NotesContext,
} from "../contextApi/NotesContext";
import { deleteDocument, UseFetchCollection } from "../Firebase/config";
import noData from "../images/no_result.png";
import { IoMdAddCircle } from "react-icons/io";
import { formatTimestamp } from "../utils/Formatter";
import TheHeader from "../components/TheHeader";

const Notes = () => {
  //const {notesList, setNotes} = useContext(NotesContext)

  const {
    addNoteModalOpen,
    setAddNoteModalOpen,
    setEditNoteModalOpen,
    setSigninModalOpen,
  } = useContext(ModalContext);
  const { selectedNote, setSelectedNote, notesList, setNotesList } =
    useContext(NotesContext);
  const { userDetails, setUserDetails } = useContext(LoginContext);

  const notes = UseFetchCollection("notes", userDetails?.uid || "");

  useEffect(() => {
    if (notes) {
      setNotesList(notes);
    }
  }, [notes]);

  // useEffect(() => {

  //     const fetchTodos = async () => {
  //       try {
  //         const response = await axios.get("https://dummyjson.com/todos");
  //         console.log(response.data);
  //         setNotes(response.data)

  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //       }
  //     };

  //     fetchTodos();

  // }, [])

  return (
    <div className="w-full overflow-y-auto">
      <TheHeader />
      <div className="p-5 space-y-3">
        <h1 className="font-semibold text-text">Notes</h1>
        {notesList?.length > 0 ? (
          <div className="grid grid-cols-3 gap-5 w-full">
            {notesList.map((notes, index) => (
              <NoteEl
                key={index}
                doc={notes}
                note={notes.note}
                title={notes.title}
                subject={notes.subject}
                id={notes.id}
                setEditNoteModalOpen={setEditNoteModalOpen}
                timestamp={notes.timestamp}
                setSelectedNote={setSelectedNote}
              />
            ))}
          </div>
        ) : (
          <div>
            <img src={noData} alt="noData" className="max-w-lg mx-auto" />
            <div
              className="flex gap-2 items-center justify-center border-2 border-zinc-300 mx-auto w-fit p-2 rounded-lg cursor-pointer"
              onClick={() => {
                if (!userDetails) {
                  setSigninModalOpen(true);
                } else {
                  setAddNoteModalOpen(true);
                }
              }}
            >
              <IoMdAddCircle className="w-10 h-10 text-primaryDark" />
              <p className="font-bold">Add Note</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const NoteEl = ({
  note,
  id,
  title,
  subject,
  setEditNoteModalOpen,
  setSelectedNote,
  doc,
  timestamp,
}) => {
  return (
    <div className="bg-white p-5 rounded-md w-full space-y-2">
      <div className="flex gap-2 justify-between items-center">
        <div>
          <h1>{title}</h1>
          <p className="text-xs text-zinc-400">{formatTimestamp(timestamp)}</p>
        </div>

        <div className="flex gap-2">
          <MdEdit
            onClick={() => {
              setSelectedNote(doc);
              setEditNoteModalOpen(true);
            }}
            className="w-5 h-5 text-zinc-500 cursor-pointer"
          />

          <MdDelete
            className="w-5 h-5 text-zinc-500 cursor-pointer"
            onClick={() => deleteDocument("notes", id)}
          />
        </div>
      </div>
      <div>
        <div className="text-sm font-semibold">
          <p>{subject}</p>
        </div>
        <div className="flex items-center text-sm">
          <p>{note}</p>
        </div>
      </div>
    </div>
  );
};

export default Notes;
