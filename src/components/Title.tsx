import React from "react";
import Link from "next/link";
import Image from "next/image";

const Title: React.FC = () => {
    return (
        <section className="title-section">
            <Link href="/" className="title-section__link">
                <h1 className="title-section__title">명일방주</h1>
                <Image
                    src="/kal'tsit.gif"
                    alt="title_image"
                    width={50}
                    height={50}
                    className="title-section__image"
                />
                {/* 이미지 - 코코넛콘 */}
            </Link>
        </section>
    );
};

export default Title;
