"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToolbar } from "../toolbars/toolbar-provider";
import { useMediaQuery } from "@/hooks/use-media-querry";
import { MobileToolbarGroup } from "../toolbars/mobile-toolbar-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const YoutubeIcon = () => {
  return (
    <svg
      viewBox="0 -7 48 48"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      fill="#ffffff"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <title>Youtube-color</title> <desc>Created with Sketch.</desc>{" "}
        <defs> </defs>{" "}
        <g
          id="Icons"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          {" "}
          <g
            id="Color-"
            transform="translate(-200.000000, -368.000000)"
            fill="#ffffff"
          >
            {" "}
            <path
              d="M219.044,391.269916 L219.0425,377.687742 L232.0115,384.502244 L219.044,391.269916 Z M247.52,375.334163 C247.52,375.334163 247.0505,372.003199 245.612,370.536366 C243.7865,368.610299 241.7405,368.601235 240.803,368.489448 C234.086,368 224.0105,368 224.0105,368 L223.9895,368 C223.9895,368 213.914,368 207.197,368.489448 C206.258,368.601235 204.2135,368.610299 202.3865,370.536366 C200.948,372.003199 200.48,375.334163 200.48,375.334163 C200.48,375.334163 200,379.246723 200,383.157773 L200,386.82561 C200,390.73817 200.48,394.64922 200.48,394.64922 C200.48,394.64922 200.948,397.980184 202.3865,399.447016 C204.2135,401.373084 206.612,401.312658 207.68,401.513574 C211.52,401.885191 224,402 224,402 C224,402 234.086,401.984894 240.803,401.495446 C241.7405,401.382148 243.7865,401.373084 245.612,399.447016 C247.0505,397.980184 247.52,394.64922 247.52,394.64922 C247.52,394.64922 248,390.73817 248,386.82561 L248,383.157773 C248,379.246723 247.52,375.334163 247.52,375.334163 L247.52,375.334163 Z"
              id="Youtube"
            >
              {" "}
            </path>{" "}
          </g>{" "}
        </g>{" "}
      </g>
    </svg>
  );
};

// Utility function to extract YouTube video ID from various URL formats
const getYoutubeVideoId = (url: string): string | null => {
  if (!url) return null;

  // Match patterns like youtube.com/watch?v=VIDEO_ID or youtu.be/VIDEO_ID
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
};

// Format YouTube URL properly for embedding
const formatYoutubeUrl = (url: string): string | null => {
  const videoId = getYoutubeVideoId(url);
  if (!videoId) return null;

  return `https://www.youtube.com/embed/${videoId}`;
};

export const YoutubeToolbar = () => {
  const { editor } = useToolbar();
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isSmallScreen = useMediaQuery("(max-width: 480px)");
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [width, setWidth] = useState(640);
  const [height, setHeight] = useState(480);
  const [error, setError] = useState<string | null>(null);

  const isDisabled = !editor
    ?.can()
    .chain()
    .focus()
    .setYoutubeVideo({ src: "" })
    .run();

  const handleInsertVideo = () => {
    setError(null);
    const formattedUrl = formatYoutubeUrl(url);

    if (!formattedUrl) {
      setError("Invalid YouTube URL. Please enter a valid YouTube URL.");
      return;
    }

    editor?.commands.setYoutubeVideo({
      src: formattedUrl,
      width: Math.max(320, width) || 640,
      height: Math.max(180, height) || 480,
    });

    setUrl("");
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <MobileToolbarGroup label="YouTube">
        <div className="p-3 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="youtube-url">YouTube URL</Label>
            <Input
              id="youtube-url"
              type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setError(null);
              }}
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="video-width">Width</Label>
              <Input
                id="video-width"
                type="number"
                min="320"
                max="1024"
                value={width}
                onChange={(e) =>
                  setWidth(Number.parseInt(e.target.value) || 640)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="video-height">Height</Label>
              <Input
                id="video-height"
                type="number"
                min="180"
                max="720"
                value={height}
                onChange={(e) =>
                  setHeight(Number.parseInt(e.target.value) || 480)
                }
              />
            </div>
          </div>
          <Button
            onClick={handleInsertVideo}
            className="w-full"
            disabled={!url}
          >
            Insert YouTube Video
          </Button>
        </div>
      </MobileToolbarGroup>
    );
  }

  return (
    <TooltipProvider>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={cn("h-8 w-max gap-1 px-3 font-normal")}
                disabled={isDisabled}
              >
                <span className="hidden sm:inline">YouTube</span>
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>YouTube Video</TooltipContent>
        </Tooltip>

        <PopoverContent
          className={cn(
            "w-auto",
            isSmallScreen ? "max-w-[280px]" : "min-w-[320px]"
          )}
          align="start"
          sideOffset={5}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Insert YouTube Video</h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="youtube-url">YouTube URL</Label>
              <Input
                id="youtube-url"
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setError(null);
                }}
              />
              {error && <p className="text-xs text-red-500">{error}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="video-width">Width</Label>
                <Input
                  id="video-width"
                  type="number"
                  min="320"
                  max="1024"
                  value={width}
                  onChange={(e) =>
                    setWidth(Number.parseInt(e.target.value) || 640)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="video-height">Height</Label>
                <Input
                  id="video-height"
                  type="number"
                  min="180"
                  max="720"
                  value={height}
                  onChange={(e) =>
                    setHeight(Number.parseInt(e.target.value) || 480)
                  }
                />
              </div>
            </div>

            <Button
              onClick={handleInsertVideo}
              className="w-full"
              disabled={!url}
            >
              Insert YouTube Video
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  );
};
