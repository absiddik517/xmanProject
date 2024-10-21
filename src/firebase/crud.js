// src/crud.js
import { collection, where, query, addDoc, getDocs, getDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

// Function to create a new document in a collection
export const createDocument = async (collectionName, docData) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), docData);
    return { success: true, id: docRef.id, message: "Document created successfully!" };
  } catch (error) {
    return { success: false, message: "Error creating document", error };
  }
};

// Function to get a single document by ID
export const getDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { success: true, data: docSnap.data() };
    } else {
      return { success: false, message: "No such document!" };
    }
  } catch (error) {
    return { success: false, message: "Error retrieving document", error };
  }
};

// Function to get all documents from a collection
export const getAllDocuments = async (collectionName, uid) => {
  try {
    const q = query(collection(db, collectionName), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, data: doc.data() });
    });
    return { success: true, data: documents };
  } catch (error) {
    return { success: false, message: "Error retrieving documents", error };
  }
};

// Function to update a document by ID
export const updateDocument = async (collectionName, docId, updatedData) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, updatedData);
    return { success: true, message: "Document updated successfully!" };
  } catch (error) {
    return { success: false, message: "Error updating document", error };
  }
};

// Function to delete a document by ID
export const deleteDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return { success: true, message: "Document deleted successfully!" };
  } catch (error) {
    return { success: false, message: "Error deleting document", error };
  }
};