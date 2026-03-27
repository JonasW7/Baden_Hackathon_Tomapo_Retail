import Navbar from "@organisms/Navbar";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/shadcn/sidebar";

export default function RootTemplate() {
  return (
    <SidebarProvider>
      <Navbar />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
