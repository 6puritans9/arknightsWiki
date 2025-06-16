"use client";

import { useState, useEffect, useRef } from "react";
import { Toast } from "radix-ui";
import { css, cva } from "../../../styled-system/css";

type NotificationProps = {
    title: string;
    description: string;
    variant?: string;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    autoShow?: boolean;
};

// Styles
// Toast Viewport
const toastViewport = css({
    "--viewport-padding": "25px",
    position: "fixed",
    bottom: "0",
    right: "0",
    display: "flex",
    flexDirection: "column",
    padding: "var(--viewport-padding)",
    gap: "10px",
    width: "390px",
    maxWidth: "100vw",
    margin: "0",
    listStyle: "none",
    zIndex: "2147483647",
    outline: "none",
});

// Toast Root with variants for states
const toastRoot = css({
    backgroundColor: "white",
    borderRadius: "6px",
    boxShadow:
        "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
    padding: "15px",
    display: "grid",
    gridTemplateAreas: '"title action" "description action"',
    gridTemplateColumns: "auto max-content",
    columnGap: "15px",
    alignItems: "center",

    // State animations
    '&[data-state="open"]': {
        animation: "slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)",
    },
    '&[data-state="closed"]': {
        animation: "hide 100ms ease-in",
    },
    '&[data-swipe="move"]': {
        transform: "translateX(var(--radix-toast-swipe-move-x))",
    },
    '&[data-swipe="cancel"]': {
        transform: "translateX(0)",
        transition: "transform 200ms ease-out",
    },
    '&[data-swipe="end"]': {
        animation: "swipeOut 100ms ease-out",
    },
});

// Toast Title
const toastTitle = css({
    gridArea: "title",
    marginBottom: "5px",
    fontWeight: "500",
    color: "var(--slate-12)",
    fontSize: "15px",
});

// Toast Description
const toastDescription = css({
    gridArea: "description",
    margin: "0",
    color: "var(--slate-11)",
    fontSize: "13px",
    lineHeight: "1.3",
});

// Toast Action
const toastAction = css({
    gridArea: "action",
});

// Button with variants using cva (Class Variance Authority)
const button = cva({
    base: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "4px",
        fontWeight: "500",
        userSelect: "none",
    },
    variants: {
        size: {
            small: {
                fontSize: "12px",
                padding: "0 10px",
                lineHeight: "25px",
                height: "25px",
            },
            large: {
                fontSize: "15px",
                padding: "0 15px",
                lineHeight: "35px",
                height: "35px",
            },
        },
        variant: {
            violet: {
                backgroundColor: "white",
                color: "var(--violet-11)",
                boxShadow: "0 2px 10px var(--black-a7)",
                _hover: {
                    backgroundColor: "var(--mauve-3)",
                },
                _focus: {
                    boxShadow: "0 0 0 2px black",
                },
            },
            green: {
                backgroundColor: "var(--green-2)",
                color: "var(--green-11)",
                boxShadow: "inset 0 0 0 1px var(--green-7)",
                _hover: {
                    boxShadow: "inset 0 0 0 1px var(--green-8)",
                },
                _focus: {
                    boxShadow: "0 0 0 2px var(--green-8)",
                },
            },
        },
    },
});

const Notification = ({
    title,
    description,
    variant,
    open: controlledOpen,
    onOpenChange,
    autoShow = false,
}: NotificationProps) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const eventDateRef = useRef(new Date());
    const timerRef = useRef(0);

    const open = controlledOpen ?? internalOpen;
    const setOpen = onOpenChange ?? setInternalOpen;

    useEffect(() => {
        if (autoShow) {
            setOpen(true);
        }

        return () => clearTimeout(timerRef.current);
    }, [autoShow, setOpen]);

    return (
        <Toast.Provider swipeDirection="right">
            <Toast.Root
                className={toastRoot}
                open={open}
                onOpenChange={setOpen}
            >
                <Toast.Title className={toastTitle}>{title}</Toast.Title>
                <Toast.Description asChild>
                    <time
                        className={toastDescription}
                        dateTime={eventDateRef.current.toISOString()}
                    >
                        {description}
                    </time>
                </Toast.Description>
                <Toast.Action
                    className={toastAction}
                    asChild
                    altText="Goto schedule to undo"
                >
                    {variant && (
                        <button
                            className={button({
                                variant: "green",
                                size: "small",
                            })}
                        >
                            {variant}
                        </button>
                    )}
                </Toast.Action>
            </Toast.Root>
            <Toast.Viewport className={toastViewport} />
        </Toast.Provider>
    );
};

export default Notification;
