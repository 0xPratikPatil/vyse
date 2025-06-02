"use client";

import * as React from "react";
import { PlusCircle, FileText, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import {
  useDocuments,
  useCreateDocument,
  Document,
} from "@/features/documents/api/useDocuments";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { content } from "@/lib/content";

// Define types for menu items
interface NavMenuItem {
  title: string;
  url: string;
  id?: string;
  subtitle?: string;
}

export function AppSidebar({
  session,
  ...props
}: { session: Session } & React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const { data: documentsResponse, isPending } = useDocuments();
  const documents = documentsResponse?.data as Document[];
  const createDocumentMutation = useCreateDocument();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false);
  const [newDocumentName, setNewDocumentName] = React.useState<string>("");

  const recentDocuments = React.useMemo(() => {
    if (!documents || documents.length === 0) return [];

    return [...documents]
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )
      .slice(0, 5)
      .map((doc) => ({
        title: doc.title || "Untitled document",
        url: `/editor/${doc.id}`,
        id: doc.id,
      }));
  }, [documents]);

  const handleCreateDocument = () => {
    const documentData = {
      title: newDocumentName.trim() || "Untitled document",
      content: content,
      tags: [],
      description: "",
    };

    createDocumentMutation.mutate(
      { json: documentData },
      {
        onSuccess: (response) => {
          setIsCreateDialogOpen(false);
          setNewDocumentName("");

          // Navigate to the editor with the new document
          if (response?.data?.id) {
            router.push(`/editor/${response.data.id}`);
          } else {
            toast.error("Error accessing the new document");
          }
        },
        onError: () => {
          toast.error("Failed to create document");
        },
      }
    );
  };

  const data = {
    navMain: [
      {
        title: "Documents",
        url: "/documents",
        icon: FileText,
        isActive: true,
        items: [
          ...(isPending
            ? [{ title: "Loading documents...", url: "#" }]
            : recentDocuments.length > 0
              ? [
                  ...recentDocuments,
                  { title: "View All Documents", url: "/documents" },
                ]
              : [
                  { title: "No documents yet", url: "#" },
                  { title: "View All Documents", url: "/documents" },
                ]),
        ] as NavMenuItem[],
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
              <Button
                onClick={() => setIsCreateDialogOpen(true)}
                className={cn(
                  "flex items-center gap-2 bg-primary/10 hover:bg-primary/20",
                  "px-4 py-2 rounded-md transition-colors text-primary font-medium"
                )}
              >
                <PlusCircle className="h-4 w-4" />
                <span className="">New Document</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser session={session} />
      </SidebarFooter>

      {/* Create Document Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-md max-w-[90vw] w-full mx-auto p-5 sm:p-6">
          <DialogHeader className="pb-3">
            <DialogTitle className="text-xl">Create New Document</DialogTitle>
            <DialogDescription className="pt-1.5">
              Enter a name for your new document or leave blank for "Untitled
              document".
            </DialogDescription>
          </DialogHeader>
          <div className="py-3">
            <Label
              htmlFor="sidebar-document-name"
              className="text-sm font-medium"
            >
              Document name
            </Label>
            <Input
              id="sidebar-document-name"
              value={newDocumentName}
              onChange={(e) => setNewDocumentName(e.target.value)}
              placeholder="Enter document name"
              className="mt-2"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCreateDocument();
                }
              }}
            />
          </div>
          <DialogFooter className="flex sm:flex-row flex-col gap-3 sm:gap-2 mt-3 pt-2">
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(false)}
              className="sm:w-auto w-full order-1 sm:order-none"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateDocument}
              disabled={createDocumentMutation.isPending}
              className="sm:w-auto w-full"
            >
              {createDocumentMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Sidebar>
  );
}
