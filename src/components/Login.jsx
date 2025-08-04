import { useState } from "react";
import Header from "./Header";
export default function Login() {
  const [isSignInForm, setisSignInForm] = useState(true);
  const toggleSignInForm = () => {
    setisSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/258d0f77-2241-4282-b613-8354a7675d1a/web/IN-en-20250721-TRIFECTA-perspective_cadc8408-df6e-4313-a05d-daa9dcac139f_small.jpg   "
          alt="bg-img"
        />
      </div>
      <form className="max-w-3/12 p-5 pr-7 rounded-2xl    absolute text-white left-0 right-0 mx-auto my-39  bg-black/80">
        <h1 className="font-bold text-red-700 text-3xl p-2 m-2 ">
          {isSignInForm ? "Sign in" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full name"
            className="p-2 m-2 w-full my-4 bg-[#404040]"
          />
        )}
        <input
          type="text"
          placeholder="Email address"
          className="p-2 m-2 w-full my-4 bg-[#404040]"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 w-full m-2 my-4 bg-[#404040]"
        />
        <button className="p-4 m-1 my-4 bg-red-700 rounded-lg w-full">
          {isSignInForm ? "Sign in" : "Sign Up"}
        </button>
        <p className="py-6 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign up now"
            : "Alredy user? Sign in now"}
        </p>
      </form>
    </div>
  );
}
