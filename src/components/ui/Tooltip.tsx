"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { css } from "../../../styled-system/css";

const TooltipProvider = ({
    delayDuration = 700,
    ...props
}: TooltipPrimitive.TooltipProviderProps) => (
    <TooltipPrimitive.Provider delayDuration={delayDuration} {...props} />
);
const Tooltip = ({
    delayDuration = 700,
    ...props
}: TooltipPrimitive.TooltipProps) => (
    <TooltipPrimitive.Root delayDuration={delayDuration} {...props} />
);
const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
    React.ComponentRef<typeof TooltipPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ sideOffset = 4, ...props }, ref) => (
    <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={css({
            zIndex: 50,
            overflow: "hidden",
            maxWidth: "350px",
            backgroundColor: "transparent",
            padding: "0.5rem 0.75rem",
            borderRadius: "md",
            fontSize: "sm",
            lineHeight: "normal",
            color: "white",
            boxShadow: "md",
        })}
        {...props}
    ></TooltipPrimitive.Content>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
