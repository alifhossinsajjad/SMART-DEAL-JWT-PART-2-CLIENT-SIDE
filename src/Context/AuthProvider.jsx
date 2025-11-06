import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../Firebase/Firebsae.config";
import { AuthContext } from "./AuthContext";

const googleAuthProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoadin] = useState(true);

  const createUser = (email, password) => {
    setLoadin(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoadin(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoole = () => {
    setLoadin(true);
    return signInWithPopup(auth, googleAuthProvider);
  };

  const setProfile = (updateData) => {
    return updateProfile(auth.currentUser, updateData);
  };

  const signOutUser = () => {
    setLoadin(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (createUser) => {
      setUser(createUser);
      if (createUser) {
        const loggedUser = { email: createUser.email };
        fetch("https://smart-deals-server-steel.vercel.app/getToken", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(loggedUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("after gatting the token", data);
            localStorage.setItem("access-token", data.token);
          });
      }
      setLoadin(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    createUser,
    signInUser,
    signInWithGoole,
    signOutUser,
    loading,
    setLoadin,
    setProfile,
    setUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
