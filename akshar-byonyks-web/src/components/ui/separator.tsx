"use client"

import * as React from "react"
// Narrow import rather than the `radix-ui` barrel: the barrel does
// `import * as Separator from "@radix-ui/react-separator"` and re-exports it, so this is the
// identical module, but importing it via the barrel pulls every Radix
// primitive into the shared chunk. Version pinned to the one `radix-ui`
// depends on so npm dedupes to a single copy.
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
