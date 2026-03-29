import express, { json } from 'express';

import { moviesRouter } from './routes/movies.js';

import { corsMiddleware } from './middlewares/cors.js';

const app = express();
app.use(json());
app.use(corsMiddleware());
app.disable('x-powered-by');

app.use('/movies', moviesRouter);

const desiredPort = process.env.PORT ?? 3000;

app.listen(desiredPort, () => {
    console.log(`Server is listening on port ${desiredPort}`);
});