import * as React from "react";
import { cn } from "@/lib/utils";

const Image = React.forwardRef(({ className, ...props }, ref) => {
  return <img ref={ref} className={cn("", className)} {...props} />;
});
Image.displayName = "Image";

export { Image };
