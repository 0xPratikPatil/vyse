"use client"
import "./tiptap.css"
import { cn } from "@/lib/utils"
import { ImageExtension } from "@/components/tiptap/extensions/image"
import { ImagePlaceholder } from "@/components/tiptap/extensions/image-placeholder"
import { YoutubePlaceholder } from "@/components/tiptap/extensions/youtube-placeholder"
import SearchAndReplace from "@/components/tiptap/extensions/search-and-replace"
import { Color } from "@tiptap/extension-color"
import Highlight from "@tiptap/extension-highlight"
import Link from "@tiptap/extension-link"
import Subscript from "@tiptap/extension-subscript"
import Superscript from "@tiptap/extension-superscript"
import TextAlign from "@tiptap/extension-text-align"
import TextStyle from "@tiptap/extension-text-style"
import Typography from "@tiptap/extension-typography"
import Underline from "@tiptap/extension-underline"
import { EditorContent, type Extension, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { TipTapFloatingMenu } from "@/components/tiptap/extensions/floating-menu"
import { FloatingToolbar } from "@/components/tiptap/extensions/floating-toolbar"
import { EditorToolbar } from "./toolbars/editor-toolbar"
import Placeholder from "@tiptap/extension-placeholder"
import { content as defaultContent } from "@/lib/content"
import Table from "@tiptap/extension-table"
import TableRow from "@tiptap/extension-table-row"
import TableHeader from "@tiptap/extension-table-header"
import TableCell from "@tiptap/extension-table-cell"
import TaskList from "@tiptap/extension-task-list"
import TaskItem from "@tiptap/extension-task-item"
import Youtube from "@tiptap/extension-youtube"
import { useRef, useEffect } from "react"

const extensions = [
  StarterKit.configure({
    orderedList: {
      HTMLAttributes: {
        class: "list-decimal",
      },
    },
    bulletList: {
      HTMLAttributes: {
        class: "list-disc",
      },
    },
    heading: {
      levels: [1, 2, 3, 4],
    },
  }),
  Placeholder.configure({
    emptyNodeClass: "is-editor-empty",
    placeholder: ({ node }) => {
      switch (node.type.name) {
        case "heading":
          return `Heading ${node.attrs.level}`
        case "detailsSummary":
          return "Section title"
        case "codeBlock":
          // never show the placeholder when editing code
          return ""
        default:
          return "Write, type '/' for commands"
      }
    },
    includeChildren: false,
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  TextStyle,
  Subscript,
  Superscript,
  Underline,
  Link,
  Color,
  Highlight.configure({
    multicolor: true,
  }),
  ImageExtension.configure({
    allowBase64: true,
  }),
  ImagePlaceholder,
  YoutubePlaceholder,
  SearchAndReplace,
  Typography,
  // Add table extensions
  Table.configure({
    resizable: true,
    HTMLAttributes: {
      class: "tiptap-table",
    },
  }),
  TableRow,
  TableHeader,
  TableCell,
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  Youtube.configure({
    controls: false,
    nocookie: true,
  }),
]

interface RichTextEditorProps {
  className?: string;
  initialContent?: string;
  onUpdate?: (content: string) => void;
  documentTitle?: string;
}

export function RichTextEditor({ 
  className,
  initialContent,
  onUpdate,
  documentTitle,
}: RichTextEditorProps) {
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastContentRef = useRef<string>(initialContent || defaultContent);
  const isInitializedRef = useRef<boolean>(false);
  const isUpdatingContentRef = useRef<boolean>(false);
  
  const editor = useEditor({
    immediatelyRender: false,
    extensions: extensions as Extension[],
    content: initialContent || defaultContent,
    editorProps: {
      attributes: {
        class: "max-w-full focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      // Skip updates while we're programmatically updating content
      if (isUpdatingContentRef.current) return;
      
      // Get HTML content from editor
      const html = editor.getHTML();
      
      // Only process updates if content actually changed
      if (html !== lastContentRef.current) {
        console.log("Editor content changed, triggering update");
        lastContentRef.current = html;
        
        // Reset inactivity timer on each update
        if (inactivityTimerRef.current) {
          clearTimeout(inactivityTimerRef.current);
        }
        
        // Set new timer for 1 second
        inactivityTimerRef.current = setTimeout(() => {
          // Call onUpdate callback after inactivity
          if (onUpdate) {
            onUpdate(html);
          }
        }, 1000);
      }
    },
  })

  // Reset content when initialContent changes (e.g., when a new document is loaded)
  useEffect(() => {
    if (!editor || isUpdatingContentRef.current) return;
    
    // Only update if we've initialized or the content actually changed
    if ((isInitializedRef.current || initialContent !== undefined) && 
        editor.getHTML() !== initialContent) {
      
      // Set flag to prevent update loop
      isUpdatingContentRef.current = true;
      
      try {
        editor.commands.setContent(initialContent || defaultContent);
        lastContentRef.current = initialContent || defaultContent;
      } finally {
        // Reset flag after update
        isUpdatingContentRef.current = false;
        
        // Mark as initialized
        isInitializedRef.current = true;
      }
    }
  }, [editor, initialContent]);

  // Clear timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
        
        // Make sure to save any pending changes before unmounting
        if (onUpdate && editor && !isUpdatingContentRef.current) {
          const finalContent = editor.getHTML();
          if (finalContent !== lastContentRef.current) {
            onUpdate(finalContent);
          }
        }
      }
    };
  }, [editor, onUpdate]);

  if (!editor) return null

  return (
    <div
      className={cn(
        "relative flex flex-col w-full h-full min-h-[calc(100dvh-3rem)] overflow-hidden",
        className,
      )}
    >
      <EditorToolbar editor={editor} documentTitle={documentTitle} />
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <FloatingToolbar editor={editor} />
        <TipTapFloatingMenu editor={editor} />
        <EditorContent editor={editor} className="h-full w-full px-4 py-6 sm:px-6 lg:px-8 max-w-full" />
      </div>
    </div>
  )
}
