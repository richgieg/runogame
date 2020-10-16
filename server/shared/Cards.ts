type Color = 'blue' | 'green' | 'red' | 'yellow';

type ColorCardQuantities = {
    number: {
        [value: number]: number,
    },
    drawTwo: number,
    reverse: number,
    skip: number,
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

export function generateCards(): readonly Card[] {

    let id = 0;

    return [
        ...generateColorCards('blue', {
            number: { 0: 1, 1: 2, 2: 2, 3: 2, 4: 2, 5: 2, 6: 2, 7: 2, 8: 2, 9: 2 },
            drawTwo: 2,
            reverse: 2,
            skip: 2,
        }),
        ...generateColorCards('green', {
            number: { 0: 1, 1: 2, 2: 2, 3: 2, 4: 2, 5: 2, 6: 2, 7: 2, 8: 2, 9: 2 },
            drawTwo: 2,
            reverse: 2,
            skip: 2,
        }),
        ...generateColorCards('red', {
            number: { 0: 1, 1: 2, 2: 2, 3: 2, 4: 2, 5: 2, 6: 2, 7: 2, 8: 2, 9: 2 },
            drawTwo: 2,
            reverse: 2,
            skip: 2,
        }),
        ...generateColorCards('yellow', {
            number: { 0: 1, 1: 2, 2: 2, 3: 2, 4: 2, 5: 2, 6: 2, 7: 2, 8: 2, 9: 2 },
            drawTwo: 2,
            reverse: 2,
            skip: 2,
        }),
        ...generateWildCards('wildNoDraw', 4),
        ...generateWildCards('wildDrawFour', 4),
    ];

    function generateColorCards(color: Color, quantities: ColorCardQuantities): readonly ColorCard[] {
        return [
            ...generateNumberCards(color, quantities.number),
            ...generateActionCards('drawTwo', color, quantities.drawTwo),
            ...generateActionCards('reverse', color, quantities.reverse),
            ...generateActionCards('skip', color, quantities.drawTwo),
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
