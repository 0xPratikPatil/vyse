"use client";

import { useState, useRef } from "react";
import {
  ChevronRight,
  type LucideIcon,
  Share2,
  Pencil,
  Trash2,
  MoreHorizontal,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import {
  useDeleteDocument,
  useUpdateDocument,
} from "@/features/documents/api/useDocuments";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
      id?: string;
      subtitle?: string;
    }[];
  }[];
}) {
  const router = useRouter();
  const [documentToDelete, setDocumentToDelete] = useState<string | null>(null);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [documentToRename, setDocumentToRename] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [newDocumentTitle, setNewDocumentTitle] = useState<string>("");
  const newDocumentTitleRef = useRef<HTMLInputElement>(null);

  const deleteDocumentMutation = useDeleteDocument();
  const updateDocumentMutation = useUpdateDocument();

  const handleShare = (e: React.MouseEvent, id?: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!id) return;

    // Copy document link to clipboard
    navigator.clipboard
      .writeText(
        `${process.env.NEXT_PUBLIC_APP_URL || window.location.origin}/shared/${id}`
      )
      .then(() => {
        toast.success("Document link copied to clipboard");
      })
      .catch(() => {
        toast.error("Failed to copy link to clipboard");
      });
  };

  const handleRename = (e: React.MouseEvent, id?: string, title?: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!id || !title) return;

    setDocumentToRename({ id, title });
    setNewDocumentTitle(title);
    setIsRenameDialogOpen(true);

    // Focus on input after dialog opens
    setTimeout(() => {
      if (newDocumentTitleRef.current) {
        newDocumentTitleRef.current.focus();
        newDocumentTitleRef.current.select();
      }
    }, 100);
  };

  const handleRenameConfirm = () => {
    if (!documentToRename || !newDocumentTitle.trim()) return;

    updateDocumentMutation.mutate(
      {
        json: {
          id: documentToRename.id,
          title: newDocumentTitle.trim(),
        },
      },
      {
        onSuccess: () => {
          setIsRenameDialogOpen(false);
          setDocumentToRename(null);
          toast.success("Document renamed successfully");
        },
        onError: () => {
          toast.error("Failed to rename document");
        },
      }
    );
  };

  const handleDelete = (e: React.MouseEvent, id?: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!id) return;

    setDocumentToDelete(id);
  };

  const confirmDelete = () => {
    if (documentToDelete) {
      deleteDocumentMutation.mutate(
        {
          json: {
            id: documentToDelete,
          },
        },
        {
          onSuccess: () => {
            setDocumentToDelete(null);
            router.push("/documents");
          },
        }
      );
    }
  };

  // Extracts the document ID from the URL
  const getDocumentIdFromUrl = (url: string): string | undefined => {
    if (url.startsWith("/editor/")) {
      return url.split("/").pop();
    }
    return undefined;
  };

  return (
    <SidebarGroup>
      {/* <SidebarGroupLabel>Platform</SidebarGroupLabel> */}
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={item.title}>
                <Link href={item.url}>
                  <item.icon />
                  <span className="truncate">{item.title}</span>
                </Link>
              </SidebarMenuButton>
              {item.items?.length ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                      <ChevronRight />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => {
                        const documentId =
                          getDocumentIdFromUrl(subItem.url) || subItem.id;
                        // Skip adding actions to "View All" item or when the item is a loading placeholder or no-documents indicator
                        const shouldShowActions =
                          subItem.title !== "View All Documents" &&
                          subItem.title !== "Loading documents..." &&
                          subItem.title !== "No documents yet";

                        return (
                          <SidebarMenuSubItem
                            key={subItem.url + subItem.title}
                            className="group"
                          >
                            <SidebarMenuSubButton asChild>
                              <Link
                                href={subItem.url}
                                className="flex items-center group/item"
                                title={subItem.title}
                              >
                                <span className="truncate max-w-[180px] flex-1">
                                  {subItem.title}
                                </span>

                                {shouldShowActions && (
                                  <div className="ml-auto opacity-0 group-hover:opacity-100 flex items-center gap-1">
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-5 w-5"
                                        >
                                          <MoreHorizontal className="h-3 w-3" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent
                                        align="end"
                                        side="right"
                                        className="w-[160px] p-1"
                                      >
                                        <DropdownMenuItem
                                          onClick={(e) =>
                                            handleShare(e, documentId)
                                          }
                                          className="text-sm px-2 py-1.5"
                                        >
                                          <Share2 className="h-4 w-4 mr-2" />
                                          Share
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                          onClick={(e) =>
                                            handleRename(
                                              e,
                                              documentId,
                                              subItem.title
                                            )
                                          }
                                          className="text-sm px-2 py-1.5"
                                        >
                                          <Pencil className="h-4 w-4 mr-2" />
                                          Rename
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                          onClick={(e) =>
                                            handleDelete(e, documentId)
                                          }
                                          className="text-sm px-2 py-1.5 text-destructive focus:text-destructive"
                                        >
                                          <Trash2 className="h-4 w-4 mr-2" />
                                          Delete
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                )}
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>

      {/* Delete confirmation dialog */}
      <AlertDialog
        open={documentToDelete !== null}
        onOpenChange={(open) => !open && setDocumentToDelete(null)}
      >
        <AlertDialogContent className="sm:max-w-md max-w-[90vw] w-full mx-auto">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-semibold">
              Delete Document
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this document? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex sm:flex-row flex-col gap-2">
            <AlertDialogCancel className="sm:w-auto w-full order-1 sm:order-none">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 sm:w-auto w-full"
              disabled={deleteDocumentMutation.isPending}
            >
              {deleteDocumentMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Rename Dialog */}
      <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
        <DialogContent className="sm:max-w-md max-w-[90vw] w-full mx-auto p-5 sm:p-6">
          <DialogHeader className="pb-3">
            <DialogTitle className="text-lg font-semibold">
              Rename Document
            </DialogTitle>
            <DialogDescription className="pt-1.5">
              Enter a new name for this document.
            </DialogDescription>
          </DialogHeader>
          <div className="py-3">
            <Label htmlFor="document-title" className="text-sm font-medium">
              Document name
            </Label>
            <Input
              id="document-title"
              value={newDocumentTitle}
              onChange={(e) => setNewDocumentTitle(e.target.value)}
              placeholder="Enter document name"
              className="mt-2"
              ref={newDocumentTitleRef}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleRenameConfirm();
                }
              }}
            />
          </div>
          <DialogFooter className="flex sm:flex-row flex-col gap-3 sm:gap-2 mt-3 pt-2">
            <Button
              variant="outline"
              onClick={() => setIsRenameDialogOpen(false)}
              className="sm:w-auto w-full order-1 sm:order-none"
            >
              Cancel
            </Button>
            <Button
              onClick={handleRenameConfirm}
              disabled={
                !newDocumentTitle.trim() || updateDocumentMutation.isPending
              }
              className="sm:w-auto w-full"
            >
              {updateDocumentMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarGroup>
  );
}
