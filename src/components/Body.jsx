import { createBrowserRouter } from "react-router-dom";
import Login from "./Login";
// import Header from "./Header";
import Browse from "./Browse";

import { useEffect } from "react";

import { RouterProvider } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase.js";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice.js";

export default function Body() {
  const dispatch = useDispatch();

  const appRouter = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/browse", element: <Browse /> },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
      } else {
        // User is signed out
        dispatch(removeUser());

        // ...
      }
    });
  });

  return (
    <>
      <RouterProvider router={appRouter} />
      {/* <Login />
      <Header /> */}
    </>
  );
}
