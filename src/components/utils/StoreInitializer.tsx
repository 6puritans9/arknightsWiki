"use client";

import { useEffect, useRef } from "react";
import useAuthStore from "@/stores/authStore";

const StoreInitializer = () => {
    const initializeAuth = useAuthStore((state) => state.initializeAuth);
    const cleanupRef = useRef<(() => void) | null>(null);

    useEffect(() => {
        let isMounted = true;
        (async () => {
            const unsubscribe = await initializeAuth();
            if (isMounted) {
                cleanupRef.current = unsubscribe;
            }
        })();

        return () => {
            isMounted = false;
            if (cleanupRef.current) {
                cleanupRef.current();
            }
        };
    }, [initializeAuth]);

    return null;
};

export default StoreInitializer;
