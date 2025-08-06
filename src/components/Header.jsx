import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import logo from "../utils/logo.png";
const logo =
  "https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-07-24/consent/87b6a5c0-0104-4e96-a291-092c11350111/019808e2-d1e7-7c0f-ad43-c485b7d9a221/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";

export default function Header() {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/erro");
      });
  };
  return (
    <>
      <div className="absolute flex justify-between px-3 w-screen bg-gradient-to-b  from-black px-1 py-2 z-10">
        <img className="w-46 absh-19" src={logo} alt="img" />
        {user && (
          <div className=" p-5 flex gap-4">
            <img
              className="w-8 h-8 "
              src="https://i.pinimg.com/736x/91/86/1b/91861b749841221d52122f0c2933d8a6.jpg" ///muze yha lani he
              alt="img"
            />
            <button onClick={handleSignOut} className="font-bold text-white">
              (Sign Out)
            </button>
          </div>
        )}
      </div>
    </>
  );
}
