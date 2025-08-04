// import logo from "../utils/logo.png";
const logo =
  "https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-07-24/consent/87b6a5c0-0104-4e96-a291-092c11350111/019808e2-d1e7-7c0f-ad43-c485b7d9a221/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";
export default function Header() {
  return (
    <>
      <div className="absolute  bg-gradient-to-b  from-black px-1 py-2 z-10">
        <img className="w-46   h-19" src={logo} alt="img" />
      </div>
    </>
  );
}
