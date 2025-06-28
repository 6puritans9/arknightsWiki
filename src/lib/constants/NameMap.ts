/* 
Filter categories:
1. rarity
2. position
3. limited

3. profession
4. subProfessionId

5. nationId
6. teamId
7. groupId


Profession Logic:
1. Create correct in-game NameMap for profession and subProfessionId

2. Add profession in a dictionary if not exists, {profession: set()}
3. Add subProfessionId in the dictionary, {profession: (subProfessionId)}
4. Create class for each profession.
5. Create branch for each subProfessionId, under the correct profession class.

Faction Logic:
1. Add nationId in a dictionary if not exists, {nationId: set()}
2. if an operator has a groupId or teamId with nationId, {nationId: (groupId, teamId), groupId: nationId, teamId: nationId}
3.else if an operator has a groupId or teamId without nationId, others: (groupId, teamId)

4. 

*/
const professionMap: { [key: string]: string } = {
    PIONEER: "Vanguard",
    WARRIOR: "Guard",
    TANK: "Defender",
    CASTER: "Caster",
    SNIPER: "Sniper",
    MEDIC: "Medic",
    SUPPORT: "Supporter",
    SPECIAL: "Specialist",
    TOKEN: "Token",
    TRAP: "Trap",
};

const subProfessionIdMap: { [key: string]: string } = {
    agent: "Agent",
    alchemist: "Alchemist",
    aoesniper: "Artilleryman",
    artsfghter: "Arts Fighter",
    artsprotector: "Arts Protector",
    bard: "Bard",
    bearer: "Standard Bearer",
    blastcaster: "Blast Caster",
    blessing: "Abjurer",
    bombarder: "Flinger",
    centurion: "Centurion",
    chain: "Chain Caster",
    chainhealer: "Chain Medic",
    charger: "Charger",
    closerange: "Heavyshooter",
    corecaster: "Core Caster",
    craftsman: "Artificer",
    crusher: "Crusher",
    dollkeeper: "Dollkeeper",
    duelist: "Duelist",
    executor: "Executor",
    fastshot: "Marksman",
    fearless: "Dreadnought",
    fighter: "Fighter",
    fortress: "Fortress",
    funnel: "Mech-Accord Caster",
    geek: "Geek",
    guardian: "Guardian",
    hammer: "Earthshaker",
    healer: "Therapist",
    hookmaster: "Hookmaster",
    hunter: "Hunter",
    incantationmedic: "Incantation Medic",
    instructor: "Instructor",
    librator: "Liberator",
    longrange: "Deadeye",
    loopshooter: "Loopshooter",
    lord: "Lord",
    merchant: "Merchant",
    musha: "Soloblade",
    mystic: "Mystic Caster",
    notchar1: "NotChar1",
    notchar2: "NotChar2",
    phalanx: "Phalanx Caster",
    physician: "Single-Target Medic",
    pioneer: "Pioneer",
    primcaster: "Primal Caster",
    primprotector: "Primal Protector",
    protector: "Protector",
    pusher: "Push Stroker",
    reaper: "Reaper",
    reaperrange: "Spreadshooter",
    ringhealer: "Multi-Target Medic",
    ritualist: "Ritualist",
    shotprotector: "Sentry Protector",
    siegesniper: "Besieger",
    skywalker: "Skyranger",
    slower: "Decel Binder",
    soulcaster: "Shaper Caster",
    splashcaster: "Splash Caster",
    stalker: "Ambusher",
    summoner: "Summoner",
    sword: "Swordmaster",
    tactician: "Tactician",
    traper: "Trapmaster",
    underminer: "Hexer",
    unyield: "Juggernaut",
    wandermedic: "Wandering Medic",
};

const nationIdMap: { [key: string]: string } = {
    bolivar: "Bolivar",
    columbia: "Columbia",
    egir: "Aegir",
    higashi: "Higashi",
    iberia: "Iberia",
    kazimierz: "Kazimierz",
    kjerag: "Kjerag",
    laterano: "Laterano",
    leithanien: "Leithanien",
    lungmen: "Lungmen",
    minos: "Minos",
    rhodes: "Rhodes Island",
    rim: "Rim Billiton",
    sami: "Sami",
    sargon: "Sargon",
    siracusa: "Siracusa",
    ursus: "Ursus",
    victoria: "Victoria",
    yan: "Yan",
};

const groupIdMap: { [key: string]: string } = {
    abyssal: "Abyssal Hunters",
    babel: "Babel",
    blacksteel: "Blacksteel",
    dublinn: "Dublinn",
    elite: "Elite Op",
    glasgow: "Glasgow",
    karlan: "Karlan Trade",
    lgd: "L.G.D.",
    penguin: "Penguin Logistics",
    pinus: "Pinus Sylvestris",
    rhine: "Rhine Lab",
    siesta: "Siesta",
    sui: "Sui",
    sweep: "S.W.E.E.P.",
};

const teamIdMap: { [key: string]: string } = {
    action4: "Op A4",
    chiave: "Chiave's Gang",
    followers: "Followers",
    laios: "Laios' Party",
    lee: "L.D.A.",
    rainbow: "Team Rainbow",
    reserve1: "Op Reserve A1",
    reserve4: "Op Reserve A4",
    reserve6: "Op Reserve A6",
    student: "U.S.S.G.",
};

export {
    professionMap,
    subProfessionIdMap,
    nationIdMap,
    groupIdMap,
    teamIdMap,
};
