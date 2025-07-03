import { forwardRef, PropsWithChildren } from "react";
import { Accordion } from "radix-ui";
import { css } from "../../../styled-system/css";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { flex } from "../../../styled-system/patterns";

//#region Styles
export const accordionRootStyle = css({
    backgroundColor: "gray.100",
    width: "100%",
});

export const accordionHeaderStyle = flex({
    // Keep this flexbox
});

// Item Container
export const accordionItemStyle = css({
    padding: "0 1rem",
    border: "1px solid grey",
    borderTop: "0",
    "&:first-child": {
        marginTop: 0,
        borderTop: "1px solid grey",
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

// Menu text
export const accordionTriggerStyle = flex({
    fontSize: {
        base: "fBase",
        md: "fSm",
        lg: "fMd",
        xl: "fLg",
    },
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    // padding: "0 1rem",
    height: "3rem",
    backgroundColor: "transparent",
    lineHeight: 1,
    fontFamily: "inherit",
    cursor: "pointer",
});

// Content text
export const accordionContentStyle = css({
    fontSize: {
        base: "fBase",
        lg: "fSm",
        xl: "fMd",
    },
    // padding: "0 1rem",
    overflow: "hidden",
    color: "black",
});
const AccordionContentText = css({
    margin: "1rem 0",
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
        <div className={AccordionContentText}>{children}</div>
    </Accordion.Content>
));
AccordionContent.displayName = "AccordionContent";
