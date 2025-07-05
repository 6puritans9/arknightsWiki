"use client";

import { useTouch } from "../utils/TouchProvider";
import { Tooltip, TooltipTrigger, TooltipContent } from "./Tooltip";
import { Popover, PopoverTrigger, PopoverContent } from "./Popover";
import {
    TooltipContentProps,
    TooltipProps,
    TooltipProvider,
    TooltipTriggerProps,
} from "@radix-ui/react-tooltip";
import {
    PopoverContentProps,
    PopoverProps,
    PopoverTriggerProps,
} from "@radix-ui/react-popover";

interface HybridTooltipProps extends TooltipProps, PopoverProps {}

export const HybridTooltip = ({
    delayDuration,
    ...props
}: HybridTooltipProps) => {
    const isTouch = useTouch();
    if (isTouch) {
        return <Popover {...props} />;
    }

    return (
        <TooltipProvider delayDuration={delayDuration}>
            <Tooltip delayDuration={delayDuration} {...props} />
        </TooltipProvider>
    );
};

export const HybridTooltipTrigger = (
    props: TooltipTriggerProps & PopoverTriggerProps
) => {
    const isTouch = useTouch();
    return isTouch ? (
        <PopoverTrigger {...props} />
    ) : (
        <TooltipTrigger {...props} />
    );
};

export const HybridTooltipContent = (
    props: TooltipContentProps & PopoverContentProps
) => {
    const isTouch = useTouch();
    return isTouch ? (
        <PopoverContent {...props} />
    ) : (
        <TooltipContent {...props} />
    );
};
