import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ToolbarProvider } from "./toolbar-provider";
import type { Editor } from "@tiptap/core";
import { UndoToolbar } from "./undo";
import { RedoToolbar } from "./redo";
import { HeadingsToolbar } from "./headings";
import { BlockquoteToolbar } from "./blockquote";
import { CodeToolbar } from "./code";
import { BoldToolbar } from "./bold";
import { ItalicToolbar } from "./italic";
import { UnderlineToolbar } from "./underline";
import { StrikeThroughToolbar } from "./strikethrough";
import { LinkToolbar } from "./link";
import { BulletListToolbar } from "./bullet-list";
import { OrderedListToolbar } from "./ordered-list";
import { HorizontalRuleToolbar } from "./horizontal-rule";
import { AlignmentTooolbar } from "./alignment";
import { ImagePlaceholderToolbar } from "./image-placeholder-toolbar";
import { ColorHighlightToolbar } from "./color-and-highlight";
import { SearchAndReplaceToolbar } from "./search-and-replace-toolbar";
import { CodeBlockToolbar } from "./code-block";
import { TableToolbar } from "../extensions/table-toolbar";
import { TaskListToolbar } from "./task-list";
import { YoutubeToolbar } from "../extensions/youtube-toolbar";
import { useMediaQuery } from "@/hooks/use-media-querry";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import { useState } from "react";

interface EditorToolbarProps {
  editor: Editor;
  documentTitle?: string;
}

export const EditorToolbar = ({
  editor,
  documentTitle,
}: EditorToolbarProps) => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (isMobile) {
    return (
      <div className="sticky top-0 z-30 w-full border-b bg-background">
        <div className="flex items-center justify-between p-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center gap-2"
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
            <span>{documentTitle ? documentTitle : "Editor Tools"}</span>
            {mobileMenuOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
          <div className="flex items-center gap-1">
            <UndoToolbar />
            <RedoToolbar />
          </div>
        </div>

        {mobileMenuOpen && (
          <ToolbarProvider editor={editor}>
            <TooltipProvider>
              <ScrollArea className="h-fit max-h-[50vh] py-0.5 border-t">
                <div className="p-2 grid grid-cols-4 gap-1">
                  {/* Text Structure Group */}
                  <HeadingsToolbar />
                  <BlockquoteToolbar />
                  <CodeToolbar />
                  <CodeBlockToolbar />

                  {/* Basic Formatting Group */}
                  <BoldToolbar />
                  <ItalicToolbar />
                  <UnderlineToolbar />
                  <StrikeThroughToolbar />
                  <LinkToolbar />

                  {/* Lists & Structure Group */}
                  <BulletListToolbar />
                  <OrderedListToolbar />
                  <HorizontalRuleToolbar />
                  <TaskListToolbar />

                  {/* Alignment Group */}
                  <AlignmentTooolbar />

                  {/* Media & Styling Group */}
                  <ImagePlaceholderToolbar />
                  <TableToolbar />
                  <YoutubeToolbar />
                  <ColorHighlightToolbar />

                  {/* Utility Group */}
                  <SearchAndReplaceToolbar />
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </TooltipProvider>
          </ToolbarProvider>
        )}
      </div>
    );
  }

  return (
    <div className="sticky top-0 z-30 w-full border-b bg-background shadow-sm">
      <ToolbarProvider editor={editor}>
        <TooltipProvider>
          <ScrollArea className="h-fit py-0.5">
            <div>
              <div className="flex items-center gap-1 px-2">
                {/* History Group */}
                <UndoToolbar />
                <RedoToolbar />
                <Separator orientation="vertical" className="mx-1 h-7" />

                {/* Text Structure Group */}
                <HeadingsToolbar />
                <BlockquoteToolbar />
                <CodeToolbar />
                <CodeBlockToolbar />
                <Separator orientation="vertical" className="mx-1 h-7" />

                {/* Basic Formatting Group */}
                <BoldToolbar />
                <ItalicToolbar />
                <UnderlineToolbar />
                <StrikeThroughToolbar />
                <LinkToolbar />
                <Separator orientation="vertical" className="mx-1 h-7" />

                {/* Lists & Structure Group */}
                <BulletListToolbar />
                <OrderedListToolbar />
                <HorizontalRuleToolbar />
                <TaskListToolbar />
                <Separator orientation="vertical" className="mx-1 h-7" />

                {/* Alignment Group */}
                <AlignmentTooolbar />
                <Separator orientation="vertical" className="mx-1 h-7" />

                {/* Media & Styling Group */}
                <ImagePlaceholderToolbar />
                <TableToolbar />
                <YoutubeToolbar />
                <ColorHighlightToolbar />
                <Separator orientation="vertical" className="mx-1 h-7" />

                <div className="flex-1" />

                {/* Utility Group */}
                <SearchAndReplaceToolbar />
              </div>
            </div>
            <ScrollBar className="hidden" orientation="horizontal" />
          </ScrollArea>
        </TooltipProvider>
      </ToolbarProvider>
    </div>
  );
};
