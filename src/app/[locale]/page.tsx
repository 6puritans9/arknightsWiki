import Image from "next/image";
import { getHomeBanners } from "@/api/apiAws";
import { appPageText } from "@/lib/dictionary";
import { css } from "$/styled-system/css";
import { grid } from "$/styled-system/patterns";
import AppClientPage from "./clientPage";

//#region Styles
const container = grid({
    gridTemplateColumns: {
        base: "1fr",
        md: "repeat(22, 1fr)",
    },
    width: "100%",
    height: "100%",
    marginTop: "2rem",
    gap: "2rem",
});

const textWrapper = css({
    gridColumn: {
        md: "1/ 8",
    },
    height: "fit-content",
    position: "sticky",
    top: "4rem",
    zIndex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(5px)",
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

const App = async ({ params }: { params: Promise<{ locale: string }> }) => {
    const { ongoingUrl, upcomingUrl } = getHomeBanners();
    const { locale } = await params;

    return (
        <>
            <article className={container}>
                <div className={textWrapper}>
                    <h2 className={bannerTitle}>
                        {appPageText.ongoing[locale].toUpperCase()}
                    </h2>
                    <p className={bannerText}>
                        The Rides to Lake Silberneherze Rerun
                    </p>
                </div>
                <div className={imageWrapper}>
                    <Image
                        className={imageStyles}
                        src={`${ongoingUrl}`}
                        alt="Ongoing Events"
                        fill={true}
                    />
                </div>
            </article>

            <article className={container}>
                <section className={textWrapper}>
                    <h2 className={bannerTitle}>
                        {appPageText.upcoming[locale].toUpperCase()}
                    </h2>
                    <p className={bannerText}>Delicious On Terra</p>
                </section>
                <div className={imageWrapper}>
                    <Image
                        className={imageStyles}
                        src={`${upcomingUrl}`}
                        alt="Upcoming Events"
                        fill={true}
                    />
                </div>
            </article>

            <div aria-hidden="true">
                <AppClientPage />
            </div>
        </>
    );
};

export default App;
