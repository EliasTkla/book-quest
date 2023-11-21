import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";
import { collection, deleteDoc, query, where, getDocs, and, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState('');

    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logOut() {
        return signOut(auth);
    }

    function saveBook(uid, bookID) {
        return setDoc(doc(db, "userBooks", uid + bookID), { UID: uid, BookID: bookID });
    }

    function removeBook(uid, bookID) {
        return deleteDoc(doc(db, "userBooks", uid + bookID), and(where("UID", "==", uid), where("BookID", "==", bookID)));
    }

    async function checkBookSaved(uid, bookID) {
        const q = query(collection(db, "userBooks"), and(where("UID", "==", uid), where("BookID", "==", bookID)));

        try {
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                return false;
            } else {
                return true;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async function getSavedBooks(uid) {
        const q = query(collection(db, "userBooks"), where("UID", "==", uid));

        try {
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                return null;
            } else {
                const list = [];

                for (let i = 0; i < querySnapshot.docs.length; i++) {
                    list.push(querySnapshot.docs[i]._document.data.value.mapValue.fields.BookID.stringValue)
                }

                return list;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    // Effect to listen for changes in authentication state
    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });

        return () => {
            listen();
        }
    }, []);

    return <userAuthContext.Provider value={{ currentUser, signUp, logIn, logOut, saveBook, removeBook, checkBookSaved, getSavedBooks }}>
        {children}
    </userAuthContext.Provider>
}

export function useUserAuth() {
    return useContext(userAuthContext);
}