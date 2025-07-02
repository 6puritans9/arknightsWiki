import { forwardRef, PropsWithChildren } from "react";
import { Accordion } from "radix-ui";
import { css } from "../../../styled-system/css";
import { ChevronDownIcon } from "@radix-ui/react-icons";

// Root container
export const accordionRootStyle = css({
    borderRadius: "6px",
    width: "80vw",
    backgroundColor: "yellow.300",
});

// Accordion item
export const accordionItemStyle = css({
    textAlign: "center",
    overflow: "hidden",
    padding: "1rem 0 1rem 0",
    "&:first-child": {
        marginTop: 0,
        borderTopLeftRadius: "4px",
        borderTopRightRadius: "4px",
    },
    "&:last-child": {
        borderBottomLeftRadius: "4px",
        borderBottomRightRadius: "4px",
    },
    "&:focus-within": {
        position: "relative",
        zIndex: 1,
        boxShadow: "0 0 0 2px var(--mauve-12)",
    },
});

// Accordion header
export const accordionHeaderStyle = css({
    display: "flex",
});

// Accordion trigger
export const accordionTriggerStyle = css({
    fontFamily: "inherit",
    backgroundColor: "transparent",
    padding: "0 20px",
    height: "45px",
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "15px",
    lineHeight: 1,
    color: "violet.11",
    boxShadow: "0 1px 0 var(--mauve-6)",
    background: "white",
    "&:hover": {
        backgroundColor: "mauve.2",
    },
    // Chevron rotation handled by data-state in JSX
});

// Accordion content
export const accordionContentStyle = css({
    overflow: "hidden",
    fontSize: "15px",
    color: "mauve.11",
    backgroundColor: "red.200",
    // Animation handled by data-state in JSX
});

// Accordion content text
export const accordionContentTextStyle = css({
    padding: "15px 20px",
});

// Accordion chevron
export const accordionChevronStyle = css({
    ".AccordionTrigger[data-state='open'] > &": {
        transform: "rotate(180deg)",
    },

    color: "violet.10",
    transition: "transform 300ms cubic-bezier(0.87, 0, 0.13, 1)",
});

export type AccordionTriggerProps = PropsWithChildren<{
    className?: string;
}>;
export type AccordionContentProps = PropsWithChildren<{
    className?: string;
}>;

export const AccordionTrigger = forwardRef<
    HTMLButtonElement,
    AccordionTriggerProps
>(({ children, className = "", ...props }, forwardedRef) => (
    <Accordion.Header className={accordionHeaderStyle}>
        <Accordion.Trigger
            className={`AccordionTrigger ${className || accordionTriggerStyle}`}
            {...props}
            ref={forwardedRef}
        >
            {children}
            <ChevronDownIcon className={accordionChevronStyle} aria-hidden />
        </Accordion.Trigger>
    </Accordion.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

export const AccordionContent = forwardRef<
    HTMLDivElement,
    AccordionContentProps
>(({ children, className = "", ...props }, forwardedRef) => (
    <Accordion.Content className={className} {...props} ref={forwardedRef}>
        <div className="AccordionContentText">{children}</div>
    </Accordion.Content>
));
AccordionContent.displayName = "AccordionContent";
