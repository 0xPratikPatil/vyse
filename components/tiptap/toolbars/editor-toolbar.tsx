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
import { YoutubePlaceholderToolbar } from "./youtube-placeholder-toolbar";
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

  if (isMobile) {
    return (
      <div className="sticky top-0 z-30 w-full border-b bg-background shadow-sm">
        <ToolbarProvider editor={editor}>
          <TooltipProvider>
            <ScrollArea className="h-fit py-0.5">
              <div>
                <div className="flex items-center gap-1 px-2 min-w-max overflow-x-auto">
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
                  <YoutubePlaceholderToolbar />
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
                <YoutubePlaceholderToolbar />
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
