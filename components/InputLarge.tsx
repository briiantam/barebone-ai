import * as React from "react";
import { cn } from "@/lib/utils";

const InputLarge = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <div>
      <div className="mt-2">
        <textarea
          ref={ref}
          className={cn(
            "block w-full rounded-md border border-input bg-background py-1.5 text-muted-foreground shadow-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:text-sm sm:leading-6 px-3",
            className
          )}
          {...props}
        />
      </div>
    </div>
  );
});
InputLarge.displayName = "InputLarge";

export { InputLarge };
