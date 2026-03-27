import Navbar from "@/components/organisms/Sidebar";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/shadcn/sidebar";

export default function RootTemplate() {
  return (
    <SidebarProvider>
      <Navbar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
