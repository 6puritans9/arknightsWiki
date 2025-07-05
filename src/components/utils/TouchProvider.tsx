"use client";

import {
    PropsWithChildren,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

const TouchContext = createContext<boolean>(false);

export const useTouch = () => useContext(TouchContext);

export const TouchProvider = (props: PropsWithChildren) => {
    const [isTouch, setTouch] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const mediaQuery = window.matchMedia("(pointer: coarse)");
            setTouch(mediaQuery.matches);

            const handleChange = (e: MediaQueryListEvent) =>
                setTouch(e.matches);
            mediaQuery.addEventListener("change", handleChange);
            return () => mediaQuery.removeEventListener("change", handleChange);
        }
    }, []);

    return <TouchContext.Provider value={isTouch} {...props} />;
};
