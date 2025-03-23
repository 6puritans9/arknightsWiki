import Image from "next/image";
import { getHomeBanners } from "@/lib/apiAws";

const banners = [
    "banners/EN_Come_Catastrophes_or_Wakes_of_Vultures_Rerun_banner.webp",
    "banners/CN_Delicious_on_Terra_banner.webp",
];

export default function Home() {
    const { ongoing, upcoming } = getHomeBanners(banners);

    return (
        <div className="home__container">
            <div className="home__content">
                <p className="home__content__text">Welcome to ArknightsWiki</p>
            </div>

            <article className="home__banners">
                <p className="home__banners__notice">Ongoing Events</p>
                <Image
                    className="home__banners__image"
                    src={`${ongoing}`}
                    alt="ongoing"
                    layout="responsive"
                    width={100}
                    height={100}
                    unoptimized
                />
                <p className="home__banners__notice">Upcoming Events</p>
                <Image
                    className="home__banners__image"
                    src={`${upcoming}`}
                    alt="upcoming"
                    layout="responsive"
                    width={100}
                    height={100}
                    unoptimized
                />
            </article>
        </div>
    );
}
