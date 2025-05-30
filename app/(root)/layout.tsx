import { getSession } from "@/components/auth/get-session";
import { AppSidebar } from "@/components/layout/sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { redirect } from "next/navigation";

const AppLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await getSession();
  if (!session) redirect("/login");
  return (
    <SidebarProvider>
      <div className="flex w-full h-screen overflow-hidden">
        <AppSidebar variant="sidebar" collapsible="icon" session={session} />
        <SidebarInset className="min-w-0 flex-1 overflow-hidden">
          {/* Mobile sidebar trigger in a sticky header */}
          <div className="md:hidden sticky top-0 z-40 bg-background/80 backdrop-blur flex items-center h-12 px-2 border-b">
            <SidebarTrigger />
            <span className="ml-2 font-semibold text-lg">Vyse</span>
          </div>
          <div className="flex flex-1 flex-col h-full overflow-hidden">
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
