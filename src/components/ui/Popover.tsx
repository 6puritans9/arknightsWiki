"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { css } from "../../../styled-system/css";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
    React.ElementRef<typeof PopoverPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ align = "center", sideOffset = 4, ...props }, ref) => (
    <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
            ref={ref}
            align={align}
            sideOffset={sideOffset}
            className={css({
                zIndex: 50,
                width: "max-content",
                maxWidth: "calc(100vw - 1rem)",
                overflow: "auto",
                maxHeight: "calc(100vh - 2rem)",
                padding: "1rem",
                borderRadius: "md",
                backgroundColor: "white",
                color: "gray.900",
                boxShadow: "lg",
            })}
            {...props}
        />
    </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };
