import express from 'express';
import cors from 'cors';
import { generateCards } from '../shared/Cards';

const PORT = Number(process.env.PORT) || 7070;
const app = express();

app.use(cors());

app.get('/test', (_, res) => {
    const cards = generateCards({
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
    });
    res.send(cards);
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
