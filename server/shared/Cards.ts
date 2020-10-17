type Color = 'blue' | 'green' | 'red' | 'yellow';

type CardQuantities = {
    readonly colors?: ColorCardQuantitiesMap,
    readonly wildNoDraw?: number;
    readonly wildDrawFour?: number;
};

type ColorCardQuantitiesMap = {
    readonly [C in Color]?: ColorCardQuantities;
};

type ColorCardQuantities = {
    readonly number?: NumberCardValueQuantities;
    readonly drawTwo?: number,
    readonly reverse?: number,
    readonly skip?: number,
};

type NumberCardValueQuantities = {
    readonly [value: number]: number,
};

type NumberCard = {
    readonly kind: 'number',
    readonly id: number,
    readonly color: Color,
    readonly value: number,
};

type DrawTwoCard = {
    readonly kind: 'drawTwo',
    readonly id: number,
    readonly color: Color,
};

type ReverseCard = {
    readonly kind: 'reverse',
    readonly id: number,
    readonly color: Color,
};

type SkipCard = {
    readonly kind: 'skip',
    readonly id: number,
    readonly color: Color,
};

type WildNoDrawCard = {
    readonly kind: 'wildNoDraw',
    readonly id: number,
};

type WildDrawFourCard = {
    readonly kind: 'wildDrawFour',
    readonly id: number,
};

type ActionCard = DrawTwoCard | ReverseCard | SkipCard;
type ColorCard = NumberCard | ActionCard;
type WildCard = WildNoDrawCard | WildDrawFourCard;
type Card = ColorCard | WildCard;

const defaultQuantities: CardQuantities = {
    colors: {
        blue: {
            number: { 0: 1, 1: 2, 2: 2, 3: 2, 4: 2, 5: 2, 6: 2, 7: 2, 8: 2, 9: 2 },
            drawTwo: 2,
            reverse: 2,
            skip: 2,
        },
        green: {
            number: { 0: 1, 1: 2, 2: 2, 3: 2, 4: 2, 5: 2, 6: 2, 7: 2, 8: 2, 9: 2 },
            drawTwo: 2,
            reverse: 2,
            skip: 2,
        },
        red: {
            number: { 0: 1, 1: 2, 2: 2, 3: 2, 4: 2, 5: 2, 6: 2, 7: 2, 8: 2, 9: 2 },
            drawTwo: 2,
            reverse: 2,
            skip: 2,
        },
        yellow: {
            number: { 0: 1, 1: 2, 2: 2, 3: 2, 4: 2, 5: 2, 6: 2, 7: 2, 8: 2, 9: 2 },
            drawTwo: 2,
            reverse: 2,
            skip: 2,
        },
    },
    wildNoDraw: 4,
    wildDrawFour: 4,
};

export function generateCards(quantities = defaultQuantities): readonly Card[] {

    let id = 0;

    return [
        ...generateAllColorCards(quantities.colors ?? {}),
        ...generateWildCards('wildNoDraw', quantities.wildNoDraw ?? 0),
        ...generateWildCards('wildDrawFour', quantities.wildDrawFour ?? 0),
    ];

    function generateAllColorCards(colorCardQuantitiesMap: ColorCardQuantitiesMap): readonly ColorCard[] {
        return Object.entries(colorCardQuantitiesMap)
            .sort((a, b) => a[0].localeCompare(b[0]))
            .flatMap(entry => generateColorCards(entry[0] as Color, entry[1]));
    }

    function generateColorCards(color: Color, quantities: ColorCardQuantities | undefined): readonly ColorCard[] {
        return [
            ...generateNumberCards(color, quantities?.number ?? {}),
            ...generateActionCards('drawTwo', color, quantities?.drawTwo ?? 0),
            ...generateActionCards('reverse', color, quantities?.reverse ?? 0),
            ...generateActionCards('skip', color, quantities?.skip ?? 0),
        ];
    }

    function generateNumberCards(color: Color, valueQuantities: NumberCardValueQuantities): readonly NumberCard[] {
        return Object.keys(valueQuantities)
            .map(valueString => Number(valueString))
            .sort((a, b) => a - b)
            .flatMap(value =>
                generateEntities(valueQuantities[value], { kind: 'number', color, value }));
    }

    function generateActionCards(kind: ActionCard['kind'], color: Color, quantity: number): readonly ActionCard[] {
        return generateEntities(quantity, { kind, color });
    }

    function generateWildCards(kind: WildCard['kind'], quantity: number): readonly WildCard[] {
        return generateEntities(quantity, { kind });
    }

    function generateEntities<T>(quantity: number, blueprint: T) {
        return [...Array(quantity)].map(() => ({ ...blueprint, id: id++ }));
    }

}
