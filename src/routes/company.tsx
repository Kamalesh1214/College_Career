import { Outlet, createFileRoute } from "@tanstack/react-router";
import { AppSidebar } from "@/components/AppSidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useCompany } from "@/context/CompanyContext";
import { COLLEGE_SHORT } from "@/config/college";

export const Route = createFileRoute("/company")({
  component: AppLayout,
});

function AppLayout() {
  const { summary } = useCompany();

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="min-h-svh min-w-0 flex-1 bg-transparent">
        <header className="flex h-14 items-center gap-3 border-b border-border/80 bg-card/80 px-4 backdrop-blur-md">
          <SidebarTrigger className="md:hidden" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden sm:block">
                <BreadcrumbLink href="/">{COLLEGE_SHORT} Companies</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden sm:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-heading font-semibold">
                  {summary?.short_name || summary?.name || "Company"}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
