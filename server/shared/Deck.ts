type Color = 'blue' | 'green' | 'red' | 'yellow';

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
                ...generateNumberCards(color),
                ...generateDrawTwoCards(color),
                ...generateReverseCards(color),
                ...generateSkipCards(color),
            ];
        }

        function generateNumberCards(color: Color): readonly NumberCard[] {
            return [0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9].map(value => ({
                kind: 'number',
                color,
                value,
                id: id++,
            }));
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
