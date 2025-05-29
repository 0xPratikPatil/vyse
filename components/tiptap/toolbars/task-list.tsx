"use client"

import { CheckSquare } from "lucide-react"
import React from "react"

import { Button, type ButtonProps } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { useToolbar } from "./toolbar-provider"

const TaskListToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { editor } = useToolbar()

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn("h-8 w-8 p-0 sm:h-9 sm:w-9", editor?.isActive("taskList") && "bg-accent", className)}
              onClick={(e) => {
                editor?.chain().focus().toggleTaskList().run()
                onClick?.(e)
              }}
              disabled={!editor?.can().chain().focus().toggleTaskList().run()}
              ref={ref}
              {...props}
            >
              {children ?? <CheckSquare className="h-4 w-4" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Task list</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  },
)

TaskListToolbar.displayName = "TaskListToolbar"

export { TaskListToolbar }
