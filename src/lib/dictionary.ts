import { RoomType } from "../api/apiMongo";

type Locales = "en" | "ko" | "ja" | "cn" | "tw";

export const greetMsg: { [key in Locales]: string } = {
    en: "Hello, doctor ${name}",
    ko: "안녕하세요 ${name} 박사님",
    cn: "",
    ja: "",
    tw: "",
};

export const appPageText = {
    event: {
        ongoing: {
            en: "Ongoing",
            ko: "진행중",
            ja: "開催中",
            cn: "进行中",
            tw: "進行中",
        },
        upcoming: {
            en: "Upcoming",
            ko: "예정",
            ja: "予定",
            cn: "即将到来",
            tw: "即將到來",
        },
    },
};

export const footerLogoText = {
    en: "RHODES ISLAND",
    ko: "로도스 아일랜드",
    ja: "ロドスアイランド",
    cn: "罗德岛",
    tw: "羅德島",
};

export const notFoundText = {
    en: "Page Not Found",
    ko: "페이지를 찾을 수 없습니다",
};

export const roomNameMap: { [key in RoomType]: { [key in Locales]: string } } =
    {
        CONTROL: {
            en: "Control Center",
            ko: "제어 센터",
            cn: "",
            ja: "",
            tw: "",
        },
        DORMITORY: { en: "Dormitory", ko: "숙소", cn: "", ja: "", tw: "" },
        HIRE: { en: "HR Office", ko: "사무실", cn: "", ja: "", tw: "" },
        MANUFACTURE: { en: "Factory", ko: "제조소", cn: "", ja: "", tw: "" },
        MEETING: {
            en: "Reception Room",
            ko: "응접실",
            cn: "",
            ja: "",
            tw: "",
        },
        POWER: { en: "Power Plant", ko: "발전소", cn: "", ja: "", tw: "" },
        TRADING: {
            en: "Trading Post",
            ko: "무역소",
            cn: "",
            ja: "",
            tw: "",
        },
        TRAINING: {
            en: "raining Room",
            ko: "훈련실",
            cn: "",
            ja: "",
            tw: "",
        },
        WORKSHOP: { en: "Workshop", ko: "가공소", cn: "", ja: "", tw: "" },
        PRIVATE: {
            en: "Activity Room",
            ko: "",
            cn: "",
            ja: "",
            tw: "",
        },
    };
