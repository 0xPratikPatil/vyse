"use client";

import { useEffect, useState, useRef } from "react";
import {
  useDocument,
  useUpdateDocument,
  Document,
} from "@/features/documents/api/useDocuments";
import { RichTextEditor } from "@/components/tiptap/rich-text-editor";
import { Loader2, Save, AlertCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React from "react";

// Save status type for tracking document state
type SaveStatus = "saved" | "saving" | "error" | "idle";

export default function EditorPage({ params }: { params: { id: string } }) {
  // Safely unwrap params for future Next.js compatibility
  const resolvedParams = React.use(
    params as unknown as Promise<{ id: string }>
  );

  const { data: documentResponse, isPending, error } = useDocument(resolvedParams.id);
  const document = documentResponse?.data as Document;
  const updateDocumentMutation = useUpdateDocument();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Refs to track content without triggering re-renders
  const contentRef = useRef("");
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoSaveEnabledRef = useRef(false);
  const hasPendingChangesRef = useRef(false);

  // Load document when available
  useEffect(() => {
    if (document) {
      setTitle(document.title || "Untitled Document");
      setContent(document.content || "");
      contentRef.current = document.content || "";
      setSaveStatus("saved");
      setLastSaved(new Date(document.updatedAt));

      // Enable auto-save after initial load
      setTimeout(() => {
        autoSaveEnabledRef.current = true;
      }, 1000);
    }
  }, [document]);

  // Cleanup function for auto-save
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  // Function to actually perform the save
  const saveContent = async () => {
    // Skip if there's no document loaded yet
    if (!document) return;

    // Skip if content hasn't changed
    if (contentRef.current === document.content) return;

    // Skip if auto-save isn't enabled yet (prevents saving right after load)
    if (!autoSaveEnabledRef.current) return;

    console.log("Auto-saving content...", {
      contentLength: contentRef.current.length,
      docContentLength: document.content?.length,
    });
    
    setSaveStatus("saving");
    hasPendingChangesRef.current = false;

    try {
      await updateDocumentMutation.mutateAsync({
        json: {
          id: document.id,
          content: contentRef.current,
        },
      });
      
      console.log("Auto-save successful");
      setSaveStatus("saved");
      setLastSaved(new Date());
      
      // If changes were made during saving, schedule another save
      if (hasPendingChangesRef.current) {
        if (saveTimeoutRef.current) {
          clearTimeout(saveTimeoutRef.current);
        }
        saveTimeoutRef.current = setTimeout(() => {
          saveContent();
        }, 2000);
      }
    } catch (error) {
      console.error("Auto-save failed:", error);
      setSaveStatus("error");
      toast.error("Failed to save document");
    }
  };

  // Handle editor content updates
  const handleEditorUpdate = (newContent: string) => {
    // Skip if content hasn't actually changed
    if (newContent === contentRef.current) return;

    // Mark that we have pending changes
    hasPendingChangesRef.current = true;
    
    // Update content ref
    contentRef.current = newContent;

    // Update state (only if needed for UI)
    setContent(newContent);

    // Set status to idle if it was previously saved
    if (saveStatus === "saved") {
      setSaveStatus("idle");
    }

    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Set new timeout for auto-save (reduced to 2 seconds)
    saveTimeoutRef.current = setTimeout(() => {
      saveContent();
    }, 2000);
  };

  // Handle title change with immediate save
  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleTitleBlur = async () => {
    if (!document || title === document.title) return;

    setSaveStatus("saving");
    try {
      await updateDocumentMutation.mutateAsync({
        json: {
          id: document.id,
          title,
        },
      });
      
      setSaveStatus("saved");
      setLastSaved(new Date());
    } catch (error) {
      setSaveStatus("error");
      // Revert to original title on error
      setTitle(document.title);
      toast.error("Failed to save document title");
    }
  };

  const handleManualSave = async () => {
    if (!document) return;

    setSaveStatus("saving");
    try {
      await updateDocumentMutation.mutateAsync({
        json: {
          id: document.id,
          title,
          content: contentRef.current,
        },
      });
      
      setSaveStatus("saved");
      setLastSaved(new Date());
      toast.success("Document saved successfully");
    } catch (error) {
      toast.error("Failed to save document");
      setSaveStatus("error");
    }
  };

  // Format the last saved time
  const getLastSavedText = () => {
    if (!lastSaved) return "";

    const now = new Date();
    const diffMs = now.getTime() - lastSaved.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Just now";
    if (diffMins === 1) return "1 minute ago";
    return `${diffMins} minutes ago`;
  };

  // Get status indicator color
  const getStatusColor = () => {
    switch (saveStatus) {
      case "saved":
        return "text-green-500";
      case "saving":
        return "text-yellow-500";
      case "error":
        return "text-red-500";
      default:
        return "text-muted-foreground";
    }
  };

  // Get status indicator icon
  const StatusIcon = () => {
    switch (saveStatus) {
      case "saved":
        return (
          <CheckCircle2 className={cn("h-4 w-4 mr-1", getStatusColor())} />
        );
      case "saving":
        return (
          <Loader2 className="h-4 w-4 mr-1 animate-spin text-yellow-500" />
        );
      case "error":
        return <AlertCircle className="h-4 w-4 mr-1 text-red-500" />;
      default:
        return null;
    }
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !document) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Error Loading Document</h1>
        <p className="text-muted-foreground mb-4">
          {error?.message || "Document not found"}
        </p>
        <Button onClick={() => (window.location.href = "/documents")}>
          Go to Documents
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-2 border-b">
        <div className="flex-1 max-w-sm bg-black">
          <Input
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            onBlur={handleTitleBlur}
            className="text-lg font-semibold border-none focus-visible:ring-0 px-2"
            placeholder="Untitled Document"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className={cn("flex items-center text-xs font-medium", getStatusColor())}>
            <StatusIcon />
            {saveStatus === "saved" && lastSaved && (
              <span>Saved {getLastSavedText()}</span>
            )}
            {saveStatus === "saving" && <span>Saving...</span>}
            {saveStatus === "error" && <span>Error saving</span>}
            {saveStatus === "idle" && <span>Unsaved changes</span>}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleManualSave}
            className="flex items-center gap-1"
            disabled={saveStatus === "saving"}
          >
            <Save className="h-4 w-4" />
            <span>Save</span>
          </Button>
        </div>
      </div>

      <RichTextEditor
        className="flex-1"
        initialContent={content}
        onUpdate={handleEditorUpdate}
        documentTitle={title}
      />
    </div>
  );
}
