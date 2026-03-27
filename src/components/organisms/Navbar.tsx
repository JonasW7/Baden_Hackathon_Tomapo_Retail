import { NavLink } from "react-router";
import { Home, Cloud } from "lucide-react";
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
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/weather", label: "Weather", icon: Cloud },
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
