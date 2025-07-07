import { RoomType } from "./apiMongo";

const BASE_URL = process.env.NEXT_PUBLIC_S3_URL;

const getHomeBanners = () => {
    const ongoingUrl =
        BASE_URL +
        "/public/banners/EN_Come_Catastrophes_or_Wakes_of_Vultures_Rerun_banner.webp";
    const upcomingUrl =
        BASE_URL + "/public/banners/CN_Delicious_on_Terra_banner.webp";

    return { ongoingUrl, upcomingUrl };
};

const getThumbnailImg = (id: string) => {
    return BASE_URL + `/public/operators/${id}/icons/${id}.webp`;
};

const getPortraitImg = (id: string) => {
    return BASE_URL + `/public/operators/${id}/portraits/${id}_1.webp`;
};

const getProfessionImage = (
    profession: string,
    isBlack: boolean = true
): string => {
    return (
        BASE_URL +
        `/dynamicassets/arts/profession_large_hub/icon_profession_${profession.toLowerCase()}_large${isBlack ? "" : "_white"}.png`
    );
};

const getsubProfessionIdImage = (id: string): string =>
    BASE_URL +
    `/public/op_misc/subprofessionicon/sub_${id.toLocaleLowerCase()}_icon.png`;

const getFactionImage = (id: string): string =>
    BASE_URL + `/public/op_misc/camplogo/logo_${id.toLocaleLowerCase()}.png`;

const getEliteImage = (phase: string) =>
    BASE_URL + `/dynamicassets/arts/elite_hub/elite_${phase}.png`;

const getRoomImage = (room: RoomType): string => {
    if (room == "CONTROL" || room == "TRAINING" || room == "WORKSHOP") {
        return (
            BASE_URL +
            `/dynamicassets/arts/building/architect/room_icon_sprite_hub/icon_${room.toLowerCase()}.png`
        );
    }

    if (room == "DORMITORY") {
        return (
            BASE_URL +
            `/dynamicassets/arts/building/architect/room_icon_sprite_hub/icon_title_dorm.png`
        );
    }

    if (room == "MANUFACTURE") {
        return (
            BASE_URL +
            `/dynamicassets/arts/building/architect/room_icon_sprite_hub/icon_title_manufact.png`
        );
    }

    return (
        BASE_URL +
        `/dynamicassets/arts/building/architect/room_icon_sprite_hub/icon_title_${room.toLowerCase()}.png`
    );
};

export {
    getHomeBanners,
    getThumbnailImg,
    getPortraitImg,
    getProfessionImage,
    getsubProfessionIdImage,
    getFactionImage,
    getEliteImage,
    getRoomImage,
};
