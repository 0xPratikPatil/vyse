"use client";

import { BubbleMenu, type Editor } from "@tiptap/react";
import { BoldToolbar } from "../toolbars/bold";
import { ItalicToolbar } from "../toolbars/italic";
import { UnderlineToolbar } from "../toolbars/underline";
import { LinkToolbar } from "../toolbars/link";
import { ColorHighlightToolbar } from "../toolbars/color-and-highlight";
import { ToolbarProvider } from "../toolbars/toolbar-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useMediaQuery } from "@/hooks/use-media-querry";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { HeadingsToolbar } from "../toolbars/headings";
import { BulletListToolbar } from "../toolbars/bullet-list";
import { OrderedListToolbar } from "../toolbars/ordered-list";
import { ImagePlaceholderToolbar } from "../toolbars/image-placeholder-toolbar";
import { AlignmentTooolbar } from "../toolbars/alignment";
import { BlockquoteToolbar } from "../toolbars/blockquote";
import { useEffect, useState } from "react";
import { TaskListToolbar } from "../toolbars/task-list";
import { cn } from "@/lib/utils";
import { StrikeThroughToolbar } from "../toolbars/strikethrough";
import { TableToolbar } from "./table-toolbar";
import { YoutubeToolbar } from "./youtube-toolbar";
import { FontFamilyToolbar } from "../toolbars/font-family";

export function FloatingToolbar({ editor }: { editor: Editor | null }) {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isSmallScreen = useMediaQuery("(max-width: 480px)");
  const [shouldShowMenu, setShouldShowMenu] = useState(false);

  // Prevent default context menu on mobile
  useEffect(() => {
    if (!editor?.options.element || !isMobile) return;

    const handleContextMenu = (e: Event) => {
      e.preventDefault();
    };

    const el = editor.options.element;
    el.addEventListener("contextmenu", handleContextMenu);

    return () => el.removeEventListener("contextmenu", handleContextMenu);
  }, [editor, isMobile]);

  if (!editor) return null;

  const checkShouldShow = () => {
    // Only show when there is text selected and not in special nodes
    if (!editor.isEditable || !editor.isFocused) return false;

    // Don't show for empty selection
    const { empty } = editor.state.selection;
    if (empty) return false;

    // Don't show when specific nodes are active
    if (
      editor.isActive("image") ||
      editor.isActive("youtube") ||
      editor.isActive("codeBlock")
    ) {
      return false;
    }

    return true;
  };

  return (
    <TooltipProvider>
      <BubbleMenu
        tippyOptions={{
          duration: 100,
          placement: isMobile ? "bottom" : "top",
          offset: isMobile
            ? ([0, 10] as [number, number])
            : ([0, -10] as [number, number]),
          maxWidth: isMobile ? "100%" : "500px",
          onShow: () => setShouldShowMenu(true),
          onHide: () => setShouldShowMenu(false),
        }}
        shouldShow={checkShouldShow}
        editor={editor}
        className={cn(
          "shadow-md border rounded-md bg-background z-50",
          isMobile ? "w-full min-w-full mx-0" : "w-auto",
        )}
      >
        <ToolbarProvider editor={editor}>
          <ScrollArea className="h-fit py-0.5 w-full overflow-hidden">
            <div className="flex items-center px-2 gap-0.5">
              <div
                className={cn(
                  "flex items-center gap-0.5 p-1",
                  isMobile ? "flex-wrap justify-center" : "",
                )}
              >
                {/* Primary formatting */}
                <BoldToolbar />
                <ItalicToolbar />
                <UnderlineToolbar />
                <StrikeThroughToolbar />
                <FontFamilyToolbar />
                <Separator orientation="vertical" className="h-6 mx-1" />

                {/* Structure controls */}
                <HeadingsToolbar />
                <BulletListToolbar />
                <OrderedListToolbar />
                <TaskListToolbar />
                <Separator orientation="vertical" className="h-6 mx-1" />

                {/* Rich formatting */}
                <ColorHighlightToolbar />
                <LinkToolbar />
                <ImagePlaceholderToolbar />
                {!isSmallScreen && <TableToolbar />}
                {!isSmallScreen && <YoutubeToolbar />}
                <Separator orientation="vertical" className="h-6 mx-1" />

                {/* Additional controls */}
                <AlignmentTooolbar />
                <BlockquoteToolbar />
              </div>
            </div>
            <ScrollBar className="h-0.5" orientation="horizontal" />
          </ScrollArea>
        </ToolbarProvider>
      </BubbleMenu>
    </TooltipProvider>
  );
}
