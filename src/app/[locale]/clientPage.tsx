"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import useNavStore from "@/stores/navStore";
import { getPathWithoutLocale } from "@/utils/i18n/locales";

const AppClientPage = () => {
    const pathname = usePathname();
    const pathWithoutLocale = getPathWithoutLocale(pathname);

    const setPrvPathname = useNavStore((s) => s.setPrvPathname);

    useEffect(() => {
        setPrvPathname(pathWithoutLocale);
    }, [pathWithoutLocale, setPrvPathname]);

    return <></>;
};

export default AppClientPage;
