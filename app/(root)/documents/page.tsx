"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  PlusCircle,
  FileText,
  Loader2,
  Share2,
  Pencil,
  Trash2,
  MoreHorizontal,
} from "lucide-react";
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
import { toast } from "sonner";
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
import {
  useDocuments,
  useDeleteDocument,
  useUpdateDocument,
  Document,
  useCreateDocument,
} from "@/features/documents/api/useDocuments";
import { formatDistanceToNow } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { content } from "@/lib/content";

export default function DocumentsPage() {
  const router = useRouter();
  const {
    data: documentsResponse,
    isPending: isLoading,
    error,
  } = useDocuments();
  const documents = documentsResponse?.data as Document[];

  const deleteDocumentMutation = useDeleteDocument();
  const updateDocumentMutation = useUpdateDocument();
  const createDocumentMutation = useCreateDocument();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<Document | null>(
    null
  );
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [documentToRename, setDocumentToRename] = useState<Document | null>(
    null
  );
  const [newDocumentTitle, setNewDocumentTitle] = useState<string>("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newDocumentName, setNewDocumentName] = useState<string>("");
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (error) {
      toast.error("Failed to load documents");
    }
  }, [error]);

  const handleCreateDocument = () => {
    if (!newDocumentName.trim()) return;

    const documentData = {
      title: newDocumentName.trim(),
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
      }
    );
  };

  const handleShare = (documentId: string, title: string | null) => {
    // First, update the document to enable sharing if not already shared
    updateDocumentMutation.mutate(
      {
        json: {
          id: documentId,
          isShared: true,
        },
      },
      {
        onSuccess: (response) => {
          // Then copy the share link to clipboard
          const shareLink =
            response.data.shareLink ||
            `${window.location.origin}/shared/${documentId}`;
          navigator.clipboard
            .writeText(shareLink)
            .then(() => {
              toast.success("Document link copied successfully");
            })
            .catch(() => {
              toast.error("Failed to copy link to clipboard");
            });
        },
      }
    );
  };

  const handleRenameClick = (document: Document) => {
    setDocumentToRename(document);
    setNewDocumentTitle(document.title || "");
    setIsRenameDialogOpen(true);

    // Focus on input after dialog opens
    setTimeout(() => {
      if (titleInputRef.current) {
        titleInputRef.current.focus();
        titleInputRef.current.select();
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
        },
      }
    );
  };

  const handleDeleteClick = (e: React.MouseEvent, document: Document) => {
    e.preventDefault();
    e.stopPropagation();
    setDocumentToDelete(document);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!documentToDelete) return;

    deleteDocumentMutation.mutate(
      {
        json: {
          id: documentToDelete.id,
        },
      },
      {
        onSuccess: () => {
          setDocumentToDelete(null);
          setIsDeleteDialogOpen(false);
        },
        onError: (error) => {
          toast.error(`Failed to delete document: ${error.message}`);
          setDocumentToDelete(null);
          setIsDeleteDialogOpen(false);
        },
      }
    );
  };

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="flex flex-col h-full overflow-auto">
      <div className="p-4 sm:p-6 max-w-4xl mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl sm:text-2xl font-bold">Documents</h1>

          <Button
            className="flex items-center gap-2 sm:w-auto"
            onClick={() => setIsCreateDialogOpen(true)}
          >
            <PlusCircle className="h-4 w-4" />
            <span className="sm:inline hidden">New Document</span>
            <span className="sm:hidden inline">New</span>
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : documents && documents.length > 0 ? (
          <div className="grid gap-4 pb-6">
            {documents.map((document: Document) => (
              <div
                key={document.id}
                className="flex items-center p-4 border rounded-lg hover:bg-accent/50 transition-colors group"
              >
                <Link
                  href={`/editor/${document.id}`}
                  className="flex items-center flex-1 min-w-0"
                >
                  <div className="mr-4">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-medium truncate"
                      title={document.title || "Untitled document"}
                    >
                      {document.title || "Untitled document"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(document.updatedAt)}
                    </p>
                  </div>
                </Link>

                <div className="flex items-center gap-2">
                  {/* Desktop icon buttons, only visible on md+ */}
                  <div className="hidden md:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.preventDefault();
                              handleShare(document.id, document.title);
                            }}
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Share document</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.preventDefault();
                              handleRenameClick(document);
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Rename document</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={(e) => handleDeleteClick(e, document)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Delete document</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  {/* Mobile-friendly dropdown, always visible on mobile */}
                  <div className="flex md:hidden">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() =>
                            handleShare(document.id, document.title)
                          }
                        >
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleRenameClick(document)}
                        >
                          <Pencil className="h-4 w-4 mr-2" />
                          Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => handleDeleteClick(e, document)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No documents yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first document to get started
            </p>
            <Button
              className="flex items-center gap-2"
              onClick={() => setIsCreateDialogOpen(true)}
            >
              <PlusCircle className="h-4 w-4" />
              <span>New Document</span>
            </Button>
          </div>
        )}
      </div>

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

      {/* Delete Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Document</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "
              {documentToDelete?.title || "Untitled document"}"? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setDocumentToDelete(null);
                setIsDeleteDialogOpen(false);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
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
        <DialogContent className="sm:max-w-md max-w-[95vw] w-full mx-auto">
          <DialogHeader>
            <DialogTitle>Rename Document</DialogTitle>
            <DialogDescription>
              Enter a new name for this document.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="document-title">Document name</Label>
            <Input
              id="document-title"
              value={newDocumentTitle}
              onChange={(e) => setNewDocumentTitle(e.target.value)}
              placeholder="Enter document name"
              ref={titleInputRef}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleRenameConfirm();
                }
              }}
            />
          </div>
          <DialogFooter className="flex sm:flex-row flex-col gap-2 sm:gap-0">
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
    </div>
  );
}
