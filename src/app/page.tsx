import Image from "next/image";
import { getHomeBanners } from "@/lib/apiAws";
import { css } from "../../styled-system/css";
import { grid } from "../../styled-system/patterns";
import { appPageText } from "@/lib/dictionary";

//#region Styles
const container = grid({
    gridTemplateColumns: {
        base: "1fr",
        md: "repeat(22, 1fr)",
    },
    width: {
        base: "480px",
        md: "550px",
        lgToXl: "800px",
        xl: "100%",
    },
    maxWidth: "100vw",
    height: "100%",
    marginTop: "2rem",
    gap: "2rem",
});

const textWrapper = css({
    gridColumn: {
        base: "1",
        md: "1 / 11",
    },
    height: "fit-content",
    position: "sticky",
    top: "4rem",
    width: {
        base: "50%",
        xl: "100%",
    },
});

// Text styles
const bannerTitle = css({
    fontSize: {
        base: "1rem",
        xl: "4rem",
    },
    fontWeight: "bold",
});

const bannerText = css({
    fontSize: {
        base: "0.5rem",
        xl: "2rem",
    },
});

const imageWrapper = css({
    gridColumn: {
        base: "1",
        md: "12 / -1",
    },
    aspectRatio: "1 / 1",
    width: "100%",
    height: {
        base: "160px",
        xl: "530px",
    },
    maxHeight: "100%",
    overflow: "hidden",
    position: "relative",
});

const imageStyles = css({
    height: "100%",
    width: "100%",
    objectFit: "cover",
});
//#endregion

const banners = [
    "banners/EN_Come_Catastrophes_or_Wakes_of_Vultures_Rerun_banner.webp",
    "banners/CN_Delicious_on_Terra_banner.webp",
];

export default function App() {
    const { ongoing, upcoming } = getHomeBanners(banners);

    return (
        <>
            <article className={container}>
                <div className={textWrapper}>
                    <h2 className={bannerTitle}>
                        {appPageText.event.ongoing.en.toUpperCase()}
                    </h2>
                    <p className={bannerText}>
                        The Rides to Lake Silberneherze Rerun
                    </p>
                </div>
                <div className={imageWrapper}>
                    <Image
                        className={imageStyles}
                        src={`${ongoing}`}
                        alt="Ongoing Events"
                        fill={true}
                        unoptimized
                    />
                </div>
            </article>

            <article className={container}>
                <section className={textWrapper}>
                    <h2 className={bannerTitle}>
                        {appPageText.event.upcoming.en.toUpperCase()}
                    </h2>
                    <p className={bannerText}>Delicious On Terra</p>
                </section>
                <div className={imageWrapper}>
                    <Image
                        className={imageStyles}
                        src={`${upcoming}`}
                        alt="Upcoming Events"
                        fill={true}
                        unoptimized
                    />
                </div>
            </article>

            <article className={container}>
                <section className={textWrapper}>
                    <h2 className={bannerTitle}>
                        {appPageText.event.upcoming.ko.toUpperCase()}
                    </h2>
                    <p className={bannerText}>테라밥</p>
                </section>
                <div className={imageWrapper}>
                    <Image
                        className={imageStyles}
                        src={`${upcoming}`}
                        alt="Upcoming Events"
                        fill={true}
                        unoptimized
                    />
                </div>
            </article>

            <article className={container}>
                <section className={textWrapper}>
                    <h2 className={bannerTitle}>
                        {appPageText.event.upcoming.ja.toUpperCase()}
                    </h2>
                    <p className={bannerText}>テラ飯</p>
                </section>
                <div className={imageWrapper}>
                    <Image
                        className={imageStyles}
                        src={`${upcoming}`}
                        alt="Upcoming Events"
                        fill={true}
                        unoptimized
                    />
                </div>
            </article>

            <article className={container}>
                <section className={textWrapper}>
                    <h2 className={bannerTitle}>
                        {appPageText.event.upcoming.cn.toUpperCase()}
                    </h2>
                    <p className={bannerText}>泰拉饭</p>
                </section>
                <div className={imageWrapper}>
                    <Image
                        className={imageStyles}
                        src={`${upcoming}`}
                        alt="Upcoming Events"
                        fill={true}
                        unoptimized
                    />
                </div>
            </article>

            <article className={container}>
                <section className={textWrapper}>
                    <h2 className={bannerTitle}>
                        {appPageText.event.upcoming.tw.toUpperCase()}
                    </h2>
                    <p className={bannerText}>泰拉飯</p>
                </section>
                <div className={imageWrapper}>
                    <Image
                        className={imageStyles}
                        src={`${upcoming}`}
                        alt="Upcoming Events"
                        fill={true}
                        unoptimized
                    />
                </div>
            </article>
        </>
    );
}
