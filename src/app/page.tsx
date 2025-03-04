import Image from "next/image";

export default function Home() {
    return (
        <div className="home__container">
            <div className="home__content">
                <p className="home__content__text">Welcome to ArknightsWiki</p>
                {/* 이미지 - 코코넛콘 */}
                {/* <Image
                    src="/kal'tsit.gif"
                    alt="kalt'sit"
                    width={50}
                    height={50}
                    unoptimized={true}
                /> */}
            </div>

            <article className="home__banners">
                <p className="home__banners__notice">Ongoing Events</p>
                <Image
                    className="home__banners__image"
                    src="/banners/EN_Come_Catastrophes_or_Wakes_of_Vultures_Rerun_banner.webp"
                    alt="ongoing"
                    layout="responsive"
                    width={100}
                    height={100}
                />
                <p className="home__banners__notice">Upcoming Events</p>
                <Image
                    className="home__banners__image"
                    src="/banners/CN_Delicious_on_Terra_banner.webp"
                    alt="upcoming"
                    layout="responsive"
                    width={100}
                    height={100}
                />
            </article>
        </div>
    );
}
