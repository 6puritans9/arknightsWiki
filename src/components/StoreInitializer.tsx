"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";

const StoreInitializer = () => {
    const initializeAuth = useAuthStore((state) => state.initializeAuth);

    useEffect(() => {
        const unsubscribe = initializeAuth();

        return () => {
            unsubscribe();
        };
    }, [initializeAuth]);

    return null;
};

export default StoreInitializer;
