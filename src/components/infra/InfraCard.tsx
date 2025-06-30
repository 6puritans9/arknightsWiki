import Link from "next/link";
import Image from "next/image";
import getS3Url from "@/lib/apiAws";
import { BuildingBuffType, BuildingCharType } from "@/lib/apiMongo";
import { nationIdMap, groupIdMap, teamIdMap } from "@/lib/constants/NameMap";
import { css } from "../../../styled-system/css";
import { flex } from "../../../styled-system/patterns";
import BuffCard from "./buffCard";

type InfraCardProps = {
    char: BuildingCharType;
    buffMap: { [key: string]: BuildingBuffType };
};

const container = flex({
    marginBottom: "1rem",
    padding: "0.5rem",
    border: "1px solid #bfc8d6",
    borderRadius: "12px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    width: "100%",
    maxWidth: "clamp(100%, calc(100vw / 4 - 1rem))",
    // minHeight: "320px",
    flexDirection: "column",
    alignItems: "flex-start",
});

const buffList = css({
    listStyle: "none",
    padding: 0,
    margin: 0,
});

const InfraCard = ({ char, buffMap }: InfraCardProps) => {
    // const imagePath = `operators/${char.charId}/icons/${char.charId}.webp`;

    return (
        <article key={char.charId} className={container}>
            {/* <Link href="/operators/[charId]" as={`/infra/char/${char.charId}`}>
                <Image
                    src={`${getS3Url(imagePath)}`}
                    alt={char.charName}
                    width={50}
                    height={50}
                />
            </Link> */}
            <p>IMG</p>
            <h2>
                {char.charAppellation
                    ? `${char.charAppellation} (${char.charName})`
                    : char.charName}
            </h2>
            <p>{`faction: ${teamIdMap[char.charTeamId] ?? groupIdMap[char.charGroupId] ?? nationIdMap[char.charNationId]}`}</p>

            <ul className={buffList}>
                {char.buffChar.map((buff, i) =>
                    buff.buffData.length === 0 ? null : (
                        <li key={i}>
                            <BuffCard
                                buffData={buff.buffData}
                                buffMap={buffMap}
                            />
                        </li>
                    )
                )}
            </ul>
        </article>
    );
};

export default InfraCard;
