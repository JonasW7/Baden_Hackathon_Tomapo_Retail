import { NavLink } from "react-router";
import { Home } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  // SidebarTrigger,
} from "@/components/shadcn/sidebar";

const navItems = [
  { to: "/", label: "Dashboard", icon: Home, end: true },
  { to: "/issues-production", label: "Production Issues", icon: Home },
  { to: "/issues-user", label: "User Issues", icon: Home },
  { to: "/recall-center", label: "Recall center", icon: Home },
];

export default function Navbar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-4 font-bold text-lg text-sidebar-foreground">
        Tomapo
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map(({ to, label, icon: Icon, end }) => (
                <SidebarMenuItem key={to}>
                  <NavLink to={to} end={end}>
                    {({ isActive }) => (
                      <SidebarMenuButton isActive={isActive}>
                        <Icon />
                        <span>{label}</span>
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
