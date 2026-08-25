import * as React from "react"

// §7.3 overrides on the shadcn defaults, applied here rather than at every
// call site. Inputs are 16px minimum and never drop to 14px on desktop: below
// 16px iOS force-zooms a focused field, and PRODUCT.md describes a patient
// audience skewing older with a high rate of diabetes-related visual
// impairment, so the stricter option wins. Control height is raised from the
// shadcn 32px to 44px for the same reason.

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-32 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
