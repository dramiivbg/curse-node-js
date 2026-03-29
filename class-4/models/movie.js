import movies from '../movies.json' with {type: 'json'};
import { randomUUID } from 'node:crypto';

export class MovieModels {

    static async getAll({ genre }) {
        if (genre) {
            const filteredMovies = movies.filter(m => m.genre.some(g => g.toLowerCase() === genre.toLowerCase()));
            return filteredMovies;
        }
        return movies;
    }

    static async getById({ id }) {
        const movie = movies.find(x => x.id === id);
        return movie;
    }

    static async create(input) {

        const newMovie = {
            id: randomUUID(),
            ...input
        }
        movies.push(newMovie);

        return movies;
    }

    static async delete({ id }) {
        const movieIndex = movies.findIndex(m => m.id === id);
        if (movieIndex === -1) return false;
        movies.splice(movieIndex, 1);
        return true;
    }

    static async update({ id, input }) {
        const movieIndex = movies.findIndex(m => m.id === id);
        if (movieIndex === -1) {
            return false;
        }

        movies[movieIndex] = { ...movies[movieIndex], ...input };
        return true;
    }


}