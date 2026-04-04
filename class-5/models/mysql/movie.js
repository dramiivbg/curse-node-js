import mysql from 'mysql2/promise';

const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '',
    database: 'moviesdb'
}

const connection = await mysql.createConnection(config);


export class MovieModels {
    static async getAll({ genre }) {

        if (!genre) {
            const [movies] = await connection.query('select BIN_TO_UUID(id) as id, title, year, director, duration, poster from movie;');
            return movies;
        } else {
            const lowerGenre = genre.toLowerCase();

            const [genres] = await connection.query('select id from genre where LOWER(name) = ?;', [lowerGenre]);
            if (genres.length === 0) {
                return [];
            }

            const genreId = genres[0].id;

            const [movies] = await connection.query('select BIN_TO_UUID(m.id) as id, m.title, m.year, m.director, m.duration, m.poster from genre as g inner join movie_genres  as m_g on g.id = m_g.genre_id inner join movie as m on m_g.movie_id = m.id where genre_id = ?;', [genreId]);
            return movies;
        }
    }

    static async getById({ id }) {
        const [movies] = await connection.query('select BIN_TO_UUID(id) as id, title, year, director, duration, poster from movie where id = UUID_TO_BIN(?)', [id]);
        if (movies.length === 0) {
            return null;
        }
        return movies[0];
    }

    static async create({ input }) {

        const {
            genre: genreInput,
            tittle,
            year,
            director,
            duration,
            poster

        } = input;

        const [result] = await connection.query('insert into movie (title, year, director, duration, poster) values (?, ?, ?, ?, ?);', [tittle, year, director, duration, poster]);

        const movieId = result.id;
        for (const genreName of genreInput) {
            const lowerGenreName = genreName.toLowerCase();
            let genreId;
            const [genres] = await connection.query('select id from genre where LOWER(name) = ?;', [lowerGenreName]);
            if (genres.length === 0) {
                const [genreResult] = await connection.query('insert into genre (name) values (?);', [lowerGenreName]);
                genreId = genreResult.id;
            } else {
                genreId = genres[0].id;
            }
            await connection.query('insert into movie_genres (movie_id, genre_id) values (?, ?);', [movieId, genreId]);
        }

        return this.getById({ id: movieId });


    }

    static async update({ id, input }) { }

    static async delete({ id }) {

    }
}