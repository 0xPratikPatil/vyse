"use client";

import { useState, useEffect } from "react";
import { RichTextEditor } from "@/components/tiptap/rich-text-editor";
import { useCreateDocument } from "@/features/documents/api/useDocuments";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function Page() {
  const [isCreating, setIsCreating] = useState(true);
  const createDocumentMutation = useCreateDocument();
  const router = useRouter();

  // Create a new document when the page loads
  useEffect(() => {
    const createNewDocument = async () => {
      try {
        const response = await createDocumentMutation.mutateAsync({
          json: {
            title: "Untitled Document",
            content: "",
          },
        });
        
        // Navigate to the document editor
        if (response?.data?.id) {
          router.push(`/editor/${response.data.id}`);
        }
      } catch (error) {
        console.error("Failed to create new document:", error);
        setIsCreating(false);
      }
    };

    createNewDocument();
  }, [createDocumentMutation, router]);

  if (isCreating) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-2 text-muted-foreground">Creating a new document...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col flex-1">
      <RichTextEditor className="flex-1" />
    </div>
  );
}
