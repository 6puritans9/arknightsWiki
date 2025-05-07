import Image from "next/image";
import { getHomeBanners } from "@/lib/apiAws";
import { css } from "../../styled-system/css";

const contentWrapper = css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
    maxWidth: "100vw",
    gap: "2rem",
});

const welcomeText = css({
    fontSize: { base: "xl", md: "2xl" },
    fontWeight: "bold",
    textAlign: "center",
});

const bannerContainer = css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "2rem",
});

const bannerSection = css({
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: "lg",
    padding: "1rem 1.5rem 1.5rem 1.5rem",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
});

const bannerTitle = css({
    fontSize: "xl",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "1rem",
});

const bannerImageWrapper = css({
    position: "relative",
    width: "100%",
    overflow: "hidden",
    borderRadius: "lg",
});

const banners = [
    "banners/EN_Come_Catastrophes_or_Wakes_of_Vultures_Rerun_banner.webp",
    "banners/CN_Delicious_on_Terra_banner.webp",
];

export default function Home() {
    const { ongoing, upcoming } = getHomeBanners(banners);

    return (
        <div className={contentWrapper}>
            <h1 className={welcomeText}>Welcome to ArknightsWiki</h1>

            <article className={bannerContainer}>
                <section className={bannerSection}>
                    <h2 className={bannerTitle}>Ongoing Events</h2>
                    <Image
                        className={bannerImageWrapper}
                        src={`${ongoing}`}
                        alt="ongoing"
                        layout="responsive"
                        width={900}
                        height={300}
                        unoptimized
                    />
                </section>
                <section className={bannerSection}>
                    <h2 className={bannerTitle}>Upcoming Events</h2>
                    <Image
                        className={bannerImageWrapper}
                        src={`${upcoming}`}
                        alt="upcoming"
                        layout="responsive"
                        width={900}
                        height={300}
                        unoptimized
                    />
                </section>
            </article>
        </div>
    );
}
