"use client";

import * as React from "react";
import {
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  PlusCircle,
  FileText,
  Clock,
  Users,
  Folder,
} from "lucide-react";
import Link from "next/link";

import { NavMain } from "@/components/layout/sidebar/nav-main";
import { NavUser } from "@/components/layout/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Session } from "@/types/auth";
import Logo from "@/components/logo.png";
import Image from "next/image";
// import { NavWorkspace } from "./nav-workspaces";

import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

// Define types for menu items
interface NavMenuItem {
  title: string;
  url: string;
  id?: string;
}

// Sample documents list - in a real app this would come from an API
const sampleDocuments = [
  { id: "doc1", title: "Getting Started with Vyse", url: "/editor/doc1", date: new Date(2023, 6, 15) },
  { id: "doc2", title: "Project Requirements", url: "/editor/doc2", date: new Date(2023, 6, 18) },
  { id: "doc3", title: "Meeting Notes", url: "/editor/doc3", date: new Date(2023, 6, 20) },
  { id: "doc4", title: "Research Findings", url: "/editor/doc4", date: new Date(2023, 6, 22) },
  { id: "doc5", title: "Product Roadmap", url: "/editor/doc5", date: new Date(2023, 6, 25) },
];

export function AppSidebar({
  session,
  ...props
}: { session: Session } & React.ComponentProps<typeof Sidebar>) {

  const recentDocuments = React.useMemo(() => {
    return [...sampleDocuments]
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 5)
      .map((doc) => ({
        title: doc.title,
        url: doc.url,
        id: doc.id,
        date: formatDistanceToNow(doc.date, { addSuffix: true }),
      }));
  }, []);

  const data = {
    navMain: [
      {
        title: "Documents",
        url: "/documents",
        icon: FileText,
        isActive: true,
        items: [
          ...recentDocuments.map((doc) => ({
            title: doc.title,
            url: doc.url,
            id: doc.id,
            subtitle: doc.date,
          })),
          {
            title: "View All Documents",
            url: "/documents",
          },
        ] as NavMenuItem[],
      },
      {
        title: "Recent",
        url: "/recent",
        icon: Clock,
      },
      {
        title: "Shared with me",
        url: "/shared",
        icon: Users,
      },
      {
        title: "Projects",
        url: "/projects",
        icon: Folder,
      },
    ],
    navSecondary: [
      {
        title: "Support",
        url: "/settings/support",
        icon: LifeBuoy,
      },
    ],
    workspace: [
      {
        name: "Design Engineering",
        url: "#",
        icon: Frame,
      },
      {
        name: "Sales & Marketing",
        url: "#",
        icon: PieChart,
      },
      {
        name: "Travel",
        url: "#",
        icon: Map,
      },
    ],
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center space-x-2 p-1">
              <SidebarTrigger />
              <SidebarMenuButton size="lg" asChild>
                <Link
                  href="/"
                  className="group-data-[collapsed=false]:flex items-center gap-2"
                >
                  <Image src={Logo} alt="Vyse" className="size-8" />
                  <span className="truncate font-semibold text-lg">Vyse</span>
                </Link>
              </SidebarMenuButton>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem className="p-2">
            <SidebarMenuButton asChild>
              <Link
                href="/editor"
                className={cn(
                  "flex items-center gap-2 bg-primary/10 hover:bg-primary/20",
                  "px-4 py-2 rounded-md transition-colors text-primary font-medium"
                )}
              >
                <PlusCircle className="h-4 w-4" />
                <span>New Document</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser session={session} />
      </SidebarFooter>
    </Sidebar>
  );
}
