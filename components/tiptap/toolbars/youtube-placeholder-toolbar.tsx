"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useToolbar } from "./toolbar-provider";
import { YoutubeIcon } from "../extensions/youtube-toolbar";

const YoutubePlaceholderToolbar = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, onClick, children, ...props }, ref) => {
  const { editor } = useToolbar();
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8 p-0 sm:h-9 sm:w-9",
            editor?.isActive("youtube-placeholder") && "bg-accent",
            className
          )}
          onClick={(e) => {
            e.preventDefault();
            const chain = editor?.chain?.();
            if (chain && typeof chain.insertYoutubePlaceholder === "function") {
              chain.focus().insertYoutubePlaceholder().run();
            } else if ((editor as any)?.chain?.().insertYoutubePlaceholder) {
              (editor as any).chain().focus().insertYoutubePlaceholder().run();
            } else {
              alert(
                "YouTube placeholder command not available. Try reloading the page or check extension registration."
              );
            }
            onClick?.(e);
          }}
          ref={ref}
          {...props}
        >
          {children ?? <YoutubeIcon className="h-4 w-4" />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <span>YouTube</span>
      </TooltipContent>
    </Tooltip>
  );
});

YoutubePlaceholderToolbar.displayName = "YoutubePlaceholderToolbar";

export { YoutubePlaceholderToolbar };
