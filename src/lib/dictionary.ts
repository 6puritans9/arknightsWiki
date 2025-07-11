import { RoomType } from "../api/apiMongo";

export const greetMsg: { [key: string]: string } = {
    "en-US": "Hello, doctor ${name}",
    "ko-KR": "안녕하세요 ${name} 박사님",
    "ja-JP": "こんにちは、${name}ドクター",
    "zh-CN": "你好，${name} 博士",
    "zh-TW": "你好，${name} 博士",
};

export const appPageText: { [key: string]: { [key: string]: string } } = {
    ongoing: {
        "en-US": "Ongoing",
        "ko-KR": "진행중",
        "ja-JP": "開催中",
        "zh-CN": "进行中",
        "zh-TW": "進行中",
    },
    upcoming: {
        "en-US": "Upcoming",
        "ko-KR": "예정",
        "ja-JP": "予定",
        "zh-CN": "即将到来",
        "zh-TW": "即將到來",
    },
};

export const LogoutText: { [key: string]: string } = {
    "en-US": "Logout",
    "ko-KR": "로그아웃",
    "ja-JP": "ログアウト",
    "zh-CN": "登出",
    "zh-TW": "登出",
};

export const footerLogoText: { [key: string]: string } = {
    "en-US": "RHODES ISLAND",
    "ko-KR": "로도스 아일랜드",
    "ja-JP": "ロドスアイランド",
    "zh-CN": "罗德岛",
    "zh-TW": "羅德島",
};

export const notFoundText: { [key: string]: string } = {
    "en-US": "Page Not Found",
    "ko-KR": "페이지를 찾을 수 없습니다",
    "ja-JP": "ページが見つかりません",
    "zh-CN": "页面未找到",
    "zh-TW": "頁面未找到",
};

export const roomNameMap: { [key in RoomType]: { [key: string]: string } } = {
    CONTROL: {
        "en-US": "Control Center",
        "ko-KR": "제어 센터",
        "zh-CN": "",
        "ja-JP": "",
        "zh-TW": "",
    },
    DORMITORY: {
        "en-US": "Dormitory",
        "ko-KR": "숙소",
        "zh-CN": "",
        "ja-JP": "",
        "zh-TW": "",
    },
    HIRE: {
        "en-US": "HR Office",
        "ko-KR": "사무실",
        "zh-CN": "",
        "ja-JP": "",
        "zh-TW": "",
    },
    MANUFACTURE: {
        "en-US": "Factory",
        "ko-KR": "제조소",
        "zh-CN": "",
        "ja-JP": "",
        "zh-TW": "",
    },
    MEETING: {
        "en-US": "Reception Room",
        "ko-KR": "응접실",
        "zh-CN": "",
        "ja-JP": "",
        "zh-TW": "",
    },
    POWER: {
        "en-US": "Power Plant",
        "ko-KR": "발전소",
        "zh-CN": "",
        "ja-JP": "",
        "zh-TW": "",
    },
    TRADING: {
        "en-US": "Trading Post",
        "ko-KR": "무역소",
        "zh-CN": "",
        "ja-JP": "",
        "zh-TW": "",
    },
    TRAINING: {
        "en-US": "raining Room",
        "ko-KR": "훈련실",
        "zh-CN": "",
        "ja-JP": "",
        "zh-TW": "",
    },
    WORKSHOP: {
        "en-US": "Workshop",
        "ko-KR": "가공소",
        "zh-CN": "",
        "ja-JP": "",
        "zh-TW": "",
    },
    PRIVATE: {
        "en-US": "Activity Room",
        "ko-KR": "",
        "zh-CN": "",
        "ja-JP": "",
        "zh-TW": "",
    },
};

export const statsMap: { [key: string]: { [key: string]: string } } = {
    maxHp: {
        "en-US": "HP",
        "zh-CN": "HP",
        "ja-JP": "HP",
        "ko-KR": "HP",
        "zh-TW": "HP",
    },
    atk: {
        "en-US": "ATK",
        "zh-CN": "",
        "ja-JP": "",
        "ko-KR": "공격력",
        "zh-TW": "",
    },
    def: {
        "en-US": "DEF",
        "zh-CN": "",
        "ja-JP": "",
        "ko-KR": "방어력",
        "zh-TW": "",
    },
    magicResistance: {
        "en-US": "RES",
        "zh-CN": "",
        "ja-JP": "",
        "ko-KR": "저항력",
        "zh-TW": "",
    },
    cost: {
        "en-US": "COST",
        "zh-CN": "",
        "ja-JP": "",
        "ko-KR": "코스트",
        "zh-TW": "",
    },
    blockCnt: {
        "en-US": "BLOCK",
        "zh-CN": "",
        "ja-JP": "",
        "ko-KR": "저지",
        "zh-TW": "",
    },
    attackSpeed: {
        "en-US": "ATKSPD",
        "zh-CN": "",
        "ja-JP": "",
        "ko-KR": "공격 속도",
        "zh-TW": "",
    },
    moveSpeed: {
        "en-US": "MOVSPD",
        "zh-CN": "",
        "ja-JP": "",
        "ko-KR": "이동 속도",
        "zh-TW": "",
    },
    respawnTime: {
        "en-US": "RESPAWN",
        "zh-CN": "",
        "ja-JP": "",
        "ko-KR": "재배치",
        "zh-TW": "",
    },

    //extra
    baseAttackTime: {
        "en-US": "Base Attack Time",
        "zh-CN": "",
        "ja-JP": "",
        "ko-KR": "기본 공격 시간",
        "zh-TW": "",
    },
    hpRecoveryPerSec: {
        "en-US": "HP Recovery/Sec",
        "zh-CN": "",
        "ja-JP": "",
        "ko-KR": "초당 HP 회복",
        "zh-TW": "",
    },
    spRecoveryPerSec: {
        "en-US": "SP Recovery/Sec",
        "zh-CN": "",
        "ja-JP": "",
        "ko-KR": "초당 SP 회복",
        "zh-TW": "",
    },
    maxDeployCount: {
        "en-US": "Max Deploy Count",
        "zh-CN": "",
        "ja-JP": "",
        "ko-KR": "최대 배치",
        "zh-TW": "",
    },
    maxDeckStackCnt: {
        "en-US": "Max Stack Count",
        "zh-CN": "",
        "ja-JP": "",
        "ko-KR": "최대 충전",
        "zh-TW": "",
    },
    tauntLevel: {
        "en-US": "Taunt Level",
        "zh-CN": "",
        "ja-JP": "",
        "ko-KR": "어그로 등급",
        "zh-TW": "",
    },
    massLevel: {
        "en-US": "Mass Level",
        "zh-CN": "",
        "ja-JP": "",
        "ko-KR": "무게",
        "zh-TW": "",
    },
};
