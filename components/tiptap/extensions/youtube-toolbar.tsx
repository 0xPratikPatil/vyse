"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Youtube, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToolbar } from "../toolbars/toolbar-provider"
import { useMediaQuery } from "@/hooks/use-media-querry"
import { MobileToolbarGroup } from "../toolbars/mobile-toolbar-group"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Utility function to extract YouTube video ID from various URL formats
const getYoutubeVideoId = (url: string): string | null => {
  if (!url) return null
  
  // Match patterns like youtube.com/watch?v=VIDEO_ID or youtu.be/VIDEO_ID
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  
  return (match && match[2].length === 11) ? match[2] : null
}

// Format YouTube URL properly for embedding
const formatYoutubeUrl = (url: string): string | null => {
  const videoId = getYoutubeVideoId(url)
  if (!videoId) return null
  
  return `https://www.youtube.com/embed/${videoId}`
}

export const YoutubeToolbar = () => {
  const { editor } = useToolbar()
  const isMobile = useMediaQuery("(max-width: 640px)")
  const isSmallScreen = useMediaQuery("(max-width: 480px)")
  const [isOpen, setIsOpen] = useState(false)
  const [url, setUrl] = useState("")
  const [width, setWidth] = useState(640)
  const [height, setHeight] = useState(480)
  const [error, setError] = useState<string | null>(null)

  const isDisabled = !editor?.can().chain().focus().setYoutubeVideo({ src: "" }).run()

  const handleInsertVideo = () => {
    setError(null)
    const formattedUrl = formatYoutubeUrl(url)
    
    if (!formattedUrl) {
      setError("Invalid YouTube URL. Please enter a valid YouTube URL.")
      return
    }
    
    editor?.commands.setYoutubeVideo({
      src: formattedUrl,
      width: Math.max(320, width) || 640,
      height: Math.max(180, height) || 480,
    })
    
    setUrl("")
    setIsOpen(false)
  }

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
                setUrl(e.target.value)
                setError(null)
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
                onChange={(e) => setWidth(Number.parseInt(e.target.value) || 640)}
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
                onChange={(e) => setHeight(Number.parseInt(e.target.value) || 480)}
              />
            </div>
          </div>
          <Button onClick={handleInsertVideo} className="w-full" disabled={!url}>
            Insert YouTube Video
          </Button>
        </div>
      </MobileToolbarGroup>
    )
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
                <Youtube className="h-4 w-4" />
                <span className="hidden sm:inline">YouTube</span>
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>YouTube Video</TooltipContent>
        </Tooltip>

        <PopoverContent 
          className={cn("w-auto", isSmallScreen ? "max-w-[280px]" : "min-w-[320px]")} 
          align="start"
          sideOffset={5}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Insert YouTube Video</h3>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsOpen(false)}>
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
                  setUrl(e.target.value)
                  setError(null)
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
                  onChange={(e) => setWidth(Number.parseInt(e.target.value) || 640)}
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
                  onChange={(e) => setHeight(Number.parseInt(e.target.value) || 480)}
                />
              </div>
            </div>

            <Button onClick={handleInsertVideo} className="w-full" disabled={!url}>
              Insert YouTube Video
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  )
}
