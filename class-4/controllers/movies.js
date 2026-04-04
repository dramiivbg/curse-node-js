import { MovieModels } from "../models/local-file-system/movie.js";
import { validateMovie, validateMoviePatch } from '../schemas/movies.js';

export class MovieController {
    static async getAll(req, res) {
        const genre = req.query.genre;
        const movies = await MovieModels.getAll({ genre });
        res.json(movies);
    }

    static async getById(req, res) {
        const id = req.params.id;
        const movie = await MovieModels.getById({ id });
        if (movie) {
            res.json(movie);
        } else {
            res.status(404).json({ error: 'Movie not found' });
        }
    }

    static async create(req, res) {
        const result = validateMovie(req.body);

        if (result.error) {
            return res.status(400).json({ error: JSON.parse(result.error.message) });
        }

        const newMovie = await MovieModels.create({ input: result.data });

        res.status(201).json({ message: 'Movie created successfully', result: newMovie });
    }

    static async update(req, res) {
        const result = validateMoviePatch(req.body);
        if (result.error) {
            return res.status(400).json({ error: JSON.parse(result.error.message) });
        }

        const id = req.params.id;
        const result2 = await MovieModels.update({ id, input: result.data });
        if (!result2) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        res.json({ message: 'Movie updated successfully', movie: result.data });
    }

    static async delete(req, res) {
        const id = req.params.id;
        const result = await MovieModels.delete({ id });
        if (!result) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        res.json({ message: 'Movie deleted successfully' });
    }
}