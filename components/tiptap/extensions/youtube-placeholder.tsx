"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {  X, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Node, NodeViewWrapper, ReactNodeViewRenderer, mergeAttributes, type NodeViewProps, type CommandProps } from "@tiptap/react";
import { cn } from "@/lib/utils";
import { YoutubeIcon } from "./youtube-toolbar";

export interface YoutubePlaceholderOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    youtubePlaceholder: {
      insertYoutubePlaceholder: () => ReturnType;
    };
  }
}

export const YoutubePlaceholder = Node.create<YoutubePlaceholderOptions>({
  name: "youtube-placeholder",

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  group: "block",

  parseHTML() {
    return [{ tag: `div[data-type="${this.name}"]` }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(YoutubePlaceholderComponent);
  },

  addCommands() {
    return {
      insertYoutubePlaceholder: () => (props: CommandProps) => {
        return props.commands.insertContent({
          type: "youtube-placeholder",
        });
      },
    };
  },
});

function YoutubePlaceholderComponent(props: NodeViewProps) {
  const { editor, selected } = props;
  const [url, setUrl] = useState("");
  const [width, setWidth] = useState(640);
  const [height, setHeight] = useState(480);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getYoutubeVideoId = (url: string): string | null => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const formatYoutubeUrl = (url: string): string | null => {
    const videoId = getYoutubeVideoId(url);
    if (!videoId) return null;
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const formattedUrl = formatYoutubeUrl(url);
    if (!formattedUrl) {
      setError("Invalid YouTube URL. Please enter a valid YouTube URL.");
      setLoading(false);
      return;
    }
    const pos = props.getPos?.();
    if (typeof pos === "number") {
      editor.chain().focus()
        .deleteRange({ from: pos, to: pos + 1 })
        .insertContentAt(pos, {
          type: "youtube",
          attrs: {
            src: formattedUrl,
            width: Math.max(320, width) || 640,
            height: Math.max(180, height) || 480,
          }
        })
        .run();
    }
    setLoading(false);
  };

  const handleCancel = () => {
    // Remove this node
    const pos = props.getPos?.();
    if (typeof pos === "number") {
      editor.chain().focus().deleteRange({ from: pos, to: pos + 1 }).run();
    }
  };

  return (
    <NodeViewWrapper className="w-full">
      <div className={cn(
        "relative flex flex-col items-center gap-4 rounded-lg border-2 border-dashed p-8 bg-background transition-all",
        selected && "border-primary bg-primary/5"
      )}>
        <div className="absolute top-2 right-2">
          <Button size="icon" variant="ghost" onClick={handleCancel} type="button">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-col items-center gap-2">
          <YoutubeIcon className="h-8 w-8 text-muted-foreground" />
          <h3 className="text-lg font-semibold">Embed YouTube Video</h3>
        </div>
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
          <Input
            type="url"
            placeholder="YouTube URL (e.g. https://www.youtube.com/watch?v=...)"
            value={url}
            onChange={e => setUrl(e.target.value)}
            required
            disabled={loading}
          />
          <div className="flex gap-2">
            <Input
              type="number"
              min={320}
              max={1024}
              value={width}
              onChange={e => setWidth(Number(e.target.value) || 640)}
              placeholder="Width"
              className="w-1/2"
              disabled={loading}
            />
            <Input
              type="number"
              min={180}
              max={720}
              value={height}
              onChange={e => setHeight(Number(e.target.value) || 480)}
              placeholder="Height"
              className="w-1/2"
              disabled={loading}
            />
          </div>
          {error && <p className="text-xs text-destructive">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading || !url}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Embed Video
          </Button>
        </form>
      </div>
    </NodeViewWrapper>
  );
} 