import React from "react";
import { notFoundText } from "@/lib/dictionary";

const NotFound = () => {
    const locale = "en-US";

    return <div>404 - {notFoundText[locale]}</div>;
};

export default NotFound;
