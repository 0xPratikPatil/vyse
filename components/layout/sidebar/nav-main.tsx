"use client";

import { useState, useRef } from "react";
import {
  ChevronRight,
  type LucideIcon,
  Share2,
  Pencil,
  Trash2,
  MoreHorizontal,
} from "lucide-react";
import Link from "next/link";

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
// import { useDeleteChat, useRenameChat } from "@/features/chat/api/useChats";
import { toast } from "sonner";

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
    }[];
  }[];
}) {
  const [chatToDelete, setChatToDelete] = useState<string | null>(null);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [chatToRename, setChatToRename] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [newChatTitle, setNewChatTitle] = useState<string>("");
  const newChatTitleRef = useRef<HTMLInputElement>(null);

  // const deleteChatMutation = useDeleteChat();
  // const renameChatMutation = useRenameChat();

  const handleShare = (e: React.MouseEvent, id?: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!id) return;

    // Copy chat link to clipboard
    navigator.clipboard
      .writeText(
        `${process.env.NEXT_PUBLIC_APP_URL || window.location.origin}/chat/${id}`
      )
      .then(() => {
        toast.success("Chat link copied to clipboard");
      })
      .catch(() => {
        toast.error("Failed to copy link to clipboard");
      });
  };

  const handleRename = (e: React.MouseEvent, id?: string, title?: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!id || !title) return;

    setChatToRename({ id, title });
    setNewChatTitle(title);
    setIsRenameDialogOpen(true);

    // Focus on input after dialog opens
    setTimeout(() => {
      if (newChatTitleRef.current) {
        newChatTitleRef.current.focus();
        newChatTitleRef.current.select();
      }
    }, 100);
  };

  // const handleRenameConfirm = () => {
  //   if (!chatToRename || !newChatTitle.trim()) return;

  //   renameChatMutation.mutate(
  //     {
  //       json: {
  //         chatId: chatToRename.id,
  //         title: newChatTitle.trim(),
  //       },
  //     },
  //     {
  //       onSuccess: () => {
  //         setIsRenameDialogOpen(false);
  //         setChatToRename(null);
  //       },
  //     }
  //   );
  // };

  const handleDelete = (e: React.MouseEvent, id?: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!id) return;

    setChatToDelete(id);
  };

  // const confirmDelete = () => {
  //   if (chatToDelete) {
  //     deleteChatMutation.mutate(
  //       {
  //         json: {
  //           chatId: chatToDelete,
  //         },
  //       },
  //       {
  //         onSuccess: () => {
  //           setChatToDelete(null);
  //         },
  //       }
  //     );
  //   }
  // };

  // Extracts the chat ID from the URL if it's a chat URL
  const getChatIdFromUrl = (url: string): string | undefined => {
    if (url.startsWith("/chat/")) {
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
                <a href={item.url}>
                  <item.icon />
                  <span className="truncate">{item.title}</span>
                </a>
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
                        const chatId =
                          getChatIdFromUrl(subItem.url) || subItem.id;
                        // Skip adding actions to "View All" item or when the item is a loading placeholder or no-chats indicator
                        const shouldShowActions =
                          subItem.title !== "View All" &&
                          subItem.title !== "Loading chats..." &&
                          subItem.title !== "No chats yet";

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
                                      >
                                        <DropdownMenuItem
                                          onClick={(e) =>
                                            handleShare(e, chatId)
                                          }
                                        >
                                          <Share2 className="h-4 w-4 mr-2" />
                                          Share
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                          onClick={(e) =>
                                            handleRename(
                                              e,
                                              chatId,
                                              subItem.title
                                            )
                                          }
                                        >
                                          <Pencil className="h-4 w-4 mr-2" />
                                          Rename
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                          onClick={(e) =>
                                            handleDelete(e, chatId)
                                          }
                                          className="text-destructive focus:text-destructive"
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
        open={chatToDelete !== null}
        onOpenChange={(open) => !open && setChatToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Chat</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this chat? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            {/* <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deleteChatMutation.isPending}
            >
              {deleteChatMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction> */}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Rename Dialog */}
      <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Chat</DialogTitle>
            <DialogDescription>
              Enter a new name for this chat.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="chat-title">Chat name</Label>
            <Input
              id="chat-title"
              value={newChatTitle}
              onChange={(e) => setNewChatTitle(e.target.value)}
              placeholder="Enter chat name"
              ref={newChatTitleRef}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  // handleRenameConfirm();
                }
              }}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsRenameDialogOpen(false)}
            >
              Cancel
            </Button>
            {/* <Button
              onClick={handleRenameConfirm}
              disabled={!newChatTitle.trim() || renameChatMutation.isPending}
            >
              {renameChatMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </Button> */}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarGroup>
  );
}
