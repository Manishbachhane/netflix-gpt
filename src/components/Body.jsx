import { createBrowserRouter } from "react-router-dom";
import Login from "./Login";
//import Header from "./Header";
import Browse from "./Browse";
import { RouterProvider } from "react-router-dom";
export default function Body() {
  const appRouter = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/browse", element: <Browse /> },
  ]);
  return (
    <>
      <RouterProvider router={appRouter} />
      {/* <Login />
      <Header /> */}
    </>
  );
}
