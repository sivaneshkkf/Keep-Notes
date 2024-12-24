import { Input } from "postcss";
import React, { useContext } from "react";
import InputEl from "../components/InputEl";
import Btn from "../button/Btn";
import { IoMdCloseCircle } from "react-icons/io";
import { LoginContext, ModalContext } from "../contextApi/NotesContext";
import TextArea from "../components/TextArea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addNote } from "../Firebase/config";
import {motion} from "motion/react"

const AddNoteModal = () => {
  const { addNoteModalOpen, setAddNoteModalOpen } = useContext(ModalContext);

  const { setSigninModalOpen } =
      useContext(ModalContext);

  const {userDetails, setUserDetails} = useContext(LoginContext)

  const schemaValidation = z.object({
    title: z.string().min(1, { message: "This field is required" }),
    subject: z.string().min(1, { message: "This field is required" }),
    note: z.string().min(1, { message: "Enter your note briefly" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schemaValidation) });

  const sentNoteData = (data) => {
    const noteData = {
      ...data,
      userId : userDetails.uid
    }
    addNote(noteData).then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      setAddNoteModalOpen(false)
    }).catch((e) => {
      console.error("Error adding document: ", e);
    })
  };

  return (
    <>
      {addNoteModalOpen && (
        <motion.div className="rounded-lg bg-white w-96 overflow-hidden"
        initial={{y:100 , opacity:0}}
        animate={{y:0 , opacity: 1}}
        transition={{duration: 0.8, type:"spring"}}
        >
          <div className="py-2 bg-primary px-5 flex items-center justify-center relative">
            <p className="text-white text-sm font-medium">Add Note</p>
            <IoMdCloseCircle
              className="absolute right-2 w-5 h-5 text-gray-300"
              onClick={() => setAddNoteModalOpen(false)}
            />
          </div>
          <form className="space-y-3 p-5" onSubmit={handleSubmit(sentNoteData)}>
            <InputEl
              id="title"
              label="Title"
              type="text"
              register={register("title")}
              error={errors.title}
            />

            <InputEl
              id="subject"
              label="Subject"
              type="text"
              register={register("subject")}
              error={errors.subject}
            />

            <TextArea
              id="note"
              label="Note"
              type="text"
              register={register("note")}
              error={errors.note}
            />

            <Btn text="Add" loading={false} className="bg-secondary w-full" />
          </form>
        </motion.div>
      )}
    </>
  );
};

export default AddNoteModal;
