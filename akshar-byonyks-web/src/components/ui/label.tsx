"use client"

import * as React from "react"
// Narrow import rather than the `radix-ui` barrel: the barrel does
// `import * as Label from "@radix-ui/react-label"` and re-exports it, so this is the
// identical module, but importing it via the barrel pulls every Radix
// primitive into the shared chunk. Version pinned to the one `radix-ui`
// depends on so npm dedupes to a single copy.
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
