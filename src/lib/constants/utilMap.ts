const LANGUAGE_DB_MAP: { [key: string]: string } = {
    "en-US": "data_en",
    "ko-KR": "data_kr",
    "ja-JP": "data_jp",
    "zh-CN": "data_cn",
    "zh-TW": "data_tw",
};
const rarityMap: { [key: string]: number } = {
    TIER_1: 1,
    TIER_2: 2,
    TIER_3: 3,
    TIER_4: 4,
    TIER_5: 5,
    TIER_6: 6,
};

export { LANGUAGE_DB_MAP, rarityMap };
