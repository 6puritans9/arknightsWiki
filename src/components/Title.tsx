import React from "react";
import Link from "next/link";
import Image from "next/image";

const Title = () => {
    return (
        <Link href="/" className="title__container">
            <h1 className="title__text">Arknights</h1>
        </Link>
    );
};

export default Title;
