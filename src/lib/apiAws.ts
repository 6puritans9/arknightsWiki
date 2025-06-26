const getS3Url = (path: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_S3_URL;

    return `${baseUrl}/public/${path}`;
};

const getHomeBanners = (pathArray: Array<string>) => {
    const ongoing = getS3Url(pathArray[0]);
    const upcoming = getS3Url(pathArray[1]);

    return { ongoing, upcoming };
};

const getProfessionImage = (
    profession: string,
    isBlack: boolean = true
): string => {
    return `https://arknights-wiki-assets.s3.ap-northeast-2.amazonaws.com/dynamicassets/arts/profession_large_hub/icon_profession_${profession.toLowerCase()}_large${isBlack ? "" : "_white"}.png`;
};

const getsubProfessionIdImage = (subProfessionId: string): string =>
    `https://arknights-wiki-assets.s3.ap-northeast-2.amazonaws.com/dynamicassets/arts/ui/subprofessionicon/sub_${subProfessionId}_icon.png`;

export default getS3Url;
export { getHomeBanners, getProfessionImage, getsubProfessionIdImage };
