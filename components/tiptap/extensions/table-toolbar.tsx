"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { TableIcon, Trash2, ArrowDown, ArrowUp, ArrowLeft, ArrowRight, Merge, Split, Grid3x3, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToolbar } from "../toolbars/toolbar-provider"
import { Separator } from "@/components/ui/separator"
import { useMediaQuery } from "@/hooks/use-media-querry"
import { MobileToolbarGroup, MobileToolbarItem } from "../toolbars/mobile-toolbar-group"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export const TableToolbar = () => {
  const { editor } = useToolbar()
  const isMobile = useMediaQuery("(max-width: 640px)")
  const isSmallScreen = useMediaQuery("(max-width: 480px)")
  const [isOpen, setIsOpen] = useState(false)
  const [rows, setRows] = useState(3)
  const [cols, setCols] = useState(3)
  const [withHeaderRow, setWithHeaderRow] = useState(true)

  const isTableActive = editor?.isActive("table")
  const isDisabled = !editor?.can().chain().focus().insertTable({ rows: 3, cols: 3 }).run()

  const handleInsertTable = () => {
    editor?.chain().focus().insertTable({ rows, cols, withHeaderRow }).run()
    setIsOpen(false)
  }

  if (isMobile) {
    return (
      <MobileToolbarGroup label="Table">
        {!isTableActive ? (
          <div className="p-3 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="rows">Rows</Label>
              <Input
                id="rows"
                type="number"
                min="1"
                max="10"
                value={rows}
                onChange={(e) => setRows(Number.parseInt(e.target.value) || 1)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cols">Columns</Label>
              <Input
                id="cols"
                type="number"
                min="1"
                max="10"
                value={cols}
                onChange={(e) => setCols(Number.parseInt(e.target.value) || 1)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="header-row" 
                checked={withHeaderRow} 
                onCheckedChange={(checked) => setWithHeaderRow(checked === true)} 
              />
              <Label htmlFor="header-row" className="text-sm">Include header row</Label>
            </div>
            <Button onClick={handleInsertTable} className="w-full">
              Insert Table
            </Button>
          </div>
        ) : (
          <div className="p-2 space-y-3">
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-muted-foreground px-2">Columns</h4>
              <div className="grid grid-cols-3 gap-2">
                <MobileToolbarItem onClick={() => editor?.chain().focus().addColumnBefore().run()}>
                  <ArrowLeft className="h-4 w-4" /> <span className="text-xs">Add Before</span>
                </MobileToolbarItem>
                <MobileToolbarItem onClick={() => editor?.chain().focus().addColumnAfter().run()}>
                  <ArrowRight className="h-4 w-4" /> <span className="text-xs">Add After</span>
                </MobileToolbarItem>
                <MobileToolbarItem onClick={() => editor?.chain().focus().deleteColumn().run()}>
                  <Trash2 className="h-4 w-4" /> <span className="text-xs">Delete</span>
                </MobileToolbarItem>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-muted-foreground px-2">Rows</h4>
              <div className="grid grid-cols-3 gap-2">
                <MobileToolbarItem onClick={() => editor?.chain().focus().addRowBefore().run()}>
                  <ArrowUp className="h-4 w-4" /> <span className="text-xs">Add Before</span>
                </MobileToolbarItem>
                <MobileToolbarItem onClick={() => editor?.chain().focus().addRowAfter().run()}>
                  <ArrowDown className="h-4 w-4" /> <span className="text-xs">Add After</span>
                </MobileToolbarItem>
                <MobileToolbarItem onClick={() => editor?.chain().focus().deleteRow().run()}>
                  <Trash2 className="h-4 w-4" /> <span className="text-xs">Delete</span>
                </MobileToolbarItem>
              </div>
            </div>
            
            <Separator className="my-2" />
            
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-muted-foreground px-2">Cells</h4>
              <div className="grid grid-cols-2 gap-2">
                <MobileToolbarItem onClick={() => editor?.chain().focus().mergeCells().run()}>
                  <Merge className="h-4 w-4" /> <span className="text-xs">Merge</span>
                </MobileToolbarItem>
                <MobileToolbarItem onClick={() => editor?.chain().focus().splitCell().run()}>
                  <Split className="h-4 w-4" /> <span className="text-xs">Split</span>
                </MobileToolbarItem>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-muted-foreground px-2">Headers</h4>
              <div className="grid grid-cols-2 gap-2">
                <MobileToolbarItem onClick={() => editor?.chain().focus().toggleHeaderRow().run()}>
                  <Grid3x3 className="h-4 w-4" /> <span className="text-xs">Header Row</span>
                </MobileToolbarItem>
                <MobileToolbarItem onClick={() => editor?.chain().focus().toggleHeaderColumn().run()}>
                  <Grid3x3 className="h-4 w-4" /> <span className="text-xs">Header Col</span>
                </MobileToolbarItem>
              </div>
            </div>
            
            <Separator className="my-2" />
            
            <Button
              variant="destructive"
              size="sm"
              className="w-full mt-2"
              onClick={() => editor?.chain().focus().deleteTable().run()}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Delete Table
            </Button>
          </div>
        )}
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
                className={cn("h-8 w-max gap-1 px-3 font-normal", isTableActive && "bg-accent")}
                disabled={isTableActive ? false : isDisabled}
              >
                <TableIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Table</span>
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>Table</TooltipContent>
        </Tooltip>

        <PopoverContent 
          className={cn("w-auto", isSmallScreen ? "max-w-[280px]" : "min-w-[280px]")} 
          align="start"
          sideOffset={5}
        >
          {!isTableActive ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Insert Table</h3>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rows">Rows</Label>
                  <Input
                    id="rows"
                    type="number"
                    min="1"
                    max="10"
                    value={rows}
                    onChange={(e) => setRows(Number.parseInt(e.target.value) || 1)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cols">Columns</Label>
                  <Input
                    id="cols"
                    type="number"
                    min="1"
                    max="10"
                    value={cols}
                    onChange={(e) => setCols(Number.parseInt(e.target.value) || 1)}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="header-row" 
                  checked={withHeaderRow} 
                  onCheckedChange={(checked) => setWithHeaderRow(checked === true)} 
                />
                <Label htmlFor="header-row" className="text-sm">Include header row</Label>
              </div>
              <Button onClick={handleInsertTable} className="w-full">
                Insert Table
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Table Options</h3>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-medium text-muted-foreground">Columns</h4>
                <div className={cn("grid gap-2", isSmallScreen ? "grid-cols-3" : "grid-cols-3")}>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center justify-center gap-1 h-8"
                    onClick={() => editor?.chain().focus().addColumnBefore().run()}
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    {!isSmallScreen && <span>Add Before</span>}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center justify-center gap-1 h-8"
                    onClick={() => editor?.chain().focus().addColumnAfter().run()}
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                    {!isSmallScreen && <span>Add After</span>}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center justify-center gap-1 h-8"
                    onClick={() => editor?.chain().focus().deleteColumn().run()}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    {!isSmallScreen && <span>Delete</span>}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-medium text-muted-foreground">Rows</h4>
                <div className={cn("grid gap-2", isSmallScreen ? "grid-cols-3" : "grid-cols-3")}>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center justify-center gap-1 h-8"
                    onClick={() => editor?.chain().focus().addRowBefore().run()}
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                    {!isSmallScreen && <span>Add Before</span>}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center justify-center gap-1 h-8"
                    onClick={() => editor?.chain().focus().addRowAfter().run()}
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                    {!isSmallScreen && <span>Add After</span>}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center justify-center gap-1 h-8"
                    onClick={() => editor?.chain().focus().deleteRow().run()}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    {!isSmallScreen && <span>Delete</span>}
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="text-xs font-medium text-muted-foreground">Cells</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center justify-center gap-1 h-8"
                    onClick={() => editor?.chain().focus().mergeCells().run()}
                  >
                    <Merge className="h-3.5 w-3.5" />
                    <span className={cn(isSmallScreen && "sr-only")}>Merge</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center justify-center gap-1 h-8"
                    onClick={() => editor?.chain().focus().splitCell().run()}
                  >
                    <Split className="h-3.5 w-3.5" />
                    <span className={cn(isSmallScreen && "sr-only")}>Split</span>
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-medium text-muted-foreground">Headers</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center justify-center gap-1 h-8"
                    onClick={() => editor?.chain().focus().toggleHeaderRow().run()}
                  >
                    <Grid3x3 className="h-3.5 w-3.5 mr-1" />
                    <span className={cn(isSmallScreen && "text-xs", "truncate")}>Header Row</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center justify-center gap-1 h-8"
                    onClick={() => editor?.chain().focus().toggleHeaderColumn().run()}
                  >
                    <Grid3x3 className="h-3.5 w-3.5 mr-1" />
                    <span className={cn(isSmallScreen && "text-xs", "truncate")}>Header Col</span>
                  </Button>
                </div>
              </div>

              <Separator />

              <Button
                variant="destructive"
                className="w-full"
                onClick={() => editor?.chain().focus().deleteTable().run()}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete Table
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  )
}
