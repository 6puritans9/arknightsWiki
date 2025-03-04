import React from "react";
import Link from "next/link";

const Title = () => {
    return (
        <Link href="/" className="title__container">
            <h1 className="title__text">Arknights</h1>
        </Link>
    );
};

export default Title;
