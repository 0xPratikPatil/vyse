"use client";

import { useState } from "react";
import { RichTextEditor } from "@/components/tiptap/rich-text-editor";
import { Input } from "@/components/ui/input";

export default function DemoEditorPage() {
  const [title, setTitle] = useState("Demo Document");
  const [content, setContent] = useState("");

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-between p-2 border-b">
        <div className="flex-1 max-w-sm">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-lg font-semibold border-none focus-visible:ring-0 px-2"
            placeholder="Untitled Document"
          />
        </div>
      </div>
      <RichTextEditor
        className="flex-1"
        initialContent={content}
        onUpdate={setContent}
      />
    </div>
  );
}
