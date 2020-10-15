type Color = 'blue' | 'green' | 'red' | 'yellow';

type ValueQuantities = { [value: number]: number };

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

type Card = NumberCard | DrawTwoCard | ReverseCard | SkipCard | WildNoDrawCard | WildDrawFourCard;

export class Deck {

    readonly cards = this.generateCards();

    private generateCards(): readonly Card[] {

        let id = 0;

        return [
            ...generateColorCards('blue'),
            ...generateColorCards('green'),
            ...generateColorCards('red'),
            ...generateColorCards('yellow'),
            ...generateWildNoDrawCards(),
            ...generateWildDrawFourCards(),
        ];

        function generateColorCards(color: Color): readonly (NumberCard | DrawTwoCard | ReverseCard | SkipCard)[] {
            return [
                ...generateNumberCards(color, { 0: 1, 1: 2, 2: 2, 3: 2, 4: 2, 5: 2, 6: 2, 7: 2, 8: 2, 9: 2 }),
                ...generateDrawTwoCards(color),
                ...generateReverseCards(color),
                ...generateSkipCards(color),
            ];
        }

        function generateNumberCards(color: Color, valueQuantities: ValueQuantities): readonly NumberCard[] {
            const cards: NumberCard[] = Object.keys(valueQuantities)
                .map(valueString => Number(valueString))
                .sort((a, b) => a - b)
                .flatMap(value =>
                    [...Array(valueQuantities[value])].map(_ => ({
                        kind: 'number',
                        color,
                        value,
                        id: id++,
                    })));
            return cards;
        }

        function generateDrawTwoCards(color: Color): readonly DrawTwoCard[] {
            return (['drawTwo', 'drawTwo'] as const)
                .map(kind => ({ kind, color, id: id++ }));
        }

        function generateReverseCards(color: Color): readonly ReverseCard[] {
            return (['reverse', 'reverse'] as const)
                .map(kind => ({ kind, color, id: id++ }));
        }

        function generateSkipCards(color: Color): readonly SkipCard[] {
            return (['skip', 'skip'] as const)
                .map(kind => ({ kind, color, id: id++ }));
        }

        function generateWildNoDrawCards(): readonly WildNoDrawCard[] {
            return (['wildNoDraw', 'wildNoDraw', 'wildNoDraw', 'wildNoDraw'] as const)
                .map(kind => ({ kind, id: id++ }));
        }

        function generateWildDrawFourCards(): readonly WildDrawFourCard[] {
            return (['wildDrawFour', 'wildDrawFour', 'wildDrawFour', 'wildDrawFour'] as const)
                .map(kind => ({ kind, id: id++ }));
        }

    }

}
