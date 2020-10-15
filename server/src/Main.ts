import express from 'express';
import cors from 'cors';
import { Deck } from '../shared/Deck';

const PORT = Number(process.env.PORT) || 7070;
const app = express();

app.use(cors());

app.get('/test', (_, res) => {
    const deck = new Deck();
    res.send(deck.cards);
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
