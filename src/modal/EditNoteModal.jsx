import React, { useContext, useEffect } from "react";
import InputEl from "../components/InputEl";
import Btn from "../button/Btn";
import { IoMdCloseCircle } from "react-icons/io";
import { ModalContext, NotesContext } from "../contextApi/NotesContext";
import TextArea from "../components/TextArea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addNote, updateNote } from "../Firebase/config";
import {motion} from "motion/react"


const AddNoteModal = () => {
  const { editNoteModalOpen, setEditNoteModalOpen } = useContext(ModalContext);
  const { selectedNote, setSelectedNote } = useContext(NotesContext);

  const schemaValidation = z.object({
    editTitle: z.string().min(1, { message: "This field is required" }),
    editSubject: z.string().min(1, { message: "This field is required" }),
    editNote: z.string().min(1, { message: "Enter your note briefly" }),
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schemaValidation),
    defaultValues: {
      editTitle: selectedNote?.title || "",
      editSubject: selectedNote?.subject || "",
      editNote: selectedNote?.note || "",
    },
  });

  useEffect(() => {
    if (selectedNote) {
      setValue("editTitle", selectedNote.title || "");
      setValue("editSubject", selectedNote.subject || "");
      setValue("editNote", selectedNote.note || "");
    }
  }, [selectedNote, setValue]);

  const sentNoteData = (data) => {
    console.log(data)
    updateNote("notes",selectedNote.id,data)
      .then((docRef) => {
        console.log("Updated document with ID:", selectedNote.id);
        setEditNoteModalOpen(false);
        setSelectedNote(null); // Clear selected note after saving
      })
      .catch((error) => {
        console.error("Error Updating document:", error);
      });
  };

  return (
    <>
      {editNoteModalOpen && (
        <motion.div className="rounded-lg bg-white w-96 overflow-hidden"
        initial={{y:100 , opacity:0}}
        animate={{y:0 , opacity: 1}}
        transition={{duration: 0.8, type:"spring"}}>
          <div className="py-2 bg-primary px-5 flex items-center justify-center relative">
            <p className="text-white text-sm font-medium">Edit Note</p>
            <IoMdCloseCircle
              className="absolute right-2 w-5 h-5 text-gray-300 cursor-pointer"
              onClick={() => setEditNoteModalOpen(false)}
            />
          </div>
          <form className="space-y-3 p-5" onSubmit={handleSubmit(sentNoteData)}>
            <InputEl
              id="editTitle"
              label="Title"
              type="text"
              value={watch("editTitle")}
              onChange={(e) => setValue("editTitle", e.target.value)}
              register={register("editTitle")}
              error={errors.editTitle}
            />

            <InputEl
              id="editSubject"
              label="Subject"
              type="text"
              value={watch("editSubject")}
              onChange={(e) => setValue("editSubject", e.target.value)}
              register={register("editSubject")}
              error={errors.editSubject}
            />

            <TextArea
              id="editNote"
              label="Note"
              type="text"
              value={watch("editNote")}
              onChange={(e) => setValue("editNote", e.target.value)}
              register={register("editNote")}
              error={errors.editNote}
            />

            <Btn text="Save" loading={false} className="bg-secondary w-full" />
          </form>
        </motion.div>
      )}
    </>
  );
};

export default AddNoteModal;
