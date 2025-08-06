import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidDate } from "../utils/Validate.jsx";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase.js";

export default function Login() {
  const [isSignInForm, setisSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const message = checkValidDate(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://avatars.githubusercontent.com/u/111632203?v=4", //ye valie url
          })
            .then(() => {
              navigate("/browse");
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            // Email already registered, try signing in directly
            signInWithEmailAndPassword(
              auth,
              email.current.value,
              password.current.value
            )
              .then((userCredential) => {
                navigate("/browse");
              })
              .catch((err) => {
                setErrorMessage(
                  "Email already in use. Please sign in instead."
                );
              });
          } else {
            setErrorMessage(error.code + " - " + error.message);
          }
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          navigate("/browse");
        })
        .catch((error) => {
          setErrorMessage(error.code + " - " + error.message);
        });
    }
  };

  const toggleSignInForm = () => {
    setisSignInForm(!isSignInForm);
    setErrorMessage(null); // reset error on form toggle
  };

  return (
    <div>
      <Header />
      <div className="absolute inset-0 -z-10">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/258d0f77-2241-4282-b613-8354a7675d1a/web/IN-en-20250721-TRIFECTA-perspective_cadc8408-df6e-4313-a05d-daa9dcac139f_small.jpg"
          alt="bg-img"
          className="object-cover w-full h-full"
        />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-11/12 sm:w-4/6 md:w-1/3 lg:w-1/3 xl:w-1/4 p-5 pr-7 rounded-2xl absolute text-white left-0 right-0 mx-auto top-1/2 -translate-y-1/2 bg-black/80"
      >
        <h1 className="font-bold text-red-700 text-3xl p-2 m-2">
          {isSignInForm ? "Sign in" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full name"
            className="p-2 m-2 w-full my-4 bg-[#404040]"
            ref={name}
          />
        )}

        <input
          ref={email}
          type="text"
          placeholder="Email address"
          className="p-2 m-2 w-full my-4 bg-[#404040]"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-2 w-full m-2 my-4 bg-[#404040]"
        />

        {errorMessage && (
          <p className="font-bold text-red-700 text-lg p-2 m-2">
            {errorMessage}
          </p>
        )}

        <button
          className="p-4 m-1 my-4 bg-red-700 rounded-lg w-full"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign in" : "Sign Up"}
        </button>

        <p className="py-6 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign up now"
            : "Already user? Sign in now"}
        </p>
      </form>
    </div>
  );
}
