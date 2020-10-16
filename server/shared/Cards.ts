type Color = 'blue' | 'green' | 'red' | 'yellow';

type CardQuantities = {
    readonly colors: {
        readonly [C in Color]?: ColorCardQuantities;
    },
    readonly wildNoDraw: number;
    readonly wildDrawFour: number;
}

type ColorCardQuantities = {
    readonly number: {
        readonly [value: number]: number,
    },
    readonly drawTwo: number,
    readonly reverse: number,
    readonly skip: number,
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

export function generateCards(quantities: CardQuantities): readonly Card[] {

    let id = 0;

    return [
        ...generateAllColorCards(quantities.colors),
        ...generateWildCards('wildNoDraw', quantities.wildNoDraw),
        ...generateWildCards('wildDrawFour', quantities.wildDrawFour),
    ];

    function generateAllColorCards(colorQuantitiesMap: CardQuantities['colors']): readonly ColorCard[] {
        return Object.entries(colorQuantitiesMap)
            .sort((a, b) => a[0].localeCompare(b[0]))
            .flatMap(entry => entry[1] ? generateCardsOfColor(entry[0] as Color, entry[1]) : []);
    }

    function generateCardsOfColor(color: Color, quantities: ColorCardQuantities): readonly ColorCard[] {
        return [
            ...generateNumberCards(color, quantities.number),
            ...generateActionCards('drawTwo', color, quantities.drawTwo),
            ...generateActionCards('reverse', color, quantities.reverse),
            ...generateActionCards('skip', color, quantities.skip),
        ];
    }

    function generateNumberCards(color: Color, valueQuantities: ColorCardQuantities['number']): readonly NumberCard[] {
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
