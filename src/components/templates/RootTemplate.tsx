import Navbar from "@organisms/Navbar";
import { Outlet } from "react-router-dom";

export default function RootTemplate() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
