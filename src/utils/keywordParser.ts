import termDescriptionDict from "@/lib/constants/textTagMap";

// Related operators
// 5. if key === "power_count[000]" | key === "control_token_prod_spd[000]":
//      related_ops = parse(termDescriptionDict["cc.tag.op"].description)
// 4. if key === "train_spd_tag[000]" | key === "train_spd_tag[010]" | key === "control_prod_fraction[000]":
//      related_ops = parse(termDescriptionDict["cc.tag.knight"].description)
// 1. if key === "trade_ord_line_durin[010]":
//      related_ops = parse(termDescriptionDict["cc.tag.durin"].description)
// 3. if key === "control_token_prod_spd2[000]":
//      related_ops = parse(termDescriptionDict["cc.tag.mh"].description)
// 2. if key === "dorm_rec_all&tag[000]":
//      related_ops = parse(termDescriptionDict["cc.tag.dungeon"].description)
// 6. if key === "dorm_rec_single_P[001]":
//      related_ops = parse(termDescriptionDict["cc.gvial"].description)

// Related group
// 1. if key === "control_mp_cost&faction[900]":
//      related_ops = parse(termDescriptionDict["cc.g.sp"].description)

// Related Skills
// 2. if key === "control_mp_lonely[000]":
//      related_buffs = parse(termDescriptionDict["cc.c.skill"].description)
// 3. "manu_skill_spd1[000]:
//      related_buffs = parse(termDescriptionDict["cc.sk.manu1"].description)
// 4. manu_skill_spd1[010]:
//      related_buffs = parse(termDescriptionDict["cc.sk.manu2"].description)
// 5. manu_skill_change[000]:
//      related_buffs = parse(termDescriptionDict["cc.sk.manu2"].description) + parse(termDescriptionDict["cc.sk.manu3"])
// 6. if key === "manu_skill_spd1[020]":
//      related_buffs = parse(termDescriptionDict["cc.sk.manu4"].description)

const parseDynamicKeywords = () => {
    const keywords = { alternate: [] };

    for (const key in termDescriptionDict) {
        if (key.startsWith("cc.")) {
        }
    }
};

export default parseDynamicKeywords;
