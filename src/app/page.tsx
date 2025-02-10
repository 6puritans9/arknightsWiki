import Image from "next/image";

export default function Home() {
    return (
        <>
            <div className="home">
                <p>명일방주 한국어 위키 페이지입니다</p>
                {/* 이미지 - 코코넛콘 */}
                <Image
                    className="home__image--centered"
                    src="/kal'tsit.gif"
                    alt="kalt'sit"
                    width={50}
                    height={50}
                    unoptimized={true}
                />
            </div>
            <div className="home__banner">
                <p className="home__banner__notice">Ongoing Event</p>
                <Image
                    className="home__banner__image"
                    src="/banners/EN_A_Kazdelian_Rescue_banner.webp"
                    alt="banner"
                    layout="responsive"
                    width={100}
                    height={100}
                />
                <p className="home__banner__notice">Upcoming Event</p>
            </div>
        </>
    );
}
