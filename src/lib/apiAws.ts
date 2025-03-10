const getS3Url = (path: string) => {
    const baseUrl =
        process.env.NEXT_PUBLIC_S3_URL ||
        "https://arknights-wiki-assets.s3.ap-northeast-2.amazonaws.com";

    return `${baseUrl}/public/${path}`;
};

const getHomeBanners = (pathArray: Array<string>) => {
    const ongoing = getS3Url(pathArray[0]);
    const upcoming = getS3Url(pathArray[1]);

    return { ongoing, upcoming };
};

export default getS3Url;
export { getHomeBanners };
