import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Building2, LayoutGrid, Target } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { COLLEGE_SHORT } from "@/config/college";

const NAV_ITEMS = [
  { to: "/company/intelligence", label: "Company Intelligence", icon: Building2 },
  { to: "/company/skills", label: "Skill Intelligence", icon: Target },
] as const;

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border bg-sidebar">
        <div className="flex items-center gap-2 px-2 py-2">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary font-heading text-xs font-bold text-sidebar-primary-foreground shadow-sm">
            {COLLEGE_SHORT.charAt(0)}
          </span>
          <span className="truncate font-heading text-sm font-semibold tracking-tight group-data-[collapsible=icon]:hidden">
            {COLLEGE_SHORT} <span className="font-normal text-sidebar-foreground/60">/</span>{" "}
            Research
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase tracking-[0.16em]">
            Workspace
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild tooltip={item.label}>
                    <Link
                      to={item.to}
                      activeProps={{
                        className: "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
                      }}
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border bg-sidebar">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="All Companies">
              <Link to="/">
                <LayoutGrid />
                <span>All Companies</span>
                <ArrowUpRight className="ml-auto size-3.5 opacity-50 group-data-[collapsible=icon]:hidden" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
