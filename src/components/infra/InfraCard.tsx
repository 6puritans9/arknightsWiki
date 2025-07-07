import Link from "next/link";
import { getThumbnailImg } from "@/api/apiAws";
import { BuffsObjectType, BuildingCharType } from "@/api/apiMongo";
import { nationIdMap, groupIdMap, teamIdMap } from "@/lib/constants/NameMap";
import { css } from "../../../styled-system/css";
import { flex } from "../../../styled-system/patterns";
import BuffCard from "./BuffCard";
import Image from "next/image";

type InfraCardProps = {
    char: BuildingCharType;
    buffs: BuffsObjectType;
};

//#region Styles
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

const row = flex({
    alignItems: "center",
    gap: "0.5rem",
});

const nameText = css({
    color: "red",
});

const buffList = css({
    listStyle: "none",
    padding: 0,
    margin: 0,
});
//#endregion

const InfraCard = ({ char, buffs }: InfraCardProps) => {
    return (
        <article key={char.charId} className={container}>
            <div className={row}>
                <Link
                    href="/operators/[charId]"
                    as={`/infra/char/${char.charId}`}
                >
                    <Image
                        unoptimized
                        src={`${getThumbnailImg(char.charId)}`}
                        alt={char.charName}
                        loading="lazy"
                        decoding="async"
                        width={50}
                        height={50}
                    />
                </Link>

                <h2 className={nameText}>
                    {char.charAppellation
                        ? `${char.charAppellation} (${char.charName})`
                        : char.charName}
                </h2>
            </div>
            {/* <p>{`faction: ${teamIdMap[char.teamId] ?? groupIdMap[char.groupId] ?? nationIdMap[char.nationId]}`}</p> */}

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
