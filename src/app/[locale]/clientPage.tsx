"use client";

import { usePathname } from "next/navigation";
import useNavStore from "@/stores/navStore";
import { useEffect } from "react";

const AppClientPage = () => {
    const pathname = usePathname();
    const setPrvPathname = useNavStore((s) => s.setPrvPathname);

    useEffect(() => {
        setPrvPathname(pathname);
    }, [pathname, setPrvPathname]);

    return <></>;
};

export default AppClientPage;
