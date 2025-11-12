// src/components/layouts/RootLayout.tsx
import Navbar from "@/components/organisms/Navbar";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  console.log("test")
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
