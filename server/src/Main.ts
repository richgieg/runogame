import express from 'express';
import cors from 'cors';
import { generateCards } from '../shared/Cards';

const PORT = Number(process.env.PORT) || 7070;
const app = express();

app.use(cors());

app.get('/test', (_, res) => {
  const cards = generateCards();
  res.send(cards);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
