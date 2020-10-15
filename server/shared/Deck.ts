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
    readonly id: number,
    readonly kind: 'wildNoDraw',
};

type WildDrawFourCard = {
    readonly id: number,
    readonly kind: 'wildDrawFour',
};

type ColorCard = NumberCard | DrawTwoCard | ReverseCard | SkipCard;
type Card = ColorCard | WildNoDrawCard | WildDrawFourCard;

export class Deck {

    readonly cards = this.generateCards();

    private generateCards(): readonly Card[] {

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
            ...generateWildNoDrawCards(4),
            ...generateWildDrawFourCards(4),
        ];

        function generateColorCards(color: Color, quantities: ColorCardQuantities): readonly ColorCard[] {
            return [
                ...generateNumberCards(color, quantities.number),
                ...generateDrawTwoCards(color, quantities.drawTwo),
                ...generateReverseCards(color, quantities.reverse),
                ...generateSkipCards(color, quantities.skip),
            ];
        }

        function generateNumberCards(color: Color, valueQuantities: ColorCardQuantities['number']): readonly NumberCard[] {
            const cards: NumberCard[] = Object.keys(valueQuantities)
                .map(valueString => Number(valueString))
                .sort((a, b) => a - b)
                .flatMap(value =>
                    [...Array(valueQuantities[value])].map(_ => ({ kind: 'number', color, value, id: id++ })));
            return cards;
        }

        function generateDrawTwoCards(color: Color, quantity: number): readonly DrawTwoCard[] {
            return [...Array(quantity)].map(_ => ({ kind: 'drawTwo', color, id: id++ }));
        }

        function generateReverseCards(color: Color, quantity: number): readonly ReverseCard[] {
            return [...Array(quantity)].map(_ => ({ kind: 'reverse', color, id: id++ }));
        }

        function generateSkipCards(color: Color, quantity: number): readonly SkipCard[] {
            return [...Array(quantity)].map(_ => ({ kind: 'skip', color, id: id++ }));
        }

        function generateWildNoDrawCards(quantity: number): readonly WildNoDrawCard[] {
            return [...Array(quantity)].map(_ => ({ kind: 'wildNoDraw', id: id++ }));
        }

        function generateWildDrawFourCards(quantity: number): readonly WildDrawFourCard[] {
            return [...Array(quantity)].map(_ => ({ kind: 'wildDrawFour', id: id++ }));
        }

    }

}
