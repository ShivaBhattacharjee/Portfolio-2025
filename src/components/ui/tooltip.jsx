"use client"

import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import * as React from "react"
import { cn } from "@/lib/utils"

function TooltipProvider({
  delayDuration = 0,
  ...props
}) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}



function Tooltip({
  ...props
}) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />
}

function TooltipTrigger({
  ...props
}) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  sideOffset = 4,
  ...props
}) {
  return (
    <TooltipPrimitive.Content
      data-slot="tooltip-content"
      sideOffset={sideOffset}
      className={cn(
        "z-[999] overflow-hidden rounded-md border border-border bg-background/95 backdrop-blur-sm px-3 py-1.5 text-sm font-medium text-foreground shadow-lg animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }