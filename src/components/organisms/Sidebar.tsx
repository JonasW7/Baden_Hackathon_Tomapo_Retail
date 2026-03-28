import { NavLink, useNavigate } from "react-router";
import {
  LayoutDashboard,
  Warehouse,
  Users,
  RotateCcw,
  Sun,
  Moon,
  LogOut,
} from "lucide-react";
import logo from "@/assets/logo/Tomapo_light.png";
import { useTheme } from "@/context/themeProvider";
import { Button } from "@/components/shadcn/button";
import { logout } from "@/services/userService";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/shadcn/sidebar";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/issues-production", label: "Production Issues", icon: Warehouse },
  { to: "/issues-user", label: "User Issues", icon: Users },
  { to: "/recall-center", label: "Recall Center", icon: RotateCcw },
];

export default function AppSidebar() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();

  return (
    <Sidebar collapsible="icon" className="select-none">
      <SidebarHeader className="p-3 flex flex-row items-center gap-3 group-data-[collapsible=icon]:justify-center">
        {/* Logo mark */}
        <div className="shrink-0 w-16 h-16 group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8 rounded-lg flex items-center justify-center overflow-hidden">
          <img
            src={logo}
            alt="Tomapo"
            className="w-full h-full object-contain"
          />
        </div>
        <span className="font-bold text-lg text-sidebar-foreground group-data-[collapsible=icon]:hidden">
          Tomapo
        </span>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map(({ to, label, icon: Icon, end }) => (
                <SidebarMenuItem key={to}>
                  <NavLink to={to} end={end}>
                    {({ isActive }) => (
                      <SidebarMenuButton
                        isActive={isActive}
                        size="lg"
                        tooltip={label}
                        className="group-data-[collapsible=icon]:justify-center cursor-pointer data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
                      >
                        <Icon />
                        <span className="group-data-[collapsible=icon]:hidden">
                          {label}
                        </span>
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-2 flex flex-row gap-1 group-data-[collapsible=icon]:flex-col justify-between">
        <Button
          variant="ghost"
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="cursor-pointer h-12 w-12 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8"
        >
          <LogOut />
        </Button>
        <Button
          variant="ghost"
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className="cursor-pointer h-12 w-12 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8"
        >
          {isDark ? <Sun /> : <Moon />}
        </Button>
        <SidebarTrigger className="cursor-pointer h-12 w-12 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8" />
      </SidebarFooter>
    </Sidebar>
  );
}
