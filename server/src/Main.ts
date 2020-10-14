import express from 'express';
import cors from 'cors';
import { Test } from '../shared/Test';

const PORT = Number(process.env.PORT) || 7070;
const app = express();

app.use(cors());

app.get('/test', (_, res) => {
    const test: Test = {
        test: 'testing123...',
    };
    res.send(test);
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
