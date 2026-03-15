const express = require('express');
const crypto = require('node:crypto');
const cors = require('cors');
const movies = require('./movies.json');
const { validateMovie, validateMoviePatch } = require('./schemas/movies');

const app = express();
app.use(express.json());
app.use(cors({
    origin: (origin, callback) => {
        const ACCEPTED_ORIGINS = ['http://localhost:52899', 'http://localhost:3000', 'https://movies.com'];
        if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));
app.disable('x-powered-by');

app.get('/', (req, res) => {
    res.send('<h1>Hello, World!</h1>');
});

app.get('/movies', (req, res) => {
    // const origin = req.headers.origin;
    // if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    //     res.header('Access-Control-Allow-Origin', origin);
    // }
    const genre = req.query.genre;
    if (genre) {
        const filteredMovies = movies.filter(m => m.genre.some(g => g.toLowerCase() === genre.toLowerCase()));
        return res.json(filteredMovies);
    }
    res.json(movies);
});

app.get('/movies/:id', (req, res) => {
    const id = req.params.id;
    const movie = movies.find(m => m.id === id);
    if (movie) {
        res.json(movie);
    } else {
        res.status(404).json({ error: 'Movie not found' });
    }
});

app.post('/movies', (req, res) => {
    const result = validateMovie(req.body);
    //console.log(result);

    if (result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    movies.push({
        id: crypto.randomUUID(),
        ...result.data
    });

    res.status(201).json({ message: 'Movie created successfully', result: result.data });
});

app.patch('/movies/:id', (req, res) => {
    const result = validateMoviePatch(req.body);
    if (result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const id = req.params.id;
    const movieIndex = movies.findIndex(m => m.id === id);
    if (movieIndex === -1) {
        return res.status(404).json({ error: 'Movie not found' });
    }

    movies[movieIndex] = { ...movies[movieIndex], ...result.data };
    res.json({ message: 'Movie updated successfully', movie: movies[movieIndex] });
});

app.delete('/movies/:id', (req, res) => {
    // const origin = req.headers.origin;
    // if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    //     res.header('Access-Control-Allow-Origin', origin);
    // }
    const id = req.params.id;
    const movieIndex = movies.findIndex(m => m.id === id);
    if (movieIndex === -1) {
        return res.status(404).json({ error: 'Movie not found' });
    }

    movies.splice(movieIndex, 1);
    res.json({ message: 'Movie deleted successfully' });
});

// app.options('/movies/:id', (req, res) => {
//     const origin = req.header('origin');
//     if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
//         res.header('Access-Control-Allow-Origin', origin);
//         res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
//         //res.header('Access-Control-Allow-Headers', 'Content-Type');
//     }

//     res.send(200);
// });

const desiredPort = process.env.PORT ?? 3000;

app.listen(desiredPort, () => {
    console.log(`Server is listening on port ${desiredPort}`);
});