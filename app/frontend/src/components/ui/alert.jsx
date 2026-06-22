import * as React from "react";
import { cn } from "@/lib/utils";

const Alert = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} role="alert" className={cn("relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground", className)} {...props} />
));
Alert.displayName = "Alert";

export { Alert };
