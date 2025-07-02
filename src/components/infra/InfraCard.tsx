import Link from "next/link";
import getS3Url from "@/lib/apiAws";
import { BuffsObjectType, BuildingCharType } from "@/lib/apiMongo";
import { nationIdMap, groupIdMap, teamIdMap } from "@/lib/constants/NameMap";
import { css } from "../../../styled-system/css";
import { flex } from "../../../styled-system/patterns";
import BuffCard from "./BuffCard";

type InfraCardProps = {
    char: BuildingCharType;
    buffs: BuffsObjectType;
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

const nameText = css({
    color: "red",
});

const buffList = css({
    listStyle: "none",
    padding: 0,
    margin: 0,
});

const InfraCard = ({ char, buffs }: InfraCardProps) => {
    const imagePath = `operators/${char.charId}/icons/${char.charId}.webp`;

    return (
        <article key={char.charId} className={container}>
            <Link href="/operators/[charId]" as={`/infra/char/${char.charId}`}>
                <img
                    src={`${getS3Url(imagePath)}`}
                    alt={char.charName}
                    width={50}
                    height={50}
                />
            </Link>
            {/* <p>IMG</p> */}
            <h2 className={nameText}>
                {char.charAppellation
                    ? `${char.charAppellation} (${char.charName})`
                    : char.charName}
            </h2>
            <p>{`faction: ${teamIdMap[char.teamId] ?? groupIdMap[char.groupId] ?? nationIdMap[char.nationId]}`}</p>

            <ul className={buffList}>
                {char.buffChar.map((buff, i) =>
                    !Object.keys(buff.buffData).length ? null : (
                        <li key={i}>
                            <BuffCard buffData={buff.buffData} buffs={buffs} />
                        </li>
                    )
                )}
            </ul>
        </article>
    );
};

export default InfraCard;
