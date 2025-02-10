import React from "react";
import Link from "next/link";

const Title: React.FC = () => {
    return (
        <section className="title-section">
            <Link href="/" className="title-section__link">
                <h1 className="title-section__title">명일방주</h1>
            </Link>
        </section>
    );
};

export default Title;
