import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc ,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAFhz7Hm02KlmZMIPr-pdIjzxrsj-2nI4k",
  authDomain: "keep-notes-ca682.firebaseapp.com",
  projectId: "keep-notes-ca682",
  storageBucket: "keep-notes-ca682.firebasestorage.app",
  messagingSenderId: "889090807787",
  appId: "1:889090807787:web:e9ae8edc1c7fea329f2bae",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const auth = getAuth(app);

export const addNote = async (note) => {
  return new Promise(async (resolve, reject) => {
    try {
      const docRef = await addDoc(collection(db, "notes"), {
        ...note,
        timestamp: serverTimestamp(), // Add server timestamp
      });
      
      resolve(docRef);
    } catch (e) {
      
      reject(e);
    }
  });
};

export function UseFetchCollection(CollectionName, uid) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const collectionRef = query(
      collection(db, CollectionName),
      where("userId", "==", uid), 
      orderBy("timestamp", "desc") 
    );

    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const results = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(results);
    });

    return () => unsubscribe();
  }, [CollectionName, uid]);

  return notes;
}


// delete feedback

export async function deleteDocument(collectionName, docId) {
  try {
    const docRef = doc(db, collectionName, docId); // Reference to the document
    await deleteDoc(docRef); // Deletes the document
    console.log("Deleted document with ID:", docId);
  } catch (error) {
    console.error("Error deleting document:", error);
  }
}


// Add a new document in collection "cities"
export const updateNote = async(collection,id,data) => {
  return new Promise(async (resolve, reject) => {
  try {
    const docRef = doc(db, collection, id);
    await updateDoc(docRef, {
      title: data.editTitle,
      subject : data.editSubject,
      note : data.editNote,
    });
    resolve(docRef);
  } catch (error) {
    reject(error);
   
  }
});
 
}
