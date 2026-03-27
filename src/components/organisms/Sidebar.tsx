import { NavLink } from "react-router";
import { LayoutDashboard, Warehouse, Users, RotateCcw } from "lucide-react";
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
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-3 flex flex-row items-center gap-3 group-data-[collapsible=icon]:justify-center">
        {/* Logo mark */}
        <div className="shrink-0 w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center font-bold text-sidebar-primary-foreground text-sm">
          T
        </div>
        {/* Text hidden when collapsed */}
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
                        className="group-data-[collapsible=icon]:justify-center"
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

      <SidebarFooter className="p-2 flex items-end" >
        <SidebarTrigger className="cursor-pointer"/>
      </SidebarFooter>
    </Sidebar>
  );
}
