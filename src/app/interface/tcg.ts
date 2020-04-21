export interface ICard {
    ability: IAbility;
    artist: string;
    attacks: IAttack[];
    convertedRetreatCost: number;
    evolvesFrom: string;
    hp: string;
    id: string;
    imageUrl: string;
    imageUrlHiRes: string;
    name: string;
    nationalPokedexNumber: number;
    number: string;
    rarity: string;
    resistances: IResistance[];
    retreatCost: string[];
    series: string;
    set: string;
    setCode: string;
    subtype: string;
    supertype: string;
    text: string[];
    types: string[];
    weaknesses: IWeakness[];
}


export interface IAbility {
    name: string;
    text: string;
    type: string;
}

export interface IAttack {
    convertedEnergyCost: string;
    cost: string[];
    damage: string;
    name: string;
    text: string;
}

export interface IResistance {
    type: string;
    value: string;
}

export interface IWeakness {
    type: string;
    value: string;
}
